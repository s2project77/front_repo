import Navbar from "../medicine/navabr";
const Layout=({ children })=> {
  return (
    <div className='min-h-screen  bg-white   overflow-hidden '>
        <Navbar/>
        
       
        {children}</div>
  )
}
export default Layout;