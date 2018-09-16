import React, { Component } from 'react'
import InputMask from 'react-input-mask'

import './input.scss'

class Input extends Component {
    render() {
        const {
            id,
            label,
            hint,
            ...inputProps
        } = this.props

        return (
            <div className='field'>
                <label htmlFor={id}>{label}</label>
                <InputMask id={id} {...inputProps} />
                {hint}
            </div>
        )
    }
}

export default Input