import React, { Component } from 'react'

import './jobs.scss'
import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'
import Select from '../../components/select/select';
import { Form } from '../../utils/Form';

class Jobs extends Component {
    state = {
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

    render() {
        return (
            <React.Fragment>
                <div className='page-opportunity p-3 pt-4'>
                    <div className='mb-4'>
                        <h3>Oportunidades</h3>
                        <h6>Oportunidades disponíveis das empresas</h6>
                    </div>

                    <div className='filters d-flex'>
                        <Select
                            title='Escolha um tipo de vaga'
                            {...fields.jobType}
                            options={(
                                <option value=''>Tipo de vaga</option>
                            )}
                        />

                        <Select
                            title='Escolha um local de trabalho'
                            {...fields.jobLocation}
                            options={(
                                <option value=''>Local de trabalho</option>
                            )}
                        />

                        <Select
                            title='Escolha uma área'
                            {...fields.jobArea}
                            options={(
                                <option value=''>Área</option>
                            )}
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