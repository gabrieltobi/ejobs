import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './master.scss'

import Home from './views/home/home'
import SignIn from './views/signin/signin'
import SignUp from './views/signup/signup'
import Jobs from './views/jobs/jobs'
import MyJobs from './views/myJobs/myJobs'
import Master from './views/master/master'
import Resume from './views/resume/resume'

class Root extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route path="/acesso" component={SignIn} />
                    <Route path="/cadastro/:mode(candidato|empresa)" component={SignUp} />

                    <Master>
                        <Route exact path='/' component={Home} />
                        <Route path="/jobs" component={Jobs} />
                        <Route path="/myJobs" component={MyJobs} />
                        <Route path="/curriculo" component={Resume} />
                    </Master>
                </React.Fragment>
            </Router>
        )
    }
}

export default Root