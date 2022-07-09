import { NextApiRequest, NextApiResponse } from "next"
import { NotionAPI } from "notion-client"
const api = new NotionAPI()
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        const pageContent = await api.getPage(req.query.id as string)
        const pageRaw = await api.getBlocks([req.query.id as string])
        res.status(200).end(JSON.stringify({ pageContent, pageRaw, ok: true }))
    } catch {
        res.status(200).end(JSON.stringify({ ok: false }))
    }

}
