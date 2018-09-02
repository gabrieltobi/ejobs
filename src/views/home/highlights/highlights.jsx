import React, { Component } from 'react'
import flavio_carvalho from '../../../images/flavio_carvalho.jpg'
import './highlights.scss'

class Highlights extends Component {
    render() {
        return (
            <div className="highlights">
                <div className='highlight' style={{ backgroundImage: `url(${flavio_carvalho})` }}>
                    <div className='banner'>
                        <blockquote className='box' cite='Júlio Castro'>
                            <h2 className='text'>
                                Consegui encontrar e empresa rapidamente após o meu cadastro
                            </h2>
                            <span className='subtext'>
                                Júlio Castro
                            </span>
                        </blockquote>
                    </div>
                </div>
            </div>
        )
    }
}

export default Highlights