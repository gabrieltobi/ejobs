import React, { Component } from 'react'
import { AppConsumer } from '../../views/app/app'

export function publicRoute(WrappedComponent, selectData) {
    return class extends Component {
        render() {
            console.log(WrappedComponent)
            return (
                <AppConsumer>
                    <WrappedComponent />
                </AppConsumer>
            )
        }
    }
}