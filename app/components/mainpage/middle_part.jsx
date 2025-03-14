import React from 'react'
import Image from 'next/image'
export  const Middle_part = () => {
  return (
    <div className='min-h-screen flex flex-col gap-3  pt-6  relative items-center '> 
    <div className='w-[85%]  rounded-xl  flex flex-row relative justify-center items-center h-[2cm] mx-auto '>
    <span className=" text-2xl text-gray-400 absolute left-8 ">🔍</span>
<input type="text" className='w-[86%] h-[68%] mt-2  ml-3  pl-10 py-3 border-gray-400 border-solid border rounded-xl ' placeholder='Search For Medicament' />
<span className="pr-3 font-bold text-2xl justify-center mb-2 h-6 w-10 text-yellow-500"> 🔔</span>
    </div>
    <div className='w-[85%] bg-green-100 border  border-black shadow-xl shadow-gray-300 rounded-xl flex flex-col gap-2   relative h-[7cm] mx-auto mt-3'>
<div className='flex  flex-row gap-2 flex-1 '>

    <div className='relative h-full w-[40%]'><Image src={"/map.jpg"} width={100} height={100} alt='s' className='w-full h-full object-cover ' ></Image></div>
    <div className='w-full h-full   '>
<ul className='flex flex-col justify-center h-full '>
    <li className='text-left  '>
        pahrmacie name 
    </li>
    <li className='text-left  '>
        location
    </li >
    <li className='text-left  '>user reference : DZ-19</li>


</ul>

    </div>
</div>
<div className='flex  relative  w-full h-full flex-col gap-4 flex-1'>

<div className='grid w-full  ml-4  grid-cols-2 gap-5'> 
<span className='flex flex-row gap-2' > first name: 
<p>Lachoub</p>

</span>

<span className='flex flex-row  gap-2'>Last Name:  <p> Zineddine</p></span>
    
     </div>

<div className='w-full ml-4'>
  <span className=' flex-row flex'> Pharm agremenet number : <p>167771717</p>  </span> 
</div>
<div className='grid ml-4 w-full  grid-cols-2'>
 <span className='flex flex-row'> phone number: <p>0661895757</p> </span>
 <span className='flex flex-row' >FAX: <p> value to fetch </p></span>
</div>
</div>
    </div>
    <div className='w-[85%]  rounded-xl h-[3cm] flex flex-col gap-3 justify-center mx-auto mt-3'>
<span  className='text-2xl mx-2 text-green-700 font-bold' >improve your website:</span >
<p className='mx-3'>Adding a new medicament or informations will 
improve your website so do not miss it  .</p>
    </div>
    

    <div className='w-[85%]  rounded-xl relative justify-center items-center h-[1cm] mx-auto '>

 <button className='w-full h-full rounded-xl font-bold text-1xl text-white bg-red-500  mt-2  hover:bg-red-400   '>add an iformations about your  medicament </button>

</div>

      </div>
  )
}
