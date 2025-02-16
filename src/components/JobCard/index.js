import {Link} from 'react-router-dom'
import {IoMdStar} from 'react-icons/io'
import {IoLocationSharp, IoBagHandle} from 'react-icons/io5'

import './index.css'

const JobCard = props => {
  const {detail} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = detail

  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobcard">
        <div className="logo-type">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="type-rating">
            <h1 className="company-name">{title}</h1>
            <div className="star-rating">
              <IoMdStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package">
          <div className="location-type">
            <div className="location">
              <IoLocationSharp className="locate-icon" />
              <p className="location-name">{location}</p>
            </div>
            <div className="location">
              <IoBagHandle className="locate-icon" />
              <p className="location-name">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr width="100%" />
        <h1 className="descript-head">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
