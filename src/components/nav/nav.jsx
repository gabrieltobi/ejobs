import './nav.scss'

import React, { Component } from 'react'
import firebase from 'firebase'
import NavAnonymus from './navAnonymus/navAnonymus'
import NavUser from './navUser/navUser'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import NavLoading from './navLoading/navLoading'

class Nav extends Component {
    state = {
        currentUser: firebase.auth().currentUser,
        person: null,
        loading: true
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(currentUser => {
            this.setState({
                currentUser,
                loading: false
            })

            if (currentUser) {
                // Procuramos a pessoa associada
                firebaseDb.doc(`${COLLECTIONS.PEOPLE}/${currentUser.uid}`)
                    .get()
                    .then(doc => {
                        if (doc.exists) {
                            this.setState({ person: doc.data() })
                        }
                    })
            }
        })
    }

    render() {
        const {
            loading,
            currentUser,
            person
        } = this.state

        if (loading) {
            return <NavLoading />
        }

        if (currentUser) {
            return <NavUser person={person} />
        }

        return <NavAnonymus />
    }
}

export default Nav