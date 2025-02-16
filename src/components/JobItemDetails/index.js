import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdStar} from 'react-icons/io'
import {IoLocationSharp, IoBagHandle} from 'react-icons/io5'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apivalues = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobdetails: '',
    haveSkills: [],
    similarJobs: [],
    apistatus: apivalues.initial,
  }

  componentDidMount() {
    this.getjobDetails()
  }

  getjobDetails = async () => {
    this.setState({apistatus: apivalues.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      console.log(data.job_details.company_website_url)
      const companyDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const skillsRequire = data.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      const similarJobs = data.similar_jobs.map(each => ({
        id: each.id,
        title: each.title,
        companyLogoUrl: each.company_logo_url,
        location: each.location,
        jobDescription: each.job_description,
        employmentType: each.employment_type,
        rating: each.rating,
      }))
      this.setState({
        jobdetails: companyDetails,
        haveSkills: skillsRequire,
        similarJobs,
        apistatus: apivalues.success,
      })
    } else {
      this.setState({apistatus: apivalues.failure})
    }
  }

  successview = () => {
    const {jobdetails, haveSkills, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      description,
      imageUrl,
      title,
    } = jobdetails
    return (
      <div className="job-detail-container">
        <Header />
        <div className="jobcard">
          <div className="logo-type">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="href">
            <h1 className="descript-head">Description</h1>
            <div className="anchor-tag">
              <a href={companyWebsiteUrl} className="anchor">
                Visit
                <BsBoxArrowUpRight className="anchor-icon" />
              </a>
            </div>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="descript-head">Skills</h1>
          <ul className="skill-items">
            {haveSkills.map(each => (
              <li className="skill-item" key={each.id}>
                <img
                  src={each.imageUrl}
                  className="skill-image"
                  alt={each.name}
                />
                <p className="description">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="descript-head">Life at Company</h1>
          <div className="life-of-company">
            <p className="company-descript">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="company-life-image"
            />
          </div>
        </div>
        <h1 className="similar-head">Similar Jobs</h1>
        <ul className="similar-list-items">
          {similarJobs.map(each => (
            <SimilarJobs details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  retry = () => this.getjobDetails()

  failureview = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="error-head">Oops! Something Went Wrong</h1>
      <p className="error-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.retry} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  loadspinner = () => (
    <div className="failure-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {apistatus} = this.state
    switch (apistatus) {
      case apivalues.success:
        return this.successview()
      case apivalues.failure:
        return this.failureview()
      case apivalues.progress:
        return this.loadspinner()
      default:
        return null
    }
  }
}
export default JobItemDetails
