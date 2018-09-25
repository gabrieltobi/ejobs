import './login.scss'

import React, { Component } from 'react'
import logo from '../../images/logo.png'
import firebase from 'firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { Form } from '../../utils/Form'
import { toast } from 'react-toastify'
import Input from '../../components/input/input'

class Login extends Component {
    state = {
        formWasValidated: false
    }

    facebookLogin = () => {
        firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(firebaseUserData => history.push('/'))
            .catch(error => toast.error(error.message))
    }

    onSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        if (!form.checkValidity()) {
            return this.setState({ formWasValidated: true })
        }

        const {
            values: {
                email,
                password
            },
            history
        } = this.props

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(firebaseUserData => history.push('/'))
            .catch(error => toast.error(error.message))
    }

    render() {
        const {
            fields
        } = this.props

        const {
            formWasValidated
        } = this.state

        return (
            <div className='page-login text-center py-4 px-3'>
                <a href='/' className='logo d-block mx-auto'>
                    <img src={logo} alt='Logo do Site' />
                </a>

                <form className={`needs-validation border rounded m-3 mx-auto p-4${formWasValidated ? ' was-validated' : ''}`} onSubmit={this.onSubmit} noValidate>
                    <h2>Entre com sua conta</h2>
                    <span className='d-block mb-4'>Basta acessar com seu e-mail e senha cadastrados</span>

                    <div className='text-left'>
                        <Input
                            type='email'
                            label='E-mail'
                            title='Insira um e-mail válido'
                            required
                            {...fields.email}
                        />

                        <Input
                            type='password'
                            label='Senha'
                            title='A senha contém pelo menos 6 dígitos'
                            required
                            minLength='6'
                            aria-describedby='password-help'
                            {...fields.password}
                        >
                            <span id='password-help' className='form-text text-right'>
                                <a href='#' role='button'>
                                    Esqueceu a senha?
                                </a>
                            </span>
                        </Input>
                    </div>

                    <button className='btn btn-primary btn-block' type='submit'>
                        Acessar Conta
                    </button>

                    <span className='d-block my-3'>ou</span>

                    <button type='button' className='btn btn-secondary btn-block mb-3' onClick={this.facebookLogin}>
                        <FontAwesomeIcon icon={faFacebookF} className='mr-3' />
                        Acessar Com Facebook
                    </button>

                    <button type='button' className='btn btn-secondary btn-block'>
                        <FontAwesomeIcon icon={faLinkedinIn} className='mr-3' />
                        Acessar Com LinkedIn
                    </button>
                </form>

                <h5>Não possui uma conta?</h5>
                <a href='/signup'>
                    <h6>Criar conta</h6>
                </a>
            </div>
        )
    }
}

const fields = [
    'email',
    'password'
]

export default Form(Login, fields)