import './navUser.scss'

import React, { Component } from 'react'
import userNoPhoto from '../../../images/user-no-photo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faChartLine, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase'

class NavUser extends Component {
    logout = () => {
        firebase.auth().signOut()
    }

    render() {
        const person = this.props.person || {}

        return (
            <div className='actions d-flex justify-content-between align-items-center'>
                <div className='group'>
                    <a href='/jobs' className='btn btn-link'>
                        <FontAwesomeIcon icon={faBriefcase} className='mr-2' />
                        Minhas Vagas
                    </a>
                    <a href='/jobs' className='btn btn-link'>
                        <FontAwesomeIcon icon={faChartLine} className='mr-2' />
                        Oportunidades
                    </a>
                </div>

                <div className='group'>
                    <a href='/curriculo' className='btn btn-link' role='button'>
                        <FontAwesomeIcon icon={faEnvelope} className='mr-2' />
                        {person.name}
                    </a>

                    <img
                        className='user-img rounded-circle'
                        src={person.photo || userNoPhoto}
                        alt='Foto do Usuário'
                        onClick={this.logout}
                    />
                </div>
            </div >
        )
    }
}

export default NavUser