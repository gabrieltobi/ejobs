import './story.scss'

import React, { Component } from 'react'

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
            <div className='story m-2'>
                <div className='logo mb-3'>
                    <img src={logo} alt='Logo da Empresa XDB' />
                </div>
                <h2>{title}</h2>
                <p className='description'>{description}</p>
                <h6 className='mb-1'>{author}</h6>
                <span><small>{role}</small></span>
            </div>
        )
    }
}

export default Story