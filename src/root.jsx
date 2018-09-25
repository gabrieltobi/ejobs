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
import Master from './views/master/master'

class Root extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />

                    <Master>
                        <Route exact path="/" component={Home} />
                        <Route path="/jobs" component={Jobs} />
                        <Route path="/companyJobs" component={CompanyJobs} />
                    </Master>
                </React.Fragment>
            </Router>
        )
    }
}

export default Root