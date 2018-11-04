import './opportunity.scss'

import React, { Component } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faMapMarker, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { COLLECTIONS, firebaseDb } from '../../config/firebase';
import firebase from 'firebase'
import { toast } from 'react-toastify';

class Opportunity extends Component {


    runFor = () => {
        
        firebaseDb.collection(COLLECTIONS.JOBS_PEOPLE)
            .doc(firebase.auth().currentUser.uid)
            .set({job: this.props.id}, { merge: true })
            .then(() => {
                toast.success('Candidatura realizada com sucesso!')
            })
      }

    render() {
        const {
            image,
            sector,
            role,
            type,
            place,
            isPerson,
            date
        } = this.props
        console.log(this)

        return (
            <div className='opportunity card border mr-3 mb-3'>
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
                    <button onClick={this.runFor} className='btn btn-primary mt-3'>
                        {isPerson ? 'Contatar' : 'Candidatar'}
                    </button>
                </div>
            </div>
        )
    }
}

export default Opportunity