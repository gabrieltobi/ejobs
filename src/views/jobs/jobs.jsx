import React, { Component } from 'react'

import './jobs.scss'
import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'

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
                <Nav />
                <div className='jobs'>
                    <div className='view-header'>
                        <h3 className='title'>Oportunidades</h3>
                        <h6 className='subtitle'>Oportunidades disponíveis das empresas</h6>
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

export default Jobs