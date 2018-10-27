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
            jobs: [],
            opportunities: [
                {
                    image: 'https://via.placeholder.com/100x220',
                    department: 'Vendas',
                    role: 'Executivo Vendas',
                    type: 'Efetivo',
                    location: 'Caxias do Sul',
                    isPerson: false,
                    id: 1
                },
                {
                    image: 'https://via.placeholder.com/200x220',
                    department: 'Vendas',
                    role: 'Executivo Vendas',
                    type: 'Efetivo',
                    location: 'Caxias do Sul',
                    isPerson: false,
                    id: 2
                },
                {
                    image: 'https://via.placeholder.com/100x180',
                    department: 'Vendas',
                    role: 'Executivo Vendas',
                    type: 'Efetivo',
                    location: 'Caxias do Sul',
                    isPerson: true,
                    id: 3
                },
                {
                    image: 'https://via.placeholder.com/220x190',
                    department: 'Vendas',
                    role: 'Executivo Vendas',
                    type: 'Efetivo',
                    location: 'Caxias do Sul',
                    isPerson: false,
                    id: 4
                }
            ]
        }

        firebaseDb.collection(COLLECTIONS.JOBS)
            .get()
            .then(data => {
                this.setState({ jobs: data.docs.map(job => job.data()) })
            })
    }

    render() {
        const { jobs } = this.state
        console.log(jobs) // <- O que o firebase retornou

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
                            options={enumToOptions(OCUPPATION, 'Local de Trabalho')}
                        />
                    </div>

                    <div className='d-flex flex-wrap'>
                        {this.state.opportunities.map(opportunity => {
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