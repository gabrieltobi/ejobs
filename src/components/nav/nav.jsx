import './nav.scss'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'

import NavAnonymus from './navAnonymus/navAnonymus'
import NavUser from './navUser/navUser'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'

import logo from '../../images/logo.png'

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
            currentUser,
            person,
            loading
        } = this.state

        let nav = <NavAnonymus />

        if (currentUser) {
            nav = <NavUser person={person} />
        }

        return (
            <nav className='pcd-nav border-bottom p-2 shadow-sm d-flex align-items-center'>
                <Link to='/' className='logo'>
                    <img src={logo} alt='Logo do PCD Jobs' />
                </Link>

                {!loading && nav}
            </nav>
        )
    }
}

export default Nav