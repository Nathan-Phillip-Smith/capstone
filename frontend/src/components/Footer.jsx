import { useNavigate, useLocation } from 'react-router-dom'

const HomeFooter = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const content = (
    <>
      <section className="home-footer__socials">
        <div>
          <p className="home-footer__socials-text">
            Follow for the latest
            <span className="home-footer__bold">CPU news & events</span>
          </p>
        </div>
        <div className="home-footer__socialIMG"></div>
      </section>
      <footer className="home-footer">
        <p className="home-footer__address">
          555 Foo Drive, Foo City, CA 55555 • (555) 555 - 5555 • @CAPSTONE
          PROJECT UNIVERSITY
        </p>
        <p className="home-footer__address">
          Terms of Use | Privacy Statement | Copyright Complaints |
          Non-Discrimination
        </p>
      </footer>
    </>
  )
  return content
}
export default HomeFooter
