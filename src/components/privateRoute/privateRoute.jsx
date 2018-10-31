import React, { Component } from 'react'
import firebase from 'firebase'
import { AppConsumer } from '../../views/app/app'

export function privateRoute(WrappedComponent) {
    return class extends Component {
        static displayName = `PublicRoute(${getDisplayName(WrappedComponent)})`

        componentDidMount() {
            firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    this.props.history.push('/acesso')
                }
            })
        }

        render() {
            return (
                <AppConsumer>
                    {(globalState) => {
                        const { user } = globalState
                        return user ? <WrappedComponent {...this.props} {...globalState} /> : null
                    }}
                </AppConsumer>
            )
        }
    }
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}