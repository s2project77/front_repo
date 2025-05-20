import React from 'react'
import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  
import { Button } from '@/components/ui/button'
const Navbararray=[/*{name:"Get started" ,id:1 ,link:"/" },*/{name:"Help" ,id:2 ,link:"/" },{name:"Contact" ,id:3,link:"/" },]
const buttonarray=[{name:"Sign up" ,id:1 ,link:"/",color:"signup_button"},{name:" Pharmacie" ,id:2 ,link:"/",color:"Pharmacie_button"},]
export const Navbar = () => {
  return (
    <header  className='  top-3 right-3 left-3 fixed shadow-xl shadow-gray-400 flex flex-row  font-bold  bg-navbar_color   backdrop-blur-lg  h-[1.5cm]  bg- items-center justify-center text-center           '>
<div className='flex  w-[25%] justify-center items-center text-center  p-auto '>
    
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60">
  
  <rect x="5" y="15" width="30" height="30" rx="15" fill="#4CAF50"/>
  <rect x="15" y="15" width="20" height="30" rx="10" fill="#fff"/>
  <circle cx="25" cy="35" r="5" fill="#4CAF50"/>
  
  <text x="35" y="35" font-family="Arial, sans-serif" font-size="24" className='pl-9' fill="black">
 Pharmacy
  </text>
</svg>

    
    
     </div>
<div className='flex flex-1 text-black items-center justify-center text-center flex-row gap-16'>


<ul className='flex items-center justify-center text-center text-black flex-row gap-16'>
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Get Started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink></NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

    {Navbararray.map((ele,_)=>
    <li key={ele.id}>  <Link  href={ele.link} >{ele.name}</Link> </li>
    )}
</ul>


</div>
<div className='flex flex-row gap-5 w-[30%]    items-center justify-center ' >

<ul className='flex gap-5  flex-row '>

{buttonarray.map((ele,_)=>
    <li key={ele.id}> <Button className=" shadow-xl border border-green-700" variant={ele.color}  >  <Link  href={ele.link} >{ele.name}</Link> </Button></li>
    )}

</ul>



</div>


    </header>
  )
}
export default Navbar;