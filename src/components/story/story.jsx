import React, { Component } from 'react'
import './story.scss'

class Story extends Component {
    render() {
        const {
            logo,
            title,
            description,
            author,
            role
        } = this.props

        return (
            <div className='story'>
                <div className='logo'>
                    <img src={logo} alt='Logo da Empresa XDB' />
                </div>
                <h2 className='title'>{title}</h2>
                <p className='description'>{description}</p>
                <h6 className='author'>{author}</h6>
                <span className='role'>{role}</span>
            </div>
        )
    }
}

export default Story