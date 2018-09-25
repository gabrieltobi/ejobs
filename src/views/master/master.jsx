import './master.scss'

import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'

class Master extends Component {
    render() {
        const {
            children
        } = this.props

        return (
            <div className='master'>
                {children}

                <ToastContainer />
            </div>
        )
    }
}

export default Master