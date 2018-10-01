import React, { Component } from 'react'
import { format } from 'date-fns'

import './opportunity.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faMapMarker, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

class Opportunity extends Component {
    render() {
        const {
            image,
            department,
            role,
            type,
            location,
            isPerson,
            date
        } = this.props

        return (
            <div className='opportunity card border'>
                <img className='card-img-top' src={image} />
                <div className='card-body'>
                    <div className="card-text">{role}</div>
                    <p className='card-text'>
                        <span className='mr-3'>
                            <FontAwesomeIcon icon={faTag} className='mr-1' />
                            {type}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faMapMarker} className='mr-1' />
                            {location}
                        </span>
                    </p>
                    <a href={isPerson ? '/jobs' : '/companyJobs'} className='btn btn-primary'>
                        {isPerson ? 'Contatar' : 'Candidatar'}
                    </a>
                </div>
            </div>
        )

        return (
            <div className='opportunity'>
                <div className='image' style={{ backgroundImage: `url(${image})` }}>
                    <h5 className='departament'>{department}</h5>
                </div>
                <div className='data'>
                    <div>{role}</div>
                    <div>
                        <span className='info'>
                            <FontAwesomeIcon icon={faTag} />
                            {type}
                        </span>
                        <span className='info'>
                            <FontAwesomeIcon icon={faMapMarker} />
                            {location}
                        </span>
                    </div>
                    {
                        date &&
                        <div className='info'>
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            {format(date, 'DD/MM/YYYY')}
                        </div>
                    }
                </div>
                <div className='actions'>
                    <a href={isPerson ? '/jobs' : '/companyJobs'}>
                        <button type='button' className='btn btn-primary'>
                            {isPerson ? 'Contatar' : 'Candidatar'}
                        </button>
                    </a>
                </div>
            </div>
        )
    }
}

export default Opportunity