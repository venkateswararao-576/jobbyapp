import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'

import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const locationsList = [
  {
    label: 'Hyderabad',
    locationId: 'HYDERABAD',
  },
  {
    label: 'Bangalore',
    locationId: 'BANGALORE',
  },
  {
    label: 'Chennai',
    locationId: 'CHENNAI',
  },
  {
    label: 'Delhi',
    locationId: 'DELHI',
  },
  {
    label: 'Mumbai',
    locationId: 'MUMBAI',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apivalues = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
  noProducts: 'NO',
}

class JobCards extends Component {
  state = {
    jobsList: [],
    apistatus: apivalues.initial,
    searchValue: '',
    employInfo: {},
    apistatuscard: apivalues.initial,
    workType: [],
    locations: [],
    minPackage: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getjobcards()
  }

  getProfileDetails = async () => {
    this.setState({apistatus: apivalues.progress})
    const token = Cookies.get('jwt_token')
    const profileurl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(profileurl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedata = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({employInfo: updatedata, apistatus: apivalues.success})
    } else {
      this.setState({apistatus: apivalues.failure})
    }
  }

  getjobcards = async () => {
    this.setState({apistatuscard: apivalues.progress})
    const token = Cookies.get('jwt_token')
    const joburl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(joburl, options)
    const data = await response.json()

    if (response.ok) {
      const updateData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        id: each.id,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({apistatuscard: apivalues.success, jobsList: updateData})
    } else {
      this.setState({apistatuscard: apivalues.failure})
    }
  }

  updateSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  sorttheProducts = async () => {
    this.setState({apistatuscard: apivalues.progress})
    const {searchValue, minPackage, workType, locations} = this.state
    const token = Cookies.get('jwt_token')
    const jobsApiurl = `https://apis.ccbp.in/jobs?employment_type=${workType.join(
      ',',
    )}&minimum_package=${minPackage}&search=${searchValue}&location=${locations.join(
      ',',
    )}`
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiurl, options)
    const data = await response.json()
    if (response.ok) {
      if (data.jobs.length > 0) {
        const updateData = data.jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          id: each.id,
          employmentType: each.employment_type,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }))

        this.setState({apistatuscard: apivalues.success, jobsList: updateData})
      } else if (data.jobs.length === 0) {
        this.setState({apistatuscard: apivalues.noProducts})
      }
    } else {
      this.setState({apistatuscard: apivalues.failure})
    }
  }

  successview = () => {
    const {employInfo} = this.state
    const {name, profileImageUrl, shortBio} = employInfo
    return (
      <div className="card">
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="employ-name">{name}</h1>
        <p className="text">{shortBio}</p>
      </div>
    )
  }

  profilefailureview = () => (
    <button
      type="button"
      className="retry-button"
      onClick={this.getProfileDetails}
    >
      Retry
    </button>
  )

  showproducts = () => {
    const {jobsList} = this.state
    return (
      <ul className="job-cards">
        {jobsList.map(each => (
          <JobCard detail={each} key={each.id} />
        ))}
      </ul>
    )
  }

  noproductsview = () => (
    <div className="no-job-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="nojobs"
        className="no-job-image"
      />
      <h1 className="no-jobs">No Jobs Found</h1>
      <p className="no-job-text">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

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
      <button onClick={this.getjobcards} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  loadspinner = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  employtype = event => {
    const {workType} = this.state
    const type = event.target.value
    if (workType.length > 0) {
      const addemploy = workType.includes(type)
      if (addemploy === false) {
        this.setState(
          prev => ({workType: [...prev.workType, type]}),
          this.sorttheProducts,
        )
      } else {
        const removeType = workType.filter(each => each !== type)
        this.setState({workType: removeType}, this.sorttheProducts)
      }
    } else {
      this.setState(
        prev => ({workType: [...prev.workType, type]}),
        this.sorttheProducts,
      )
    }
  }

  selectlocation = event => {
    const {locations} = this.state
    const type = event.target.value
    if (locations.length > 0) {
      const isin = locations.includes(type)
      if (isin === false) {
        this.setState(
          prev => ({
            locations: [...prev.locations, type],
          }),
          this.sorttheProducts,
        )
      } else {
        const removelocation = locations.filter(each => each !== type)
        this.setState({locations: removelocation}, this.sorttheProducts)
      }
    } else {
      this.setState(
        prev => ({locations: [...prev.locations, type]}),
        this.sorttheProducts,
      )
    }
  }

  minimumPackage = event => {
    this.setState({minPackage: event.target.id}, this.sorttheProducts)
  }

  retry = () => this.getProfileDetails()

  renderprofileviews = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apivalues.success:
        return this.successview()
      case apivalues.failure:
        return this.profilefailureview()
      case apivalues.progress:
        return this.loadspinner()
      default:
        return null
    }
  }

  renderCardviews = () => {
    const {apistatuscard} = this.state
    switch (apistatuscard) {
      case apivalues.success:
        return this.showproducts()
      case apivalues.failure:
        return this.failureview()
      case apivalues.noProducts:
        return this.noproductsview()
      case apivalues.progress:
        return this.loadspinner()
      default:
        return null
    }
  }

  render() {
    const {searchValue} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="employ-container">
            {this.renderprofileviews()}
            <>
              <hr width="100%" />
              <h1 className="heading">Type of Employment</h1>
              <ul className="list-items">
                {employmentTypesList.map(each => (
                  <li className="list" key={each.label}>
                    <input
                      type="checkbox"
                      value={each.employmentTypeId}
                      className="check"
                      id={each.employmentTypeId}
                      onChange={this.employtype}
                    />
                    <label htmlFor={each.employmentTypeId} className="job-type">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </>
            <>
              <hr width="100%" />
              <h1 className="heading">Salary Range</h1>
              <ul className="list-items">
                {salaryRangesList.map(each => (
                  <li className="list" key={each.salaryRangeId}>
                    <input
                      type="radio"
                      name="radio"
                      className="check"
                      id={each.salaryRangeId}
                      value={each.salaryRangeId}
                      onChange={this.minimumPackage}
                    />
                    <label htmlFor={each.salaryRangeId} className="job-type">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </>
            <>
              <hr width="100%" />
              <h1 className="heading">Locations</h1>
              <ul className="list-items">
                {locationsList.map(each => (
                  <li className="list" key={each.label}>
                    <input
                      type="checkbox"
                      value={each.locationId}
                      className="check"
                      id={each.locationId}
                      onChange={this.selectlocation}
                    />
                    <label htmlFor={each.locationId} className="job-type">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </>
          </div>
          <div className="jobs-card-container">
            <div className="searchbar">
              <input
                onChange={this.updateSearch}
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchValue}
              />
              <button
                type="button"
                aria-label="Search"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.sorttheProducts}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderCardviews()}
          </div>
        </div>
      </>
    )
  }
}
export default JobCards
