import React, { Component } from 'react'

//import './select.scss'

class Select extends Component {
    render() {
        const {
            id,
            label,
            options,
            hint
        } = this.props

        return (
            <div className='field'>
                <label htmlFor={id}>{label}</label>
                <select id={id}>
                    {options}
                </select>
                {hint}
            </div>
        )
    }
}

export default Select