export default async (req, res) => {
    const q = req.query.q;

    const wikipediaResult = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${context.query.q}`)
    .then((response: Response) => response.json())

    

}