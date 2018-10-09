import './opportunity.scss'

import React, { Component } from 'react'
import { format } from 'date-fns'

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
            <div className='opportunity card border mr-3 mb-3'>
                <div className='card-img' style={{ backgroundImage: `url(${image})` }}>
                    <h5 className='bg-dark text-white card-dpt py-2 px-2'>{department}</h5>
                </div>
                <div className='card-body'>
                    <div className='card-text'>{role}</div>
                    <div className='card-text'>
                        <span className='mr-3'>
                            <FontAwesomeIcon icon={faTag} className='mr-1' />
                            {type}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faMapMarker} className='mr-1' />
                            {location}
                        </span>
                    </div>
                    {
                        date &&
                        <div className='card-text'>
                            <FontAwesomeIcon icon={faCalendarAlt} className='mr-1' />
                            {format(date, 'DD/MM/YYYY')}
                        </div>
                    }
                    <a href={isPerson ? '/jobs' : '/companyJobs'} className='btn btn-primary mt-3'>
                        {isPerson ? 'Contatar' : 'Candidatar'}
                    </a>
                </div>
            </div>
        )
    }
}

export default Opportunity