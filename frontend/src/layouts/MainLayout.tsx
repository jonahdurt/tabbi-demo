import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WidthContainer from '../components/WidthContainer'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const MainLayout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className='flex flex-col min-h-svh'>
      <Navbar />
      <div className='flex-grow my-12'>
        <WidthContainer>
          <Outlet />
        </WidthContainer>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout