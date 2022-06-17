// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NotionAPI } from 'notion-client'


import { idToUuid } from 'notion-utils'
import { pageId } from '../../notion.config.json'
const api = new NotionAPI()
console.log("api", api)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await api.getPage(pageId)
  const collection_view = response.collection_view
  const views = Object.values(collection_view)
  const pages = views[0].value
  // @ts-ignore
  res.status(200).end(JSON.stringify({ sources: response, pages: pages.page_sort }))
}
