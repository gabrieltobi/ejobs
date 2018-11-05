import './myJobs.scss'

import React, { Component } from 'react'

import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Form } from '../../utils/Form'
import Input from '../../components/input/input'
import firebase from 'firebase'
import { firebaseDb, COLLECTIONS } from '../../config/firebase';

class MyJobs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myJobs: []
        }
        console.error(props)
        firebase.auth().onAuthStateChanged(currentUser => {
            firebaseDb.collection(COLLECTIONS.PEOPLE)
                .doc(currentUser.uid)
                .onSnapshot(doc => {
                    console.warn(doc);
                    if (doc.exists) {
                        console.log(doc.data())
                        const person = doc.data();
                        const jobs = person.jobs;
                        this.setState({
                            myJobs: []
                        });

                        Object.keys(jobs).map(job => {
                            firebaseDb.collection(COLLECTIONS.JOBS)
                                .doc(job)
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
                })
        })
    }

    render() {
        const { myJobs } = this.state
        console.log(myJobs) // <- O que o firebase retornou
        return (
            <React.Fragment>
                <Nav />
                <div className='page-jobs p-3 pt-4'>
                    <div className='mb-4'>
                        <h3>Vagas</h3>
                    </div>

                    <div className='filters'>
                        <Input
                            type='search'
                            placeholder='Procurar'
                            title='Digite um texto para busca'
                            icon={faSearch}
                            required
                            {...fields.searchText}
                        />
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
    'searchText',
    'jobType',
    'jobLocation',
    'jobArea'
]

export default Form(MyJobs, fields)