import React from 'react'
import { Side_bar } from '@/app/components/mainpage/side_bar';
import Layout from '@/app/components/mainpage_layout/layout';
import Searchbar from '@/app/components/searchbar';
import Image from 'next/image';
import Link from 'next/link';
export const page = async({params}) => {
    const {id}=params;
    const data=await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
    const Data2=await fetch("https://jsonplaceholder.typicode.com/photos");
    const fetchData=await Data2.json();
    const product=await data.json();

  return (
    <Layout>
        <div className='grid sm:grid-cols-[1.1fr,4fr] grid-cols-1'>
        <Side_bar></Side_bar>

            <div className="flex w-full px-20 relative flex-col gap-10 p-6">
              <div>
                <h1 className="text-2xl font-bold">Medicaments Documentation</h1>
              </div>
              
              <div className="flex items-center justify-center">
                <Searchbar data={fetchData} />
              </div>
              <div className= ' bg-slate-100 shadow-md border-gray-400 grid grid-cols-1 sm:grid-cols-[1.1fr,3fr] mx-auto items-center  justify-center h-[6.5cm] relative   w-[80%] mt-6 ' >
                <Image src="/téléchargement.jpg" width={100} height={100} alt='d' className=' top-0 left-0 relative object-cover w-full h-[6.5cm] ' />
                <div className='flex items-center justify-center flex-col '>
                  <h1>{product.title}</h1>
                 <Link href={product.url} > <p>{product.url}</p>
                 </Link>                  <button className='  bottom-4 right-4 bg-blue-700 border-gray-50 shadow-md rounded-lg h-9 w-[2.8cm]  text-white  absolute ' > show details</button>

                  </div>
              </div>

</div>
</div>

    </Layout>
  )
}
export default page;