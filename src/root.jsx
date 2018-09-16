import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './master.scss'

import Home from './views/home/home'
import Login from './views/login/login'
import SignUp from './views/signup/signup'
import Jobs from './views/jobs/jobs'
import CompanyJobs from './views/companyJobs/companyJobs'

class Root extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/jobs" component={Jobs} />
                    <Route path="/companyJobs" component={CompanyJobs} />
                </React.Fragment>
            </Router>
        )
    }
}

export default Root