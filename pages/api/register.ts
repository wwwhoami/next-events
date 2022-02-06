import { authResponse } from '@/types/authResponse'
import { ErrorResponse } from '@/types/errorResponse'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body

    const strapiRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    )

    const data: authResponse | ErrorResponse = await strapiRes.json()

    if (!strapiRes.ok && 'error' in data) {
      res.status(data.error.status).json(data)
    } else if (strapiRes.ok && 'user' in data) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('jwt', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 2, // 2 hours
          sameSite: 'strict',
          path: '/',
        })
      )

      res.status(200).json(data.user)
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
    res.setHeader('Allow', ['POST'])
    res.status(405).json({
      error: {
        status: 405,
        name: 'Method Not Allowed',
        message: `Method ${req.method} not allowed`,
      },
    })
  }
}
