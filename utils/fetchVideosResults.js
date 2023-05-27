const fetchVideosResults = (q, page, max = 60) => {
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
                    .slice((page - 1) * max, (page - 1) * max + max)
                    .map((item, i) => ({
                        title: item.snippet.title,
                        link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                        displayLink: "youtube.com",
                        snippet: item.snippet.description,
                        thumbnail: item.snippet.thumbnails.medium.url,
                        favicon: `https://www.google.com/s2/favicons?domain=https://www.youtube.com&sz=${256}`,
                    }));
                resolve(items);
            })
            .catch(error => {
                console.log(error);
                reject([]);
            });
    })
}

export default fetchVideosResults;