//import './select.scss'

import React, { Component } from 'react'

class Select extends Component {
    render() {
        const {
            id,
            label,
            options,
            className,
            title,
            invalidFeedback,
            children,
            ...selectProps
        } = this.props

        return (
            <div className='form-group w-100'>
                <label htmlFor={id}>{label}</label>
                <select
                    id={id}
                    className={`form-control${className ? ` ${className}` : ''}`}
                    title={title}
                    {...selectProps}
                >
                    {options}
                </select>
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

export default Select

export const enumToOptions = (enumeration, empty) => {
    const renderOption = (key) => {
        const option = enumeration[key]

        return (
            <option key={option.value} value={option.value}>
                {option.name}
            </option>
        )
    }

    return (
        <React.Fragment>
            {
                empty &&
                <option value=''>{empty}</option>
            }
            {Object.keys(enumeration).map(renderOption)}
        </React.Fragment>
    )
}