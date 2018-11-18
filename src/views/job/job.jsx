import './job.scss'

import React, { Component } from 'react'

import Nav from '../../components/nav/nav'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import { HIRING_TYPES, WORK_PLACE, DISABILITY } from '../../config/enums'
import { getDocWithId } from '../../utils/FirebaseUtils'
import { unapplyToJob, applyToJob } from '../../utils/JobApplication'

class Job extends Component {
    constructor(props) {
        super(props)

        this.state = {
            job: null,
            people: []
        }

        const id = props.match.params.id
        if (id) {
            props.setLoading(true)
            firebaseDb.collection(COLLECTIONS.JOBS)
                .doc(id)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        const job = doc.data()
                        this.setState({ job })

                        Object.keys(job.people || {}).map(personId => {
                            firebaseDb.collection(COLLECTIONS.PEOPLE)
                                .doc(personId)
                                .get()
                                .then(doc => {
                                    if (doc.exists) {
                                        const person = getDocWithId(doc)
                                        this.setState({ people: [...this.state.people, person] })
                                    }
                                })

                        })
                    }
                })
                .finally(() => props.setLoading())
        }
    }

    applyOrUnapply = () => {
        const { job: { id: jobId } } = this.state
        const { setLoading, person, user: { uid: personId } } = this.props

        const applied = (person.jobs || {})[jobId]
        setLoading(true)

        if (applied) {
            return unapplyToJob(jobId, personId)
                .finally(() => setLoading())
        }

        return applyToJob(jobId, personId)
            .finally(() => setLoading())
    }

    render() {
        const { person } = this.props
        const { job, people } = this.state

        if (!job) {
            return null
        }

        const { id, sector, role, hiringType, place, disability, description, assignments, requirements, additional } = job
        const applied = (person.jobs || {})[id]

        return (
            <React.Fragment>
                <Nav />
                <div className='page-job p-3 pt-4'>
                    <div className='mb-4'>
                        <h3>{sector}</h3>
                        <h5>{role}</h5>
                    </div>

                    <ul>
                        <li><b>Tipo:</b> {HIRING_TYPES[hiringType].name}</li>
                        <li><b>Cidade:</b> {WORK_PLACE[place].name}</li>
                        <li><b>Tipo de Deficiência:</b> {DISABILITY[disability].name}</li>
                    </ul>

                    <h6>Descrição da Vaga</h6>
                    <p>{description}</p>

                    <h6>Responsabilidades a Atribuições</h6>
                    <p>{assignments}</p>

                    <h6>Requisitos e Qualificações</h6>
                    <p>{requirements}</p>

                    <h6>Informações Adicionais</h6>
                    <p>{additional}</p>

                    {
                        !person.isCompany &&
                        <div className='text-right mb-3'>
                            <button onClick={this.applyOrUnapply} className={`btn ${applied ? 'btn-danger' : 'btn-primary'}`}>
                                {applied ? 'Cancelar Inscrição' : 'Candidatar'}
                            </button>
                        </div>
                    }

                    {
                        person.isCompany &&
                        <React.Fragment>
                            <h5 className='mt-4'>Candidatos</h5>
                            <ul>
                                {people.map(person => (
                                    <li key={person.id}>{person.name}</li>
                                ))}
                            </ul>
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Job