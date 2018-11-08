import './textarea.scss'

import React, { Component } from 'react'

class Textarea extends Component {
    render() {
        const {
            id,
            label,
            className,
            invalidFeedback,
            ...inputProps
        } = this.props

        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <textarea
                    id={id}
                    className={`form-control${className ? ` ${className}` : ''}`}
                    {...inputProps} />
            </div>
        )
    }
}

export default Textarea