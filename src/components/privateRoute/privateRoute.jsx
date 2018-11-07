import React, { Component } from 'react'
import { connectToApp } from '../connectToApp/connectToApp'
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends Component {
    constructor(props) {
        super(props)
        this.component = connectToApp(props.component)
    }

    render() {
        const { userLoaded, user } = this.props

        if (!userLoaded) {
            return null
        }

        return <Route {...this.props} component={user ? this.component : RedirectComponent} />
    }
}

export default connectToApp(PrivateRoute)

const RedirectComponent = () => {
    return <Redirect to='/acesso' />
}