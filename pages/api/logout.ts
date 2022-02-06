import { User } from '@/types/authResponse'
import { ErrorResponse } from '@/types/errorResponse'
import cookie, { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    )

    res.status(200).json({ message: 'Success' })
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
