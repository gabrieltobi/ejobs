import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './master.scss'

import PrivateRoute from './components/privateRoute/privateRoute'
import { connectToApp } from './components/connectToApp/connectToApp'

import { AppProvider } from './views/app/app'
import Home from './views/home/home'
import SignIn from './views/signin/signin'
import SignUp from './views/signup/signup'
import Jobs from './views/jobs/jobs'
import MyJobs from './views/myJobs/myJobs'
import Resume from './views/resume/resume'
import JobEdit from './views/jobEdit/jobEdit'
import Job from './views/job/job'

class Root extends Component {
    render() {
        return (
            <Router>
                <AppProvider>
                    <Route exact path='/' component={connectToApp(Home)} />

                    <Route path="/acesso" component={connectToApp(SignIn)} />
                    <Route path="/cadastro/:mode(candidato|empresa)" component={connectToApp(SignUp)} />

                    <PrivateRoute path="/jobs" component={Jobs} personOnly />
                    <PrivateRoute path="/myJobs" component={MyJobs} />
                    <PrivateRoute path="/curriculo" component={Resume} personOnly />
                    <PrivateRoute path="/jobEdit/:id?" component={JobEdit} companyOnly />
                    <PrivateRoute path="/job/:id" component={Job} />
                </AppProvider>
            </Router>
        )
    }
}

export default Root