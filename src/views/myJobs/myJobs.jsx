import './myJobs.scss'

import React, { Component } from 'react'

import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Form } from '../../utils/Form'
import Input from '../../components/input/input'
import { firebaseDb, COLLECTIONS } from '../../config/firebase';

class MyJobs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myJobs: []
        }

        firebaseDb.collection(COLLECTIONS.JOBS)
            .get()
            .then(data => {
                this.setState({ myJobs: data.docs.map(myJob => myJob.data()) })
            })
        
    }

    render() {
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
                            return <Opportunity key={opportunity.id} {...opportunity} />
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