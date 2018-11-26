import './navUser.scss'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faChartLine, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import userNoPhoto from '../../../images/user-no-photo.jpg'

class NavUser extends Component {
    logout = () => {
        firebase.auth().signOut()
    }

    render() {
        const { person } = this.props

        return (
            <div className='actions d-flex justify-content-between align-items-center'>
                <div className='group'>
                    <Link to='/myJobs' className='btn btn-link'>
                        <FontAwesomeIcon icon={faBriefcase} className='mr-2' />
                        Minhas Vagas
                    </Link>
                    {
                        !person.isCompany &&
                        <Link to='/jobs' className='btn btn-link'>
                            <FontAwesomeIcon icon={faChartLine} className='mr-2' />
                            Oportunidades
                        </Link>
                    }
                </div>

                <div className='group'>
                    <Link to={person.isCompany ? '/perfil' : `/curriculo/${person.id}`} className='btn btn-link' role='button'>
                        {person.name}
                    </Link>

                    <img
                        className='user-img rounded-circle'
                        src={person.photo || userNoPhoto}
                        alt='Sua Foto'
                    />

                    <Link to='/' className='btn btn-link' onClick={this.logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </Link>
                </div>
            </div >
        )
    }
}

export default NavUser