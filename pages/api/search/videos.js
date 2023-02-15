export default async (req, res) => {
    const q = req.query.q;
    const page = req.query.page || "";

    console.log(`Calling Videos API: q=${q}, start=${page}`);

    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=200&q=${q}&type=video&key=${process.env.YOUTUBE_API_KEY}&pageToken=${page}`).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    });

    const repsonseJson = await response.json();

    // console.log(repsonseJson);

    if (repsonseJson?.items?.length === 0) {
        res.status(200).json({
            videos: [],
            pageInfo: {},
        });
        return;
    }

    const videos = repsonseJson.items.map((item) => {
        return {
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url,
            publishedBy: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
        };
    });

    const pageInfo = { 
        nextPageToken: repsonseJson.nextPageToken,
        totalResults: repsonseJson.pageInfo.totalResults,
        resultsPerPage: repsonseJson.pageInfo.resultsPerPage,
    };

    res.status(200).json({
        videos,
        pageInfo,
    });

}