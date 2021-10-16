window.addEventListener("load", function () {
    var submitBtn = document.getElementById("sbm")
    submitBtn.addEventListener("click", () => handleSearch());
    getYoutubeData()
    .then((res)=>createVideo(res.items));
})
const types = {
    channel: "youtube#channel",
    video: "youtube#video"
}
Object.freeze(types);

function getYoutubeData(q) {
    if (q) {
        return fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${q}&key=AIzaSyC46DMnWd3yBFqtALl5ygSLzEdNXC-AdH8&maxResults=30`)
            .then(res => res.json())
    }
    return fetch(`https://youtube.googleapis.com/youtube/v3/search?maxResults=30&key=AIzaSyC46DMnWd3yBFqtALl5ygSLzEdNXC-AdH8&chart=mostPopular`)
        .then(res => res.json())
}

function createYoutubeCards(data) {
    const div = document.createElement("div");
    if (data.id.kind === types.channel) {
        return false
    }
    div.innerHTML = `<iframe 
    height="200" width="300"     
    src="https://www.youtube.com/embed/${data.id.videoId}" 
    title="YouTube video player" 
    frameborder="0" allow="accelerometer; 
    autoplay; clipboard-write; encrypted-media; 
    gyroscope; picture-in-picture" allowfullscreen>
    </iframe>`;
    return div;
}

function createVideo(results) {
    let count = 0;
    const allCards = [];
    for (let video of results) {
        const card = createYoutubeCards(video);
        if (card && count < 20) {
            allCards.push(card);
            count++
        }
    }
    const resContainer = document.getElementById("container");
    resContainer.innerHTML = null;
    resContainer.append(...allCards);
}
async function handleSearch() {
    // e.preventDefault();
    const search = document.getElementById("input").value;
    try {
        const {
            items: results,
            pageInfo: {
                resultsPerPage,
                totalResults
            }
        } = await getYoutubeData(search);
        console.log(results, resultsPerPage, totalResults)
        createVideo(results);

    } catch (error) {

    }
}