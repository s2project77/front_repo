"use client"
import Layout from '../components/mainpage_layout/layout'
import React from 'react'
import { Side_bar } from '../components/mainpage/side_bar'

import Table2 from '../components/addmedicament/table2'
 const page = () => {
  return (
    <Layout>

<div id='addmedicament' className='grid grid-cols-1   sm:grid-cols-[1.1fr_4fr]'>
<Side_bar></Side_bar>
<div className=' justify-center   mt-[2cm]    mx-[3cm]'    >
<Table2/></div>
</div>

    </Layout>
 ) }
export default page;