"use client"
import { FaArrowLeft, FaEye, FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'


export default function page ()  {
    
{/*  the login page */}
const  [complet,setcomplet]=useState(true)
const  [formdata,setformdata]=useState({
email:"",
password:"",
})
const [currentStep,setcurrentStep]=useState(1)

const  handleChange=(e)=>{
   const {value,name,checked,type}=e.target;
   setformdata({...formdata,[name]:type=="checkbox"? checked:value})
}
const  handleSubmit=()=>{
   setcurrentStep(3);

   //ready to take it to back end 
}
const handleSubmitForm=async(e)=>{
  e.preventDefault();
  console.log("posting  log in data:"+formdata);
  const data=await fetch("https://jsonplaceholder.typicode.com/posts",{
    method:"post",
    headers:{"content-Type":"application/json"},
    body:JSON.stringify(formdata),
  })
  const res=await data.json();
  
  console.log("Response from API:", res); // Log full response
  alert(`Posted! Passowrd: ${res.password} | Email: ${res.email || "Not returned by API"}`);
}
  return (
    <section className='flex min-h-screen overflow-hidden'>

        <div  className='md:w-2/5 text-black  p-5 flex-col min-h-screen   h-full md:flex  hidden   bg-gradient-to-b  from-green-900 to-green-800  '   >

        <div className='flex flex-col p-1'>
  <h1 className='flex font-bold text-white' >PHARMANET</h1>
  <div className=' text-white'>
  <Link  href="/regestration" className=' gap-4  font-bold inline-flex items-center' ><FaArrowLeft/>back to web site</Link>
  </div>
        </div>
        <div className='flex mb-10  flex-col flex-1 items-center justify-center'>

 <div  className='text-center flex flex-col '  >
    <div className=' text-green-400 text-9xl mb-9 mx-auto items-center justify-center' >
        <FaPlus className=' drop-shadow-[0_0_25px_rgba(74,222,128,0.8)]'/>
    </div>

    <h2 className="text-3xl text-white font-bold text-center mt-6">Join Our</h2>
            <h2 className="text-3xl text-white font-bold text-center">Pharmacy Network</h2>
            <p className="text-green-200 text-lg text-center mt-4 max-w-xs">
            Access your prescriptions, manage medications, and connect with healthcare professionals
            </p>
 </div>

        </div>
        <div className='text-white '>
© 2025 PharmaNet. All rights reserved.
</div>





        </div>

        <div>


        </div>




<div  className='flex items-center md:w-3/5 w-full  flex-col'  >
{ currentStep === 1 && (
<div className="w-full max-w-lg m-auto"  >
<div className='flex flex-col mb-9 m-auto gap-2'>
<h1 className="text-3xl font-bold text-green-800 mb-2"  >WELCOME BACK </h1>
<p  className="text-gray-600">Please enteryour details to access your acount</p>

</div>

<form  onSubmit={(e)=>{handleSubmitForm(e);
handleSubmit()
}
} >
<div className="grid grid-cols-1 gap-4">
<div >
 <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-4">Email</label>
 <input  type='text' 
 htmlFor="email"
 name='email'
 value={formdata.email}
 
  onChange={handleChange}
 
 required  placeholder='enter your mail' className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"     />
 </div> 
 <div  >
 <label htmlFor="password" className="block mb-4 text-sm font-medium text-gray-700 " >Password</label>
 <div className='relative'>
 <input type='password' htmlFor="password"  
  name='password'
  value={formdata.password}
  onChange={handleChange}
 placeholder='enter your mail'  required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"   />
 <FaEye className='absolute right-3 top-5 items-center text-center'/>
 </div>
 <p
   className='text-right text-green-600 ' >
    forget password?
 </p>
 </div>
<div  className='mt-10'>
    <button type='submit' className='w-full h-16 text-white font-bold  bg-green-600 rounded-[10px]' > Log in</button>
</div>
</div>
</form>

 
</div>
)}


{currentStep === 3 && (
                <div className="text-center m-auto py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
                  <p className="text-gray-600 mb-8">
                    Your account has been created. You can now access all our pharmacy services.
                  </p>
                  
                  <Link href="/mainpage" className="inline-block bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium">
                    Go to Main page
                  </Link>
                </div>)}


</div>








    </section>
  )
}
