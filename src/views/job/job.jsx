import './job.scss'

import React, { Component } from 'react'

import Nav from '../../components/nav/nav'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import { HIRING_TYPES, WORK_PLACE, DISABILITY } from '../../config/enums'
import { getWithId } from '../../utils/FirebaseUtils';

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
                                        const person = getWithId(doc)
                                        this.setState({ people: [...this.state.people, person] })
                                    }
                                })

                        })
                    }
                })
                .finally(() => props.setLoading())
        }
    }

    render() {
        const { person } = this.props
        const { job, people } = this.state

        if (!job) {
            return null
        }

        const { sector, role, hiringType, place, disability, description, assignments, requirements, additional } = job

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
                        <div className="text-right mb-3">
                            <button type='submit' className="btn btn-primary">Candidatar-se</button>
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