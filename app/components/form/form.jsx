"use client"
{/*  the login page */}
import { useState } from "react"
export const  [complet,setcomplet]=useState(true)
export const  [formdata,setformdata]=useState({
email:"",
password:"",
})

export const  handleChange=(e)=>{
   const {value,name,checked,type}=e.target;
   setformdata({...formdata,[name]:type=="checkbox"? checked:value})
}
export const  handleSubmit=()=>{
   setcurrentStep(3);

   //ready to take it to back end 
}

 {/* the regetration page*/ }
 export const [currentStep,setcurrentStep]=useState(1)
 export const [showPassword,setShowPassword]=useState(false);
 export const [showConfirmPassword,setShowConfirmPassword]=useState(false);
 export const [formDataRegestration,setformdataRegestration]=useState({
  
    firstName:"",
    lastName:"",
    location:"",
    password:"",
    confirmPassword:"",
    agreeToTerms:""
  })
 export const nextStep=()=>{
  
  
  setcurrentStep(c=>c+1)  ;
  }
 
 export const prevStep=()=>{
  setcurrentStep(c=>c-1);
  }
 export const handleChange2=(e)=>{
   const {value,name,checked,type}=e.target;
   setformdataRegestration({...formDataRegestration,[name]:type=="checkbox"? checked:value})
 }
  export const handleSubmit2=()=>{
   setcurrentStep(3);
 
   //ready to take it to back end 
 }