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
        person: {},
        userLoaded: false,
        personLoaded: false
    }

    unsubscribeList = []
    loadingCounter = 0

    componentDidMount() {
        this.setLoading(true)

        const authUnsubscriber = firebase.auth().onAuthStateChanged(user => {
            this.setState({ user, userLoaded: true })
            this.setLoading()

            if (user) {
                const personUnsubscriber = firebaseDb
                    .doc(`${COLLECTIONS.PEOPLE}/${user.uid}`)
                    .onSnapshot(doc => {
                        let person = {}

                        if (doc.exists) {
                            person = {
                                ...doc.data(),
                                id: user.uid
                            }
                        }

                        this.setState({ person: person, personLoaded: true })
                    })
                this.unsubscribeList.push(personUnsubscriber)
            }
        });
        this.unsubscribeList.push(authUnsubscriber)
    }

    componentWillUnmount() {
        this.unsubscribeList.map(unsubscriber => unsubscriber())
    }

    setLoading = (loading) => {
        if (loading) {
            this.loadingCounter++
        } else if (this.loadingCounter > 0) {
            this.loadingCounter--
        }

        this.setState({ loading: !!this.loadingCounter })
        document.body.style.overflow = (this.loadingCounter ? 'hidden' : '')
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