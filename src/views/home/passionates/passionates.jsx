import React, { Component } from 'react'
import './passionates.scss'

class Passionates extends Component {
    state = {
        passionates: [
            { image: 'https://via.placeholder.com/40x50', alt: 'Passionate 1', id: 1 },
            { image: 'https://via.placeholder.com/50x50', alt: 'Passionate 2', id: 2 },
            { image: 'https://via.placeholder.com/50x30', alt: 'Passionate 3', id: 3 },
            { image: 'https://via.placeholder.com/40x50', alt: 'Passionate 4', id: 4 },
            { image: 'https://via.placeholder.com/50x50', alt: 'Passionate 5', id: 5 },
            { image: 'https://via.placeholder.com/50x30', alt: 'Passionate 6', id: 6 }
        ]
    }

    renderPassionate = (passionate) => {
        return (
            <div key={passionate.id} className='passionate'>
                <img src={passionate.image} alt={passionate.alt} />
            </div>
        )
    }

    render() {
        return (
            <div className='passionates'>
                <h5 className='title'>Apaixonados</h5>

                <div className='box'>
                    {this.state.passionates.map(this.renderPassionate)}
                </div>
            </div>
        )
    }
}

export default Passionates