import './job.scss'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Nav from '../../components/nav/nav'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import { HIRING_TYPES, WORK_PLACE, DISABILITY, OCUPPATION } from '../../config/enums'
import { getDocWithId } from '../../utils/FirebaseUtils'
import { unapplyToJob, applyToJob } from '../../utils/JobApplication'

import userNoPhoto from '../../images/user-no-photo.jpg'

class Job extends Component {
    state = {
        job: null,
        company: null,
        people: []
    }

    jobUnsubscriber = null
    companyUnsubscriber = null

    componentDidMount() {
        const { person, setLoading, match: { params: { id } } } = this.props

        if (id) {
            setLoading(true)
            this.jobUnsubscriber = firebaseDb
                .doc(`${COLLECTIONS.JOBS}/${id}`)
                .onSnapshot(doc => {
                    const job = getDocWithId(doc)
                    this.setState({ job })
                    setLoading()

                    this.companyUnsubscriber && this.companyUnsubscriber()
                    this.companyUnsubscriber = firebaseDb
                        .doc(`${COLLECTIONS.PEOPLE}/${job.company}`)
                        .onSnapshot(doc => this.setState({ company: getDocWithId(doc) }))

                    if (person.isCompany && (person.id === job.company)) {
                        Object.keys(job.people || {}).map(personId => {
                            firebaseDb
                                .doc(`${COLLECTIONS.PEOPLE}/${personId}`)
                                .get()
                                .then(doc => {
                                    const person = getDocWithId(doc)
                                    this.setState({
                                        people: [
                                            ...this.state.people, person
                                        ]
                                    })
                                })
                        })
                    }
                })
        }
    }

    componentWillUnmount() {
        this.jobUnsubscriber && this.jobUnsubscriber()
        this.companyUnsubscriber && this.companyUnsubscriber()
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

    renderCompany = () => {
        const { company } = this.state
        console.log(company)
        if (!company) {
            return false
        }

        return (
            <div className='mb-3'>
                <div className='bg-secondary d-flex align-items-center text-light' style={{ minHeight: 120 }}>
                    <div className='p-3'>
                        <img
                            style={{ width: 100, minWidth: 100, height: 100 }}
                            className='user-img rounded-circle'
                            src={company.photo || userNoPhoto}
                            alt='Imagem da Empresa'
                        />
                    </div>
                    <div className='p-3'>
                        <h3 className='mb-0'>{company.fantasyName}</h3>
                        <h4>{company.companyName}</h4>
                        <span>{company.aboutUs}</span>
                    </div>
                </div>
            </div>
        )
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

                <div className='page-job'>
                    <div className='p-3'>
                        {this.renderCompany()}

                        <div className='p-3 border rounded text-md-left text-sm-center mb-3'>
                            <div className='mb-4'>
                                <h3>{role}</h3>
                                <h5>{OCUPPATION[sector].name}</h5>
                            </div>

                            <div className='row mb-3'>
                                <div className='col col-md-4 col-sm-12 mb-2'>
                                    <h6 className='mb-0'>Tipo</h6>
                                    <span>{HIRING_TYPES[hiringType].name}</span>
                                </div>

                                <div className='col col-md-4 col-sm-12 mb-2'>
                                    <h6 className='mb-0'>Cidade</h6>
                                    <span>{WORK_PLACE[place].name}</span>
                                </div>

                                <div className='col col-md-4 col-sm-12 mb-2'>
                                    <h6 className='mb-0'>Tipo de Deficiência</h6>
                                    <span>{DISABILITY[disability].name}</span>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col col-sm-12 mb-2'>
                                    <h6 className='m-0'>Descrição da Vaga</h6>
                                    <span>{description}</span>
                                </div>

                                <div className='col col-sm-12 mb-2'>
                                    <h6 className='m-0'>Responsabilidades a Atribuições</h6>
                                    <span>{assignments}</span>
                                </div>

                                <div className='col col-sm-12 mb-2'>
                                    <h6 className='m-0'>Requisitos e Qualificações</h6>
                                    <span>{requirements}</span>
                                </div>

                                <div className='col col-sm-12'>
                                    <h6 className='m-0'>Informações Adicionais</h6>
                                    <span>{additional}</span>
                                </div>
                            </div>
                        </div>

                        {
                            !person.isCompany &&
                            <div className='text-right'>
                                <button onClick={this.applyOrUnapply} className={`btn ${applied ? 'btn-danger' : 'btn-primary'}`}>
                                    {applied ? 'Cancelar Inscrição' : 'Candidatar'}
                                </button>
                            </div>
                        }

                        {
                            person.isCompany &&
                            <div className='border rounded p-3'>
                                <h4 className='mb-3'>Candidatos</h4>

                                <div className="list-group">
                                    {people.map(person => (
                                        <Link
                                            to={`/curriculo/${person.id}`}
                                            className='list-group-item list-group-item-action'
                                            key={person.id}
                                        >
                                            {person.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Job