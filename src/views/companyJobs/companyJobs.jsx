import './companyJobs.scss'

import React, { Component } from 'react'

import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'
import Select from '../../components/select/select'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Form } from '../../utils/Form'
import Input from '../../components/input/input'

class CompanyJobs extends Component {
    state = {
        opportunities: [
            {
                image: 'https://via.placeholder.com/100x220',
                department: 'Vendas',
                role: 'Executivo Vendas',
                type: 'Efetivo',
                location: 'Caxias do Sul',
                isPerson: false,
                date: new Date(),
                id: 1
            },
            {
                image: 'https://via.placeholder.com/200x220',
                department: 'Vendas',
                role: 'Executivo Vendas',
                type: 'Efetivo',
                location: 'Caxias do Sul',
                isPerson: false,
                date: new Date(),
                id: 2
            },
            {
                image: 'https://via.placeholder.com/220x190',
                department: 'Vendas',
                role: 'Executivo Vendas',
                type: 'Efetivo',
                location: 'Caxias do Sul',
                isPerson: false,
                date: new Date(),
                id: 3
            }
        ]
    }

    render() {
        return (
            <React.Fragment>
                <Nav />
                <div className='page-jobs p-3 pt-4'>
                    <div className='mb-4'>
                        <h3>Vagas</h3>
                        <h6>Oportunidades disponibilizadas</h6>
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

                        <div className='d-flex'>
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
    'searchText',
    'jobType',
    'jobLocation',
    'jobArea'
]

export default Form(CompanyJobs, fields)