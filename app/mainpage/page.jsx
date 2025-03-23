import React from 'react'
import Layout from '../components/mainpage_layout/layout'
import { Side_bar } from '../components/mainpage/side_bar'
import { Middle_part } from '../components/mainpage/middle_part'
import { Right_part } from '../components/mainpage/right_part'
const page1 = () => {
  return (
    <Layout>
        <div className='grid bg-gray-100 min-h-screen md:grid-cols-[1.3fr_3fr_2fr]    grid-cols-1   '>
   
      <Side_bar></Side_bar>
     <Middle_part></Middle_part>
     <Right_part></Right_part>
             </div>
</Layout>  )
}
export default page1;