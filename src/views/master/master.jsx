import './master.scss'

import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import Loading from '../../components/loading/loading'

class Master extends Component {
    render() {
        const {
            children
        } = this.props

        return (
            <div className='master'>
                {children}

                <ToastContainer />
                <Loading />
            </div>
        )
    }
}

export default Master