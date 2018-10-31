import React, { Component } from 'react'
import firebase from 'firebase'
import { AppConsumer } from '../../views/app/app'
import { publicRoute } from '../publicRoute/publicRoute';

export function privateRoute(WrappedComponent) {
    return class extends Component {
        state = {
            user: undefined
        }

        componentDidMount() {
            firebase.auth().onAuthStateChanged(user => {
                this.setState(user)

                if (!user) {
                    this.props.history.push('/acesso')
                }
            })
        }

        render() {
            const { user } = this.state

            return (
                user ? publicRoute(WrappedComponent) : null
            )
        }
    }
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}