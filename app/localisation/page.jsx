import React from 'react'
import { Side_bar } from '../components/mainpage/side_bar'
import Layout from '../components/mainpage_layout/layout'
import Localisation from '../components/localisation/localisation'
const page = () => {
  return (
    <Layout>
    <div className='sm:grid-cols-[1.1fr_4fr] grid-cols-1  grid '>

<Side_bar></Side_bar>
<Localisation></Localisation>

    </div>
    </Layout>)
}
export default page;