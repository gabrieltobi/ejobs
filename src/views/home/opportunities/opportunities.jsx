import React, { Component } from 'react'
import './opportunities.scss'
import Opportunity from '../../../components/opportunity/opportunity'

class Opportunities extends Component {
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
            <div className='opportunities'>
                {this.state.opportunities.map(opportunity => {
                    return <Opportunity key={opportunity.id} {...opportunity} />
                })}
            </div>
        )
    }
}

export default Opportunities