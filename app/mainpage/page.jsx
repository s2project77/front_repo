import React from 'react'
import Layout from '../components/mainpage_layout/layout'
import { Side_bar } from '../components/mainpage/side_bar'
import { Middle_part } from '../components/mainpage/middle_part'
import { Right_part } from '../components/mainpage/right_part'
const page1 = () => {
  return (
    <Layout>
        <div className='grid min-h-screen md:grid-cols-[auto_3fr_2fr]  mt-3  grid-cols-1   '>
   
      <Side_bar></Side_bar>
   
     <Middle_part></Middle_part>
     <Right_part></Right_part>
             </div>
</Layout>  )
}
export default page1;