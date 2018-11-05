import './radio.scss'

import React, { Component } from 'react'

class Radio extends Component {
    render() {
        const {
            id,
            label,
            type,
            className,
            invalidFeedback,
            ...inputProps
        } = this.props

        return (
            <div className='form-check form-check-inline'>
                <input
                    id={id}
                    type={type || 'radio'}
                    className={`form-check-input${className ? ` ${className}` : ''}`}
                    {...inputProps} />
                <label className='form-check-label' htmlFor={id}>{label}</label>
            </div>
        )
    }
}

export default Radio