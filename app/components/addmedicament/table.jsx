"use client"
import React, { useEffect, useState } from 'react'
import { ChevronRight } from "lucide-react";
import { ChevronDown } from 'lucide-react';
const table_data=[{
    id:1,name:"Medicament N",name_input:"Medicament_N"
},
{
    id:2,name:"Medicament Name",name_input:"Medicament_Name"
},{
    id:4,name:"Medicament Family",name_input:"Medicament_Family"
},{
    id:5,name:"Medicament Label's",name_input:"Medicament_Label"
},{
    id:6,name:"Medicament Status",name_input:"Medicament_Status"
},]
export const Table = () => {
    
    const [Row_infos,setRow_infos]=useState({
        Medicament_N:"",
        Medicament_Name:"",
        Medicament_Family:"",
        Medicament_Label:"",
        Medicament_Status:""
})
const [Table_infos,setTable_infos]=useState(()=>{
    return JSON.parse(localStorage.getItem("Table"))
})
    console.log(Row_infos)
    const fillRow_infos=(e)=>{
    const {name} = e.target
    setRow_infos({...Row_infos,[name]:e.target.value})
    }
    const fillTable_infos=()=>{
         if(all_are_fill()){        
           setTable_infos(p=>[Row_infos,...p])
           
          setRow_infos({
            Medicament_N:"",
            Medicament_Name:"",
            Medicament_Family:"",
            Medicament_Label:"",
            Medicament_Status:""
    })
    
    
         
         }
         else{
            alert("please,enter all your infos before adding to the table")
         }
    }
    useEffect(()=>{
localStorage.setItem("Table",JSON.stringify(Table_infos))
    },[Table_infos])
    const [show,setshow]=useState(false)
   const hadndleshow=()=>{
        setshow(true)
    }
 const handledisapear=()=>{
     setshow(false)
 }
 const all_are_fill=()=>{
    return Object.values(Row_infos).every(value=>value.trim()!=="")
 }

 const handleRemove_from_table = () => {
    const new_Table_infos = Table_infos.filter((p) => {
        return !(
            p.Medicament_N === Row_infos.Medicament_N &&
            p.Medicament_Name === Row_infos.Medicament_Name &&
            p.Medicament_Family === Row_infos.Medicament_Family &&
            p.Medicament_Label === Row_infos.Medicament_Label &&
            p.Medicament_Status === Row_infos.Medicament_Status
        );
    });

    setTable_infos(new_Table_infos); 
};

    return (
    <div className='bg-gray-100 items-center my-auto w-full justify-center sm:pt-7 h-screen pt-24  sm:h-full'>
<div className='w-[80%] flex flex-col   h-full mx-auto'>
<div className='w-[85%]  rounded-xl mb-2 flex flex-row relative justify-center items-center h-[2cm] mx-auto '>
    <span className=" text-2xl text-gray-400 relative left-14 top-1  ">🔍</span>
<input type="text" className='w-[86%] h-[68%] mt-2  ml-3  pl-14 py-3 border-gray-400 border-solid border rounded-xl ' placeholder='Search For Medicament' />
<span className="pr-3 pl-2 font-bold text-2xl justify-center mb-2 h-6 w-10 text-yellow-500"> 🔔</span>
    </div>
<div className='flex flex-col gap-3'>
    <button className="flex items-center text-red-600 font-bold text-lg">
    {  show  ?( <ChevronRight  onClick={handledisapear}  />):(< ChevronDown onClick={hadndleshow} />)}
    
      Add Medicament
    </button>
    
 
{ !show && (<>
<table className="  shadow-md shadow-gray-300 border  border-gray-400">
        <thead className="bg-green-200">
          <tr>
            {table_data.map((data)=>
            <th key={data.id} className="border border-gray-500 px-4 py-2">{data.name}</th>
           )}
           
           
          </tr>
        </thead>
        <tbody>
            
          <tr>
            { table_data.map((_)=>
           <td key={_.id} className="border border-gray-500 relative h-11 "><input 
           name={_.name_input}
           value={Row_infos[_.name_input]}
           required
           
           type="text"  onChange={fillRow_infos} className='w-full border-none px-4 h-full'/></td> )
            
            
            }
            
          </tr>
         
        </tbody>
      </table>
      <div className='  flex flex-row  h-[2cm] px-auto mx-auto gap-10 relative items-center   '>
    <button onClick={()=>{
        fillTable_infos()
        }} className='relative flex items-center   justify-center bg-green-600 shadow-md rounded-xl shadow-gray-400 text-white h-[1cm] w-[4cm]  ' >Add to the list </button>  
    <button onClick={handleRemove_from_table} className='bg-red-500 shadow-md rounded-xl shadow-gray-400 text-white h-[1cm] w-[4cm]' >Remove from list</button>
    </div></>)
        }
      </div>
      <div className='w-full h-[10cm] my-7'>
<table className='w-full  shadow-lg shadow-gray-300' >
<thead className='bg-green-200 border border-gray-500  h-14'>
<tr>
    { table_data.map((data)=>
   <th key={data.id} className="border border-gray-500 px-4 py-2">{data.name}</th> )

}
</tr></thead>
<tbody className='bg-gray-50 h-11'>

    {Table_infos.map((row,index)=>
        
<tr className="" key={index}>      
<td  className='border border-black h-[1cm] pl-6    ' >
    {row.Medicament_N}
</td>
<td className=' border border-black h-[1cm] pl-6 '>
    {row.Medicament_Name}
</td>
<td className='border border-black h-[1cm]  pl-6  '>
    {row.Medicament_Family}
</td>
<td className='pl-6 h-[1cm] border border-black'>
    {row.Medicament_Label}
</td>
<td className='border border-black h-[1cm] pl-6'>
    {row.Medicament_Status}
</td> 



    </tr>
)}
 


</tbody>




</table>



      </div>
      </div>
     </div>
  );
  
};

