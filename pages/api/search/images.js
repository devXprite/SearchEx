import _ from "lodash";
import fetchImageResults from "@/utils/fetchImageResults";
import fetchVideosResults from "@/utils/fetchVideosResults";

export default async (req, res) => {
  const q = req.query.q;
  const page = Number(req.query.page) || 1;

  console.log(`Calling Image API: q=${q}, page=${page}`);

  const [imageResults, videosResults] = await Promise.all([
    fetchImageResults(q, page),
    fetchVideosResults(q, page, 4)
  ]);

  const RESULTS = [
    ...imageResults,
    ...videosResults
  ];

  if (RESULTS.length == 0) {
    res.status(200).json([]);
    return;
  }

  res.status(200).json(_.shuffle(RESULTS));
}
