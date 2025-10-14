import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const handleLoginClick = () =>{
        navigate("/login")
    }
  return (
    <div>
      this is home page
      <button
      onClick={handleLoginClick}
      >login</button>
    </div>
  )
}

export default Home
