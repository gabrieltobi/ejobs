import React, { Component } from 'react'

//import './input.scss'

class Input extends Component {
    render() {
        const {
            id,
            label,
            type,
            hint
        } = this.props

        return (
            <div className='field'>
                <label htmlFor={id}>{label}</label>
                <input id={id} type={type} />
                {hint}
            </div>
        )
    }
}

export default Input