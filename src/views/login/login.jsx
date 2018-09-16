import './login.scss'

import React, { Component } from 'react'
import logo from '../../images/logo.png'
import firebase from 'firebase'
import Input from '../../components/input/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { Form } from '../../utils/Form'
import { ToastContainer, toast } from 'react-toastify'

class Login extends Component {
    facebookLogin = () => {
        firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(data => {
                console.log(data)
            })
    }

    onSubmit = (event) => {
        event.preventDefault()

        const {
            values: {
                email,
                password
            },
            history
        } = this.props

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(firebaseUserData => history.push('/'))
            .catch(error => {
                toast.error(error.message)
            })
    }

    render() {
        const {
            fields
        } = this.props

        const forgotPassword = (
            <a href='#' className='hint'>
                <span>Esqueceu a senha?</span>
            </a>
        )

        return (
            <div className='login'>
                <a href='/' className='login-logo'>
                    <img src={logo} alt='Logo do Site' />
                </a>

                <form className='login-box' onSubmit={this.onSubmit}>
                    <h2 className='login-title'>Entre com sua conta</h2>
                    <span className='login-hint'>Basta acessar com seu e-mail e senha cadastrados</span>

                    <div className='fields'>
                        <Input
                            type='email'
                            label='E-mail'
                            required
                            {...fields.email}
                        />

                        <Input
                            type='password'
                            label='Senha'
                            hint={forgotPassword}
                            required
                            minLength='6'
                            {...fields.password}
                        />
                    </div>

                    <a href='/'>
                        <button type='submit' className='btn btn-secondary btn-block'>
                            Acessar Conta
                        </button>
                    </a>

                    <div className='text-divider'>ou</div>

                    <button type='button' className='btn btn-secondary btn-block' onClick={this.facebookLogin}>
                        <FontAwesomeIcon icon={faFacebookF} />
                        Acessar Com Facebook
                    </button>
                    <a href='/#'>
                        <button type='button' className='btn btn-primary btn-block'>
                            <FontAwesomeIcon icon={faLinkedinIn} />
                            Acessar Com LinkedIn
                        </button>
                    </a>
                </form>

                <h5>Não possui uma conta?</h5>
                <a href='/signup'>
                    <h6>Criar conta</h6>
                </a>

                <ToastContainer />
            </div>
        )
    }
}

const fields = [
    'email',
    'password'
]

export default Form(Login, fields)