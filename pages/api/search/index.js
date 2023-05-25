import _ from "lodash";
import fetchSearchResults from "@/utils/fetchSearchResults";
import fetchNewsResults from "@/utils/fetchNewsResults";
import fetchVideosResults from "@/utils/fetchVideosResults";

export default async (req, res) => {
    const q = req.query.q;
    const page = Number(req.query.page || 1)
    const start = (page - 1) * 10 + 1;

    console.log(`Calling Search API: q=${q}, start=${start}`);

    const [newsResults, searchResults, videosResults] = await Promise.all([
        fetchNewsResults(q, page, 7),
        fetchSearchResults(q, start),
        fetchVideosResults(q, page, 4)
    ]);
    
    const RESULTS = [
        ...newsResults,
        ...searchResults,
        ...videosResults
    ];

    if (RESULTS.length == 0) {
        res.status(200).json([]);
        return;
    }

    res.status(200).json(_.shuffle(RESULTS));
}