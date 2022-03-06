import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import '../styles.scss'

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
        }
      }
    }
  `)

  const [isActive, setisActive] = React.useState(false)

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container is-max-widescreen">
          <div className="navbar-brand">
            <Link className="navbar-item has-text-weight-bold is-size-4" to="/">
              {data.site.siteMetadata.siteTitle}
            </Link>
            <a
              onClick={() => {
                setisActive(!isActive)
              }}
              role="button"
              className={`navbar-burger ${isActive ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasic"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div
            id="navbarBasic"
            className={`navbar-menu ${isActive ? 'is-active' : ''}`}
          >
            <div className="navbar-end">
              <Link to="/posts" className="navbar-item">
                Posts
              </Link>
              <Link to="/about" className="navbar-item">
                About
              </Link>
              <Link to="/contact" className="navbar-item">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section class="section">
        <div class="container is-max-widescreen">
          <div className="main-content">{children}</div>
        </div>
      </section>

      <footer className="footer has-background-white">
        <div className="content has-text-centered">
          <strong>{data.site.siteMetadata.siteTitle}</strong> by{' '}
          <a href="#">Stuart Mackenzie</a>.
        </div>
      </footer>
    </div>
  )
}
export default Layout
