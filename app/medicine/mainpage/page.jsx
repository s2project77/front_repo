import React from 'react'
import Layout from '@/app/components/medcine_layout/layout'
import { Middle_part } from '@/app/components/medicine/mainpage/middilpart'
import { Right_part } from '@/app/components/medicine/mainpage/rightpart'
import { Side_bar } from '@/app/components/mainpage/side_bar'
const page1 = () => {
  return (
    <Layout>
        <div id='mainpage' className='grid bg-white min-h-screen md:grid-cols-[1.3fr_3fr_1.3fr]    grid-cols-1   '>
      <Side_bar color={'blue'}></Side_bar>
     <Middle_part themeColor={'slate'}></Middle_part>
     
             </div>
</Layout>  )
}
export default page1;