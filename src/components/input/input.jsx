import './input.scss'

import React, { Component } from 'react'
import InputMask from 'react-input-mask'
import Checkbox from '../checkbox/checkbox'

class Input extends Component {
    render() {
        const {
            id,
            label,
            type,
            className,
            title,
            invalidFeedback,
            children,
            ...inputProps
        } = this.props

        if (type === 'checkbox') {
            return <Checkbox {...this.props} />
        }

        return (
            <div className='form-group'>
                <label htmlFor={id}>{label}</label>
                <InputMask
                    id={id}
                    type={type || 'text'}
                    className={`form-control${className ? ` ${className}` : ''}`}
                    title={title}
                    {...inputProps}
                />
                {
                    (invalidFeedback || title) &&
                    <div className='invalid-feedback'>
                        {invalidFeedback || title}
                    </div>
                }
                {children}
            </div>
        )
    }
}

export default Input;