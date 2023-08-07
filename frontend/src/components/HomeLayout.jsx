import { Outlet } from 'react-router-dom'
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'

const HomeLayout = () => {
  return (
    <>
      <HomeHeader />
      <div className="home-container">
        <Outlet />
      </div>
      <HomeFooter />
    </>
  )
}
export default HomeLayout
