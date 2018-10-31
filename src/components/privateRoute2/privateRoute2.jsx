import React, { Component } from 'react'
import { AppConsumer } from '../../views/app/app'

export function privateRoute(WrappedComponent) {
    return class extends Component {
        static displayName = `PublicRoute(${getDisplayName(WrappedComponent)})`;

        componentWillMount = () => {
            console.log('123')
        }

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
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}