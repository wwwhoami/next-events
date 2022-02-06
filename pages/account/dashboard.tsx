import Layout from '@/components/Layout'
import { NextPage } from 'next/types'
import React from 'react'

type Props = {}

const DashBoardPage: NextPage<Props> = (props) => {
  return <Layout title="User Dashboard">UserPage</Layout>
}

export default DashBoardPage
