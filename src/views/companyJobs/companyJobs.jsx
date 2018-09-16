import React, { Component } from 'react'

import './companyJobs.scss'

import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
                <div className='jobs'>
                    <div className='view-header'>
                        <h3 className='title'>Vagas</h3>
                        <h6 className='subtitle'>Oportunidades disponibilizadas</h6>
                    </div>

                    <div className='filters'>
                        <div className='field field-icon'>
                            <FontAwesomeIcon icon={faSearch} />
                            <input type='search' placeholder='Procurar' />
                        </div>
                    </div>

                    <div className='filters'>
                        <div className='field'>
                            <select>
                                <option value=''>Tipo de vaga</option>
                            </select>
                        </div>
                        <div className='field'>
                            <select>
                                <option value=''>Local de trabalho</option>
                            </select>
                        </div>
                        <div className='field'>
                            <select>
                                <option value=''>Área</option>
                            </select>
                        </div>
                    </div>

                    <div className='jobs-box'>
                        {this.state.opportunities.map(opportunity => {
                            return <Opportunity key={opportunity.id} {...opportunity} />
                        })}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CompanyJobs