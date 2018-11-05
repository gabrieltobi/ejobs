import './input.scss'

import React, { Component } from 'react'
import InputMask from 'react-input-mask'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Checkbox from '../checkbox/checkbox'
import Radio from '../radio/radio'


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
            icon,
            ...inputProps
        } = this.props

        if (type === 'checkbox') {
            return <Checkbox {...this.props} />
        } else if (type === 'radio') {
            return <Radio {...this.props} />
        }

        return (
            <div className='form-group'>
                <label htmlFor={id}>{label}</label>
                <div className='input-group'>
                    {
                        icon &&
                        <div className="input-group-prepend">
                            <span className='input-group-text'>
                                <FontAwesomeIcon icon={icon} />
                            </span>
                        </div>
                    }
                    <InputMask
                        id={id}
                        type={type || 'text'}
                        className={`form-control${className ? ` ${className}` : ''}`}
                        title={title}
                        {...inputProps}
                    />
                </div>
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

export default Input