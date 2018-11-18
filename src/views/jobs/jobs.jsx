import './jobs.scss'

import React, { Component } from 'react'

import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'
import Select, { enumToOptions } from '../../components/select/select'
import { Form } from '../../utils/Form'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import { HIRING_TYPES, WORK_PLACE, OCUPPATION } from '../../config/enums'
import { getDocsWithId } from '../../utils/FirebaseUtils'

class Jobs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            jobs: []
        }

        this.jobsListener = null
        this.getJobs()
    }

    getJobs = () => {
        const { setLoading, values: { hiringType, place, sector } } = this.props

        let loading = true
        setLoading(true)

        let fire = firebaseDb.collection(COLLECTIONS.JOBS)

        if (hiringType) {
            fire = fire.where('hiringType', '==', hiringType)
        }
        if (place) {
            fire = fire.where('place', '==', place)
        }
        if (sector) {
            fire = fire.where('sector', '==', sector)
        }

        if (this.jobsListener) {
            this.jobsListener()
        }

        this.jobsListener = fire.onSnapshot(data => {
            if (loading) {
                loading = false
                setLoading()
            }

            this.setState({ jobs: getDocsWithId(data) })
        })
    }

    renderJob = (job) => {
        const { person } = this.props
        const jobs = person.jobs || {}

        return <Opportunity key={job.id} {...job} applied={jobs[job.id]} />
    }

    render() {
        const { jobs } = this.state
        const { fields } = this.props

        return (
            <React.Fragment>
                <Nav />
                <div className='page-opportunity p-3 pt-4'>
                    <div className='mb-4'>
                        <h3>Oportunidades</h3>
                        <h6>Oportunidades disponíveis das empresas</h6>
                    </div>

                    <div className='filters d-flex'>
                        <Select
                            title='Escolha um tipo de vaga'
                            {...fields.hiringType}
                            options={enumToOptions(HIRING_TYPES, 'Tipo de Vaga')}
                        />

                        <Select
                            title='Escolha um local de trabalho'
                            {...fields.place}
                            options={enumToOptions(WORK_PLACE, 'Local de Trabalho')}
                        />

                        <Select
                            title='Escolha uma área'
                            {...fields.sector}
                            options={enumToOptions(OCUPPATION, 'Área de Atuação')}
                        />
                    </div>

                    <div onClick={this.getJobs} className='text-right mb-3'>
                        <button type='submit' className='btn btn-primary'>Pesquisar</button>
                    </div>

                    <div className='d-flex flex-wrap'>
                        {jobs.map(this.renderJob)}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const fields = ['hiringType', 'place', 'sector']

export default Form(Jobs, fields)