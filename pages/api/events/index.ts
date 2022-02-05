// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import events from './data'

type Data = {
  id: string
  name: string
  slug: string
  venue: string
  address: string
  performers: string
  date: string
  time: string
  description: string
  image: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | { message: string }>
) {
  if (req.method === 'GET') res.status(200).json(events)
  else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
