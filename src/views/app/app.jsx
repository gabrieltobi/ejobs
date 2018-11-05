import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import firebase from 'firebase'
import Loading from '../../components/loading/loading'
import { COLLECTIONS, firebaseDb } from '../../config/firebase'

const Context = React.createContext()

export class AppProvider extends Component {
    state = {
        loading: false,
        user: null,
        person: null,
        userLoaded: false
    }

    componentWillMount() {
        this.setLoading(true)

        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user, userLoaded: true })
            this.setLoading()

            if (user) {
                firebaseDb.doc(`${COLLECTIONS.PEOPLE}/${user.uid}`)
                    .get()
                    .then(doc => {
                        if (doc.exists) {
                            this.setState({ person: doc.data() })
                        }
                    })
            }
        });
    }

    setLoading = (loading) => {
        this.setState({ loading })
        document.body.style.overflow = (loading ? 'hidden' : '')
    }

    render() {
        const { children } = this.props
        const { loading, ...state } = this.state

        return (
            <Context.Provider value={{
                ...state,
                setLoading: this.setLoading
            }}>
                {children}

                <ToastContainer />
                <Loading loading={loading} />
            </Context.Provider>
        )
    }
}

export const AppConsumer = Context.Consumer