import React, { Component } from 'react'
import './opportunities.scss'
import Opportunity from '../../../components/opportunity/opportunity'
import { firebaseDb, COLLECTIONS } from '../../../config/firebase';
import { faDirections } from '@fortawesome/free-solid-svg-icons';

class Opportunities extends Component {
    constructor(props) {
        super(props)

        this.state = {
            opportunities: []
        }

        firebaseDb.collection(COLLECTIONS.JOBS)
            .orderBy("creationDate").limit(4)
            .get()
            .then(data => {
                //Sconsole.log(data)
                this.setState({
                    opportunities: data.docs.map(job => {
                        let job2 = job.data()
                        job2.id = job.id
                        return job2
                    })
                })
            })
    }

    render() {
        return (
            <div className='p-3 d-flex flex-wrap'>
                {this.state.opportunities.map(opportunity => {
                    return <Opportunity key={opportunity.id} {...opportunity} />
                })}
            </div>
        )
    }
}

export default Opportunities