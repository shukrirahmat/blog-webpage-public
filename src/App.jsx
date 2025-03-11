import { Outlet , Link } from "react-router-dom"

function App() {

  return (
    <>
      <nav className='navbar'>
        <Link to="/"><h1>MY BLOG</h1></Link>
        <Link to='/log-in'>LOG IN</Link>
        <p></p>
        <Link to='/sign-up'>SIGN UP</Link>
      </nav>
      <hr></hr>
      <Outlet/>
    </>
  )
}

export default App