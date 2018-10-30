import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './master.scss'

import Home from './views/home/home'
import SignIn from './views/signin/signin'
import SignUp from './views/signup/signup'
import Jobs from './views/jobs/jobs'
import CompanyJobs from './views/companyJobs/companyJobs'
import Master from './views/master/master'
import Resume from './views/resume/resume'
import { publicRoute } from './components/publicRoute/publicRoute'
import { AppProvider } from './views/app/app'

class Root extends Component {
    render() {
        return (
            <Router>
                <AppProvider>
                    <Route path="/acesso" component={SignIn} />
                    <Route path="/cadastro/:mode(candidato|empresa)" component={publicRoute(SignUp)} />

                    <Route exact path='/' component={Home} />
                    <Route path="/jobs" component={Jobs} />
                    <Route path="/companyJobs" component={CompanyJobs} />
                    <Route path="/curriculo" component={Resume} />
                </AppProvider>
            </Router>
        )
    }
}

export default Root