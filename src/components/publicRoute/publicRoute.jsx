import React, { Component } from 'react'
import { AppConsumer } from '../../views/app/app'

export function publicRoute(WrappedComponent) {
    return class extends Component {
        static displayName = `PublicRoute(${getDisplayName(WrappedComponent)})`

        render() {
            return (
                <AppConsumer>
                    {(globalState) => {
                        return <WrappedComponent {...this.props} {...globalState} />
                    }}
                </AppConsumer>
            )
        }
    }
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}