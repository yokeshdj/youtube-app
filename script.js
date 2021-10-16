window.addEventListener("load", function () {
    var submitBtn = document.getElementById("sbm")
    submitBtn.addEventListener("click", ()=>handleSearch());
})
const types = {
    channel: "youtube#channel",
    video: "youtube#video"
}
Object.freeze(types);

function getYoutubeData(q) {
    return fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${q}&key=AIzaSyC46DMnWd3yBFqtALl5ygSLzEdNXC-AdH8&maxResults=30`)
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

async function handleSearch(){
    // e.preventDefault();
    const search = document.getElementById("input").value;
    try {
        const {
            items : results,
            pageInfo : {
                resultsPerPage,
                totalResults
            }
        } = await getYoutubeData(search);
        console.log(results,resultsPerPage,totalResults)
        let count = 0;
        const allCards = [];
        for(let video of results){
            const card = createYoutubeCards(video);
            if(card && count<20){
                allCards.push(card);
                count++
            }
        }
        const resContainer = document.getElementById("container");
        resContainer.innerHTML = null;
        resContainer.append(...allCards);
    } catch (error) {
        
    }
}