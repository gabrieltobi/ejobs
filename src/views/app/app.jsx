import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import firebase from 'firebase'
import Loading from '../../components/loading/loading'

const Context = React.createContext()

export class AppProvider extends Component {
    state = {
        loading: false,
        user: undefined
    }

    componentWillMount() {
        this.setLoading(true)

        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
            this.setLoading()
        });
    }

    setLoading = (loading) => {
        this.setState({ loading })
        document.body.style.overflow = (loading ? 'hidden' : '')
    }

    render() {
        const { children } = this.props

        const {
            loading
        } = this.state

        return (
            <Context.Provider value={{
                setLoading: this.setLoading,
                user: this.state.user
            }}>
                {children}

                <ToastContainer />
                <Loading loading={loading} />
            </Context.Provider>
        )
    }
}

export const AppConsumer = Context.Consumer