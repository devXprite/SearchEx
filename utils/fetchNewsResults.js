import axios from "axios"

const fetchNewsResults = (q, page, max = 60) => {
    return new Promise((resolve, reject) => {

        axios
            .get(`https://newsapi.org/v2/everything?q=${q}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`)
            .then(res => {
                const responseItems = res.data.articles;

                if (!responseItems) {
                    resolve([]);
                    return;
                }

                const items =
                    responseItems.slice(0, max)
                        .map((item, i) => ({
                            title: item.title.length > 70 ? item.title.substring(0, 70) + "..." : item.title,
                            link: item.url,
                            displayLink: item.url.replace(/(^\w+:|^)\/\//, '').split('/')[0],
                            snippet: item.content.length > 150 ? item.content.substring(0, 150) + "..." : item.description,
                            thumbnail: item.urlToImage,
                            favicon: `https://www.google.com/s2/favicons?domain=${item.url}&sz=${256}`,
                        }));
                resolve(items);
            })
            .catch(error => {
                console.log(error);
                resolve([]);
            });
    })
}

export default fetchNewsResults