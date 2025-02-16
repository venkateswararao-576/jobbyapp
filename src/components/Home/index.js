import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="text-container">
      <h1 className="home-title">
        Find The Job That
        <br /> Fits Your Life
      </h1>
      <p className="description">
        Millions of people are searching for jobs,
        <br /> salary information, company reviews. Find the
        <br /> job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="find-job-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
