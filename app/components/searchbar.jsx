"use client"
import search from './search.svg' 
import React, { useState } from 'react'
import Link from 'next/link'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export const Searchbar = ({ data }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div className="w-[60%] relative">
      {/* Container with border + shadow */}
      <div
        className="border border-gray-300 shadow-[16px]  rounded-md p-2 relative"
        onClick={handleShow}
      >
        {/* Bell icon absolutely positioned */}
        <div className="absolute right-3 top-3 text-yellow-500 cursor-pointer hover:text-yellow-600 z-10">
          <img href={search} />  
        </div>

        {/* All command logic inside here */}
        <Command className="w-full">
          <CommandInput placeholder="Type a command or search..." />
          {show && (
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {data.map((item, index) => 
                 <Link href={`./Documentation/${index}`} > <CommandItem   key={index}>{item.brandName}</CommandItem></Link>
                )}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </div>
    </div>
  )
}

export default Searchbar
