import { User } from '@/types/authResponse'
import { ErrorResponse } from '@/types/errorResponse'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(401).json({
        error: {
          status: 401,
          name: 'Unauthorized',
          message: 'Not authenticated!',
        },
      })
      return
    }

    const jwt = req.cookies['jwt']

    const strapiRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )

    const data: User | ErrorResponse = await strapiRes.json()

    if (!strapiRes.ok && 'error' in data) {
      res.status(data.error.status).json(data)
    } else if (strapiRes.ok && 'username' in data) {
      res.status(200).json(data)
    } else {
      res.status(500).json({
        error: {
          status: 500,
          name: 'Internal Server Error',
          message: 'Internal Server Error',
        },
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({
      error: {
        status: 405,
        name: 'Method Not Allowed',
        message: `Method ${req.method} not allowed`,
      },
    })
  }
}
