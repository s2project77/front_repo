import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Navbar_data=[
    {id:1,name:"Home",link:"/"},

    {id:2,name:"About",link:"/"},

    {id:3,name:"Documentation",link:"/"},

    {id:4,name:"Help",link:"/"},




]
export default function Navbar() {

    return (
    <header>
        <div className='flex relative top-2 right-4 left-2 flex-row h-[2cm] justify-between bg-green-100  '>
 <div className='w-[5cm]  justify-center items-center text-center flex mx-auto    ' >
 <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="text-xl font-bold text-green-800">MediFind</span>

 </div>

 <nav className='flex-1 justify-center items-center text-center sm:flex  hidden   ' >
 <ul className='flex flex-row gap-8'>
{Navbar_data.map((data)=>

    <li  key={data.id}>
        <Link className='text-xl' href={data.link}>{data.name}</Link>
    </li>


)}
</ul>

 </nav>
 <div className='w-[6cm] justify-center items-center mx-auto text-center flex flex-row gap-4  ' ><Link href={"/"}>your profile</Link>
 <div className='w-[66px] h-[66px]  rounded-[50px]  border-2 justify-center' ><Image  src={"/profile.png"} width={50} height={50} alt='' className='justify-center mx-auto mt-1'  ></Image> </div></div>

 </div>
    </header>
  )
}
