import './myJobs.scss'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'
import { Form } from '../../utils/Form'
import firebase from 'firebase'
import { firebaseDb, COLLECTIONS } from '../../config/firebase';
import { HIRING_TYPES } from '../../config/enums'
import { WORK_PLACE } from '../../config/enums'
import { OCUPPATION } from '../../config/enums'
import Select, { enumToOptions } from '../../components/select/select';

class MyJobs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myJobs: []
        }

        this.getMyJobs();

    }

    getMyJobs = () => {

        firebase.auth().onAuthStateChanged(currentUser => {
            firebaseDb.collection(COLLECTIONS.PEOPLE)
                .doc(currentUser.uid)
                .onSnapshot(doc => {
                    if (doc.exists) {
                        const person = doc.data();
                        const jobs = person.jobs;
                        this.setState({
                            myJobs: []
                        });

                        console.log(this.props.person.isCompany)
                        let fire = firebaseDb.collection(COLLECTIONS.JOBS)

                        if (this.props.person.isCompany) {

                            if (this.props.values.jobType) {
                                fire = fire.where('hiringType', '==', this.props.values.jobType)
                            }
                            if (this.props.values.jobLocation) {
                                fire = fire.where('place', '==', this.props.values.jobLocation)
                            }
                            if (this.props.values.jobArea) {
                                fire = fire.where('sector', '==', this.props.values.jobArea)
                            }

                            fire = fire.where('company', '==', this.props.person.id)

                            fire.onSnapshot(data => {
                                    this.setState({
                                        myJobs: data.docs.map(job => {
                                            let job2 = job.data()
                                            job2.id = job.id
                                            return job2
                                        })
                                    })
                                })
                        }
                        else {
                            Object.keys(jobs || {}).map(job => {

                                if (this.props.values.jobType) {
                                    fire = fire.where('hiringType', '==', this.props.values.jobType)
                                }
                                if (this.props.values.jobLocation) {
                                    fire = fire.where('place', '==', this.props.values.jobLocation)
                                }
                                if (this.props.values.jobArea) {
                                    fire = fire.where('sector', '==', this.props.values.jobArea)
                                }
                                console.warn(fire)
                                fire.doc(job)
                                    .onSnapshot(data => {
                                        let job2 = data.data();
                                        job2.id = data.id;
                                        this.setState({
                                            myJobs: [
                                                ...this.state.myJobs,
                                                job2
                                            ]
                                        })
                                    })
                            })
                        }
                    }
                })
        })
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
                            <Link to='/jobEdit' className="btn btn-primary">Adicionar Vaga</Link>
                        }
                    </div>

                    <div className='filters d-flex'>
                        {/* O segundo parâmetro ('Tipo de vaga') é opcional */}
                        <Select
                            title='Escolha um tipo de vaga'
                            {...fields.jobType}
                            options={enumToOptions(HIRING_TYPES, 'Tipo de Vaga')}
                        />

                        <Select
                            title='Escolha um local de trabalho'
                            {...fields.jobLocation}
                            options={enumToOptions(WORK_PLACE, 'Local de Trabalho')}
                        />

                        <Select
                            title='Escolha uma área'
                            {...fields.jobArea}
                            options={enumToOptions(OCUPPATION, 'Área de Atuação')}
                        />
                    </div>
                    <div onClick={this.getMyJobs} className="text-right mb-3">
                        <button type='submit' className="btn btn-primary">Pesquisar</button>
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

const fields = [
    'jobType',
    'jobLocation',
    'jobArea'
]

export default Form(MyJobs, fields)