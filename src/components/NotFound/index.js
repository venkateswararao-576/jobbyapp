import './index.css'

const NotFound = () => (
  <div className="not-found">
    <img
      alt="not found"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="not-found-image"
    />
    <h1 className="not-found-name">Page Not Found</h1>
    <p className="not-text">
      we are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
