import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutpage = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header">
      <ul>
        <Link to="/">
          <li className="image-list">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="web-logo"
            />
          </li>
        </Link>
      </ul>
      <ul className="paths">
        <Link to="/">
          <li className="path">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="path">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-button" onClick={logoutpage}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
