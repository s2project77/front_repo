import Layout from '../components/mainpage_layout/layout'
import React from 'react'
import { Side_bar } from '../components/mainpage/side_bar'
import { Table } from '../components/addmedicament/table'
 const page = () => {
  return (
    <Layout>

<div className='grid grid-cols-1  mt-3 sm:grid-cols-[auto_4fr]'>

<Side_bar></Side_bar>
<Table></Table>
</div>

    </Layout>
 ) }
export default page;

  