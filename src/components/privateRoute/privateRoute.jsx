import React, { Component } from 'react'
import { connectToApp } from '../connectToApp/connectToApp'
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends Component {
    constructor(props) {
        super(props)
        this.component = connectToApp(props.component)
    }

    render() {
        const { userLoaded, personLoaded, person, user, companyOnly, personOnly } = this.props

        if (!userLoaded) {
            return null
        }

        if (user) {
            if (companyOnly || personOnly) {
                if (!personLoaded) {
                    return null
                }

                if (companyOnly) {
                    if (!person.isCompany) {
                        this.component = getRedirectComponent('/')
                    }
                } else if (personOnly) {
                    if (person.isCompany) {
                        this.component = getRedirectComponent('/')
                    }
                }
            }
        } else {
            this.component = getRedirectComponent('/acesso')
        }

        return <Route {...this.props} component={this.component} />
    }
}

export default connectToApp(PrivateRoute)

function getRedirectComponent(to) {
    return () => <Redirect to={to} />
}
