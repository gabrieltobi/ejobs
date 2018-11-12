import './jobs.scss'

import React, { Component } from 'react'

import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'
import Select, { enumToOptions } from '../../components/select/select'
import { Form } from '../../utils/Form'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import { HIRING_TYPES } from '../../config/enums'
import { WORK_PLACE } from '../../config/enums'
import { OCUPPATION } from '../../config/enums'

class Jobs extends Component {
    constructor(props) {
        super(props)

        /* Em opportunities está mockado, é o que está na tela */
        /* Em jobs é o que é buscado do firebase logo abaixo */
        this.state = {
            jobs: []
        }

        this.getJobs();
    }

    getJobs = () => {
        let fire = firebaseDb.collection(COLLECTIONS.JOBS)

       // console.error(this.props.values.jobType);
       // console.error(this.props.values.jobLocation);
       // console.error(this.props.values.jobArea);

        if (this.props.values.jobType){
            fire = fire.where('hiringType','==',this.props.values.jobType)
        }
        if (this.props.values.jobLocation){
            fire = fire.where('place','==',this.props.values.jobLocation)
        }
        if (this.props.values.jobArea){
            fire = fire.where('role','==',this.props.values.jobArea)
        }
            fire.get()
            .then(data => {
                console.log(data)
                this.setState({ jobs: data.docs.map(job => {
                    let job2 = job.data()
                    job2.id = job.id
                    //console.log(job)
                    return job2
                }) 
            })
        })
    }

    render() {
        const { jobs } = this.state
        const { fields } = this.props
        //console.log(jobs) // <- O que o firebase retornou

        return (
            <React.Fragment>
                <Nav />
                <div className='page-opportunity p-3 pt-4'>
                    <div className='mb-4'>
                        <h3>Oportunidades</h3>
                        <h6>Oportunidades disponíveis das empresas</h6>
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
                            options={enumToOptions(OCUPPATION, 'Área de')}
                        />
                    </div>
                        <div onClick={this.getJobs} className="text-right mb-3">
                            <button type='submit' className="btn btn-primary">Pesquisar</button>
                        </div>

                    <div className='d-flex flex-wrap'>
                        {this.state.jobs.map(opportunity => {
                            return <Opportunity key={opportunity.id} {...opportunity} />
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

export default Form(Jobs, fields)