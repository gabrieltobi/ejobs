import './master.scss'

import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import Nav from '../../components/nav/nav'

class Master extends Component {
    render() {
        const {
            children
        } = this.props

        return (
            <div className='master'>
                <Nav />

                {children}

                <ToastContainer />
            </div>
        )
    }
}

export default Master