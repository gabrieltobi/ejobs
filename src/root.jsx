import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './home/home'
import Oportunidades from './oportunidades/oportunidades'

class Root extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact path="/" component={Home} />
                    <Route path="/jao" component={Oportunidades} />
                </React.Fragment>
            </Router>
        )
    }
}

export default Root