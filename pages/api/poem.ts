import { NextApiRequest, NextApiResponse } from "next"
import { NotionAPI } from "notion-client"
const api = new NotionAPI()
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const response = await api.getPage(req.query.id as string)

    res.status(200).end(JSON.stringify(response))
}
