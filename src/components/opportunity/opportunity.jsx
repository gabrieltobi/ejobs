import './opportunity.scss'

import React, { Component } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faMapMarker, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { unapplyToJob, applyToJob } from '../../utils/JobApplication'
import { connectToApp } from '../connectToApp/connectToApp'

class Opportunity extends Component {
    applyOrUnapply = (event) => {
        event.preventDefault()

        const { applied, id: jobId, user: { uid: personId } } = this.props
        if (applied) {
            return unapplyToJob(jobId, personId)
        }

        return applyToJob(jobId, personId)
    }

    render() {
        const {
            image,
            sector,
            role,
            type,
            place,
            applied,
            date,
            id
        } = this.props

        return (
            <Link to={`job/${id}`} className='opportunity card border mr-3 mb-3'>
                <div className='card-img' style={{ backgroundImage: `url(${image})` }}>
                    <h5 className='bg-dark text-white card-dpt py-2 px-2'>{sector}</h5>
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
                            {place}
                        </span>
                    </div>
                    {
                        date &&
                        <div className='card-text'>
                            <FontAwesomeIcon icon={faCalendarAlt} className='mr-1' />
                            {format(date, 'DD/MM/YYYY')}
                        </div>
                    }
                    <button onClick={this.applyOrUnapply} className={`btn mt-3 ${applied ? 'btn-danger' : 'btn-primary'}`}>
                        {applied ? 'Cancelar Inscrição' : 'Candidatar'}
                    </button>
                </div>
            </Link>
        )
    }
}

export default connectToApp(Opportunity)