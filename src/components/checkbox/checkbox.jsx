import './checkbox.scss'

import React, { Component } from 'react'

class Checkbox extends Component {
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

        return (
            <div className='form-group'>
                <div className='form-check'>
                    <input
                        id={id}
                        type={type || 'text'}
                        className={`form-check-input${className ? ` ${className}` : ''}`}
                        title={title}
                        {...inputProps}
                    />
                    <label className='form-check-label' htmlFor={id}>
                        {label}
                    </label>
                    {
                        (invalidFeedback || title) &&
                        <div className='invalid-feedback'>
                            {invalidFeedback || title}
                        </div>
                    }
                    {children}
                </div>
            </div>
        )
    }
}

export default Checkbox