import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CheckAuth({ children, protectedRoute }) {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  useEffect(() => {

    const token = localStorage.getItem("token")
    if (protectedRoute) {
      if (!token) {
        navigate('/')
      } else {
        setLoading(false)
      }
    } else {
      if (token) {
        navigate("/")
      } else {
        setLoading(false)
      }
    }

  }, [navigate, protectedRoute])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='w-full'>
      {children}
    </div>
  )
}
