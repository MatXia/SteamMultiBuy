async function multibuylink() {
    const idgame = document.getElementById("gameId").value.trim();
    const error = document.getElementById("error");
    if (!idgame) {
        error.classList.add("active");
        return;
    }
    error.classList.remove("active");
    const selectedType = document.querySelector('input[name="cardType"]:checked').value;
    let start = 0;
    let allResults = [];
    let total = 0;
    try {
        do {
            const url = `https://corsproxy.io/?https://steamcommunity.com/market/search/render/?query=&start=${start}&count=10&search_descriptions=0&sort_column=default&sort_dir=desc&appid=753&category_753_Game[]=tag_app_${idgame}&category_753_item_class[]=tag_item_class_2&norender=1`;
            const response = await fetch(url);
            const data = await response.json();
            if (!data.results || data.results.length === 0) {
                error.classList.add("active");
                return;
            }
            total = data.total_count;
            allResults.push(...data.results);
            start += 10;
        } while (allResults.length < total);
        let filteredCards;
        if (selectedType === "normal") {
            filteredCards = allResults.filter(item => !item.hash_name.includes("(Foil)"));
        } else {
            filteredCards = allResults.filter(item => item.hash_name.includes("(Foil)"));
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