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
import Resume from './views/resume/resume'
import { publicRoute } from './components/publicRoute/publicRoute'
import { AppProvider } from './views/app/app'
import { privateRoute } from './components/privateRoute/privateRoute'

class Root extends Component {
    render() {
        return (
            <Router>
                <AppProvider>
                    <Route path="/acesso" component={publicRoute(SignIn)} />
                    <Route path="/cadastro/:mode(candidato|empresa)" component={publicRoute(SignUp)} />

                    <Route exact path='/' component={publicRoute(Home)} />
                    <Route path="/jobs" component={privateRoute(Jobs)} />
                    <Route path="/myJobs" component={privateRoute(MyJobs)} />
                    <Route path="/curriculo" component={privateRoute(Resume)} />
                </AppProvider>
            </Router>
        )
    }
}

export default Root