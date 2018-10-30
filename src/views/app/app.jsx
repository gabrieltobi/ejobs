import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import Loading from '../../components/loading/loading'

const Context = React.createContext()

export class AppProvider extends Component {
    state = {
        loading: false,
        setLoading: this.setLoading
    }

    setLoading = (loading) => {
        this.setState({ loading })
    }

    render() {
        const { children } = this.props

        const {
            loading
        } = this.state

        return (
            <Context.Provider value={this.state}>
                {children}

                <ToastContainer />
                <Loading loading={loading} />
            </Context.Provider>
        )
    }
}

export const AppConsumer = Context.Consumer