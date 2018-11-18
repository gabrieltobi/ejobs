import './myJobs.scss'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'
import { Form } from '../../utils/Form'
import firebase from 'firebase'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import { HIRING_TYPES } from '../../config/enums'
import { WORK_PLACE } from '../../config/enums'
import { OCUPPATION } from '../../config/enums'
import Select, { enumToOptions } from '../../components/select/select'
import { getDocWithId } from '../../utils/FirebaseUtils';

class MyJobs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myJobs: []
        }

        this.getMyJobs()
    }

    setFilters = (fire) => {
        const { values: { hiringType, place, sector } } = this.props

        if (hiringType) {
            fire = fire.where('hiringType', '==', hiringType)
        }
        if (place) {
            fire = fire.where('place', '==', place)
        }
        if (sector) {
            fire = fire.where('sector', '==', sector)
        }
    }

    getMyJobs = () => {
        const { person } = this.props

        let fire = firebaseDb.collection(COLLECTIONS.JOBS)
        this.setFilters(fire)
        this.setState({ myJobs: [] })

        if (!person.isCompany) {
            const jobs = person.jobs || {}

            Object.keys(jobs).map(job => {
                fire.doc(job)
                    .onSnapshot(doc => {
                        this.setState({
                            myJobs: [...this.state.myJobs, getDocWithId(doc)]
                        })
                    })
            })
        } else {
            fire = fire.where('company', '==', person.id)

            fire.onSnapshot(data => {
                this.setState({ myJobs: getDocsWithId(data) })
            })
        }
    }

    render() {
        const { person } = this.props

        return (
            <React.Fragment>
                <Nav />
                <div className='page-jobs p-3 pt-4'>
                    <div className='mb-4 d-flex justify-content-between'>
                        <h3>Vagas</h3>
                        {
                            person.isCompany &&
                            <Link to='/jobEdit' className='btn btn-primary'>Adicionar Vaga</Link>
                        }
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
                    <div onClick={this.getMyJobs} className='text-right mb-3'>
                        <button type='submit' className='btn btn-primary'>Pesquisar</button>
                    </div>

                    <div className='d-flex flex-wrap'>
                        {this.state.myJobs.map(opportunity => {
                            return <Opportunity key={opportunity.id} {...opportunity} applied={true} />
                        })}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const fields = ['hiringType', 'place', 'sector']

export default Form(MyJobs, fields)