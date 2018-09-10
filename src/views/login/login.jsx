import React, { Component } from 'react'
import logo from '../../images/logo.png'
import firebase from 'firebase'

import './login.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faceboo, faMapMarker, faMap } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'


class Login extends Component {
    facebookLogin = () => {
        firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(data => {
                console.log(data)
            })
    }

    render() {
        return (
            <div className='login'>
                <a href='/' className='login-logo'>
                    <img src={logo} alt='Logo do Site' />
                </a>

                <div className='login-box'>
                    <h2 className='login-title'>Entre com sua conta</h2>
                    <span className='login-hint'>Basta acessar com seu e-mail e senha cadastrados</span>

                    <div className='fields'>
                        <div className='field'>
                            <label htmlFor='email'>E-mail</label>
                            <input id='email' type='email' />
                        </div>
                        <div className='field'>
                            <label htmlFor='password'>Senha</label>
                            <input id='password' type='password' />
                            <a href='/login' className='hint'>
                                <span>Esqueceu a senha?</span>
                            </a>
                        </div>
                    </div>

                    <a href='/'>
                        <button type='button' className='btn btn-secondary btn-block'>Acessar Conta</button>
                    </a>

                    <div className='text-divider'>ou</div>

                    <button type='button' className='btn btn-secondary btn-block' onClick={this.facebookLogin}>
                        <FontAwesomeIcon icon={faFacebookF} />
                        Acessar Com Facebook
                    </button>
                    <a href='/login'>
                        <button type='button' className='btn btn-primary btn-block'>
                            <FontAwesomeIcon icon={faLinkedinIn} />
                            Acessar Com LinkedIn
                        </button>
                    </a>
                </div>

                <h5>Não possui uma conta?</h5>
                <a href='/signup'>
                    <h6>Criar conta</h6>
                </a>
            </div>
        )
    }
}

export default Login