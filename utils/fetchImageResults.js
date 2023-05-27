import axios from "axios";
import _ from "lodash";

const fetchImageResults = (q, page) => {
    const GOOGLE_API_KEY = _.sample(process.env.GOOGLE_API_KEY.split(';'));
    const start = (page - 1) * 10 + 1;

    return new Promise((resolve, reject) => {
        axios.get(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${q}&start=${start}&searchType=image`)
            .then(res => {
                const responseItems = res.data.items;

                if (!responseItems) {
                    resolve([]);
                    return;
                }

                const items = responseItems.map(item => {
                    return {
                        link: item.link,
                        title: item.title,
                        snippet: item.snippet,
                        thumbnail: item.image?.thumbnailLink || item.link,
                        htmlSnippet: item.htmlSnippet,
                        htmlTitle: item.htmlTitle,
                    }
                })

                resolve(items);
            })
            .catch(error => {
                console.log(error);
            }).finally(() => {
                resolve([])
            });
    })
}

export default fetchImageResults;