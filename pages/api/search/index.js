const fetchNewsResults = (q, page) => {

    return new Promise((resolve, reject) => {

        fetch(`https://newsapi.org/v2/everything?q=${q}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`)
            .then(response => response.json())
            .then(responseJson => {
                const responseItems = responseJson.articles;

                if (!responseItems) {
                    resolve([]);
                    return;
                }

                const items = responseItems.slice(0, 7).map((item, i) => ({
                    title: item.title.length > 70 ? item.title.substring(0, 70) + "..." : item.title,
                    snippet: item.content.length > 150 ? item.content.substring(0, 150) + "..." : item.description,
                    cse: item.urlToImage,
                    favicon: `https://www.google.com/s2/favicons?domain=${item.url}&sz=${256}`,
                    formattedUrl: item.url,
                    displayLink: item.url.replace(/(^\w+:|^)\/\//, '').split('/')[0],
                }));
                resolve(items);
            })
            .catch(error => {
                console.log(error);
                reject([]);
            });
    })
}

const fetchAllResults = (q, start) => {

    return new Promise((resolve, reject) => {
        fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${q}&start=${start}`)
            .then(response => response.json())
            .then(responseJson => {
                const responseItems = responseJson.items;

                // if itmes are not found, return empty array
                if (!responseItems) {
                    resolve([]);
                    return;
                }

                const items = responseItems.map((item, i) => ({
                    title: item.title,
                    displayLink: item.displayLink,
                    formattedUrl: item.formattedUrl,
                    snippet: item.snippet,
                    cse: (i == 0 && item.pagemap?.cse_thumbnail?.[0]?.src || null),
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

const fetchVideosResults = (q, page) => {
    if (page > 8) return Promise.resolve([]);

    return new Promise((resolve, reject) => {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${q}&type=video&order=viewCount&key=${process.env.YOUTUBE_API_KEY}&safeSearch=moderate`)
            .then(response => response.json())
            .then(responseJson => {
                const responseItems = responseJson.items;

                if (!responseItems) {
                    resolve([]);
                    return;
                }

                const restrictedWords = ['#shorts', '#shorts'];
                const items = responseItems
                    .filter(item => !restrictedWords.some(word => item.snippet.title.toLowerCase().includes(word)))
                    .slice((page - 1) * 4, (page - 1) * 4 + 4).map((item, i) => ({
                        title: item.snippet.title,
                        displayLink: "youtube.com",
                        formattedUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                        snippet: item.snippet.description,
                        cse: item.snippet.thumbnails.high.url,
                        favicon: `https://www.google.com/s2/favicons?domain=https://www.youtube.com&sz=${256}`
                    }));
                resolve(items);
            })
            .catch(error => {
                console.log(error);
                reject([]);
            });
    })
}


export default async (req, res) => {
    const q = req.query.q;
    const page = Number(req.query.page || 1)
    const start = (page - 1) * 10 + 1;

    console.log(`Calling Search All API: q=${q}, start=${start}`);

    const AllResults = [];

    const [newsResults, allResults, videosResults] = await Promise.all([
        fetchNewsResults(q, page),
        fetchAllResults(q, start),
        fetchVideosResults(q, page)
    ]);

    AllResults.push(...newsResults);
    AllResults.push(...allResults);
    AllResults.push(...videosResults);

    if (AllResults.length == 0) {
        res.status(200).json([]);
        return;
    }

    for (let i = AllResults.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [AllResults[i], AllResults[j]] = [AllResults[j], AllResults[i]];
    }

    res.status(200).json(AllResults);
}