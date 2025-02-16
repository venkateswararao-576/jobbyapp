import {IoMdStar} from 'react-icons/io'

import './index.css'

const SimilarJobs = props => {
  const {details} = props
  const {
    title,
    employmentType,
    companyLogoUrl,
    jobDescription,
    rating,
    location,
  } = details
  return (
    <li className="similar-job">
      <div className="logo-type-similar">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-similar"
        />
        <div className="type-rating-similar">
          <h1 className="company-name-similar">{title}</h1>
          <div className="star-rating-similar">
            <IoMdStar className="star-similar" />
            <p className="rating-similar">{rating}</p>
          </div>
        </div>
      </div>
      <p className="description-similar">{location}</p>
      <p className="description-similar">{employmentType}</p>
      <h1 className="descript-head-similar">Description</h1>
      <p className="description-similar">{jobDescription}</p>
    </li>
  )
}
export default SimilarJobs
