import { Link } from 'react-router-dom'
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'

const Home = () => {
  const content = (
    <>
      <HomeHeader />
      <main className="home__main">
        <section className="home__banner">
          <h1>CPU</h1>
          <p>Your Education Starts Here!</p>
        </section>
        <section className="home__divider">
          <div className="home__divider-line"></div>
          <div className="home__divider-text">
            <p>Start</p>
            <p>Today!</p>
          </div>
          <div className="home__divider-line"></div>
        </section>
        <section className="home__about">
          <div className="home__about-lorem">
            <img className="home__about-img" src="/img/studentLife.jpg"></img>
            <h2 className="home__about-img-title">Student Life</h2>
            <p className="home__about-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              dolor nam, perferendis sequi placeat est sapiente officia quam
              voluptate accusamus, amet sint veniam laboriosam excepturi
              accusantium sit, numquam ex perspiciatis!
            </p>
          </div>
          <div className="home__about-lorem">
            <img className="home__about-img" src="/img/desk.png"></img>
            <h2 className="home__about-img-title">Online Learning</h2>
            <p className="home__about-text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Incidunt, cum! Perferendis aperiam libero saepe assumenda
              molestiae accusantium iusto repellendus illo nisi harum
              laboriosam, officia eius vitae iure nobis nam necessitatibus?
            </p>
          </div>
          <div className="home__about-lorem">
            <img className="home__about-img" src="/img/scholar.jpg"></img>
            <h2 className="home__about-img-title">Scholarships</h2>
            <p className="home__about-text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
              magnam fugiat molestiae. Esse, ratione debitis! Necessitatibus
              laudantium fuga, porro ab eum molestiae suscipit ratione saepe
              accusantium enim deleniti odit quos.
            </p>
          </div>
          <div className="home__about-lorem">
            <img className="home__about-img" src="/img/Schools.png"></img>
            <h2 className="home__about-img-title">Schools</h2>
            <p className="home__about-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              consequuntur consectetur quam blanditiis enim hic cupiditate alias
              veritatis possimus, nihil quasi totam aliquam similique laboriosam
              ullam labore praesentium minus mollitia?
            </p>
          </div>
        </section>
      </main>
      <HomeFooter />
    </>
  )
  return content
}
export default Home
