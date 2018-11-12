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


    runFor = (event) => {
        event.preventDefault()

        const { applied } = this.props;

        if (applied) {
            this.unapply();
        }
        else {
            this.apply();
        }
    }

    apply = () => {
        const jobId = this.props.id
        const personId = this.props.user.uid

        const addInPerson = firebaseDb.collection(COLLECTIONS.PEOPLE)
            .doc(personId)
            .set({
                jobs: {
                    [jobId]: true
                }
            }, { merge: true })

        const addInJob = firebaseDb.collection(COLLECTIONS.JOBS)
            .doc(jobId)
            .set({
                people: {
                    [personId]: true
                }
            }, { merge: true })

        Promise.all(addInPerson, addInJob)
            .then(() => toast.success('Candidatura realizada com sucesso!'))
    }

    unapply = () => {
        const jobId = this.props.id
        const personId = this.props.user.uid

        const removeFromPerson = firebaseDb.collection(COLLECTIONS.PEOPLE)
            .doc(personId)
            .get()
            .then((data) => {
                let person = data.data();
                const { [jobId]: removedId, ...jobs } = person.jobs
                person.jobs = jobs

                return firebaseDb.collection(COLLECTIONS.PEOPLE)
                    .doc(personId)
                    .set(person)
            })

        const removeFromJob = firebaseDb.collection(COLLECTIONS.JOBS)
            .doc(personId)
            .get()
            .then((data) => {
                let job = data.data();
                const { [personId]: removedId, ...people } = job.people
                job.people = people

                return firebaseDb.collection(COLLECTIONS.JOBS)
                    .doc(jobId)
                    .set(job)
            })

        Promise.all(removeFromPerson, removeFromJob)
            .then(() => {
                toast.success('Candidatura removida com sucesso!')
            })
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
                    <button onClick={this.runFor} className={`btn mt-3 ${applied ? 'btn-danger' : 'btn-primary'}`}>
                        {applied ? 'Cancelar Inscrição' : 'Candidatar'}
                    </button>
                </div>
            </Link>
        )
    }
}

export default Opportunity