import Layout from '../components/mainpage_layout/layout'
import React from 'react'
import { Side_bar } from '../components/mainpage/side_bar'
import { Table } from '../components/addmedicament/table'
 const page = () => {
  return (
    <Layout>

<div id='addmedicament' className='grid grid-cols-1   sm:grid-cols-[1.1fr_4fr]'>

<Side_bar></Side_bar>
<Table></Table>
</div>

    </Layout>
 ) }
export default page;

  