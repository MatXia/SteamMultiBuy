async function multibuylink() {
    const idgame = document.getElementById("gameId").value.trim();
    const error = document.getElementById("error");
    if (!idgame) {
        error.classList.add("active");
        return;
    }
    error.classList.remove("active");
    const selectedType = document.querySelector('input[name="cardType"]:checked').value;
    const cardsurl = `https://corsproxy.io/?https://steamcommunity.com/market/search/render/?query=&start=0&count=100&search_descriptions=0&sort_column=default&sort_dir=desc&appid=753&category_753_Game[]=tag_app_${idgame}&category_753_item_class[]=tag_item_class_2&norender=1`;
    try {
        const res = await fetch(cardsurl);
        const cardsjson = await res.json();
        if (!cardsjson.results || cardsjson.results.length === 0) {
            error.classList.add("active");
            return;
        }
        let filteredCards;
        if (selectedType === "normal") {
            filteredCards = cardsjson.results
                .filter(item => !item.hash_name.includes("(Foil)"));
        } else {
            filteredCards = cardsjson.results
                .filter(item => item.hash_name.includes("(Foil)"));
        }

        if (filteredCards.length === 0) {
            error.classList.add("active");
            return;
        }
        const basehref =
            'https://steamcommunity.com/market/multibuy?appid=753' +
            filteredCards
                .map(card => `&items[]=${encodeURIComponent(card.hash_name)}&qty[]=1`)
                .join('');
        window.location.href = basehref;
    } catch (err) {
        console.log("Error:", err);
        error.classList.add("active");
    }
}

const submitbtn = document.getElementById("submit");
submitbtn.addEventListener('click', multibuylink);