import React, { Component } from 'react'
import './stories.scss'
import Story from '../../../components/story/story'

class Stories extends Component {
    state = {
        stories: [
            {
                logo: 'https://via.placeholder.com/100x180',
                title: 'Com reconhecimento por todos',
                description: 'Com reconhecimento por todos os nossos clientes internos e também dos candidatos, reconheço que demos um grande passo evoluindo nosso processo graças a uma parceira bem sucedida entre a Kraft Heinz e Emp.',
                author: 'Carlos Roberto Vly',
                role: 'VP de RH, Performance & TI',
                id: 1
            },
            {
                logo: 'https://via.placeholder.com/140x150',
                title: 'Com reconhecimento por todos',
                description: 'Com reconhecimento por todos os nossos clientes internos e também dos candidatos, reconheço que demos um grande passo evoluindo nosso processo graças a uma parceira bem sucedida entre a Kraft Heinz e Emp.',
                author: 'Carlos Roberto Vly',
                role: 'VP de RH, Performance & TI',
                id: 2
            },
            {
                logo: 'https://via.placeholder.com/130x150',
                title: 'Com reconhecimento por todos',
                description: 'Com reconhecimento por todos os nossos clientes internos e também dos candidatos, reconheço que demos um grande passo evoluindo nosso processo graças a uma parceira bem sucedida entre a Kraft Heinz e Emp.',
                author: 'Carlos Roberto Vly',
                role: 'VP de RH, Performance & TI',
                id: 3
            }
        ]
    }

    render() {
        return (
            <div className='stories'>
                <div className='stories-box'>
                    {this.state.stories.map(stories => {
                        return <Story key={stories.id} {...stories} />
                    })}
                </div>
                <button type='button' className='btn btn-primary btn-lg'>Veja mais histórias de sucesso</button>
            </div>
        )
    }
}

export default Stories