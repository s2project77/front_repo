import React from 'react'
import Layout from '../components/mainpage_layout/layout'
import { Side_bar } from '../components/mainpage/side_bar'
import TableStock from '../components/myStock/tableStock'
export const page = () => {
  return (

 <Layout>

<div className='grid grid-cols-1   sm:grid-cols-[1.1fr_4fr] w-full min-h-screen '>

<Side_bar></Side_bar>
<div className='m-[3cm]'>
<TableStock></TableStock></div>
</div>

 </Layout>

  
  )
}
export default page
