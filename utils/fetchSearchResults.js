import _ from "lodash";

const fetchSearchResults = (q, start) => {
    const GOOGLE_API_KEY = _.sample(process.env.GOOGLE_API_KEY.split(';'));

    return new Promise((resolve, reject) => {
        fetch(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${q}&start=${start}`)
            .then(response => response.json())
            .then(responseJson => {
                const responseItems = responseJson.items;

                if (!responseItems) {
                    resolve([]);
                    return;
                }

                const items = responseItems.map((item, i) => ({
                    title: item.title,
                    link: item.formattedUrl,
                    displayLink: item.displayLink,
                    snippet: item.snippet,
                    thumbnail: (i == 0 && item.pagemap?.cse_thumbnail?.[0]?.src || null),
                    favicon: `https://www.google.com/s2/favicons?domain=${item.link}&sz=${256}`
                }));
                resolve(items);
            })
            .catch(error => {
                console.log(error);
                reject([]);
            });
    })
}

export default fetchSearchResults;