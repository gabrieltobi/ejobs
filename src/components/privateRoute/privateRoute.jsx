import React, { Component } from 'react'
import { connectToApp } from '../connectToApp/connectToApp'
import { Redirect, Route, withRouter } from 'react-router-dom'

class PrivateRoute extends Component {
    constructor(props) {
        super(props)
        this.component = withRouter(connectToApp(props.component))
    }

    render() {
        const { userLoaded, personLoaded, person, user, companyOnly, personOnly, path, exact } = this.props

        return <Route path={path} exact={exact} render={() => {
            if (!userLoaded) {
                return null
            }

            if (user) {
                if (!personLoaded) {
                    return null
                }

                if (companyOnly || personOnly) {
                    if (companyOnly) {
                        if (!person.isCompany) {
                            return getRedirectComponent('/')
                        }
                    } else if (personOnly) {
                        if (person.isCompany) {
                            return getRedirectComponent('/')
                        }
                    }
                }
            } else {
                return getRedirectComponent('/acesso')
            }

            const Comp = this.component
            return <Comp />
        }} />
    }
}

export default connectToApp(PrivateRoute)

function getRedirectComponent(to) {
    return <Redirect to={to} />
}
