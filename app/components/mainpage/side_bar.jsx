import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ImageUploader from './input_file'
const side_bar_data=[{id:1,name:"medicament documents",link:"/"},
    {id:2,name:"medicament documents",link:"/"},
    {id:3,name:"history",link:"/"},
    {id:4,name:"profile",link:"/"},
]
export const Side_bar = () => {
  return (
    <div  className=' font-bold text-black  relative flex flex-col gap-4 top-0 left-0  min-h-screen bottom-0 h-full py-7    text-left px-auto rounded-2xl bg-green-100 '   >
<div className='flex   flex-col relative mx-auto w-[90%]  h-[7cm] gap-3'>
    <h1 className=''>your location</h1>
     <Image src={"/map.jpg"} className='w-full   h-full' width={0} height={0} alt='your location' ></Image>
</div>
<div className=' border border-gray-300 rounded-xl p-3 w-[90%] h-[4.5cm] mx-auto'>
add medicament

<ImageUploader></ImageUploader>
</div>
<div className=' flex  mx-auto w-[90%] '>
    <ul className='flex flex-col gap-3'>
{side_bar_data.map((data)=>
<li key={data.id}>
    <Link  href={data.link}>
    {data.name}
    </Link>
</li>
)}
    </ul>
</div>

    </div>
  )
}
