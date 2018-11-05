import React, { Component } from 'react'
import { connectToApp } from '../connectToApp/connectToApp'
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends Component {
    render() {
        const { userLoaded, user, component } = this.props

        if (!userLoaded) {
            return null
        }

        return <Route {...this.props} component={user ? component : RedirectComponent} />
    }
}

export default connectToApp(PrivateRoute)

const RedirectComponent = () => {
    return <Redirect to='/acesso' />
}