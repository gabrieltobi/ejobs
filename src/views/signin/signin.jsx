import './signin.scss'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import { Form } from '../../utils/Form'
import Input from '../../components/input/input'

import logo from '../../images/logo.png'
import ForgotPasswordModal from './forgotPasswordModal/forgotPasswordModal';

class SignIn extends Component {
    state = {
        formWasValidated: false,
        modalOpen: false
    }

    recaptchaRef = React.createRef()

    openModal = (event) => {
        event.preventDefault()
        this.setState({ modalOpen: true })
    }

    closeModal = () => {
        this.setState({ modalOpen: false })
    }

    facebookLogin = () => {
        firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(firebaseUserData => history.push('/'))
            .catch(error => toast.error(error.message))
    }

    checkRecaptcha = (recaptchaToken) => {
        recaptchaToken = recaptchaToken || this.recaptchaRef.current.getValue()

        if (recaptchaToken) {
            this.signIn()
        } else {
            this.recaptchaRef.current.execute()
        }
    }

    onSubmit = (event) => {
        const { setLoading } = this.props
        event.preventDefault()

        const form = event.target

        if (!form.checkValidity()) {
            return this.setState({ formWasValidated: true })
        }

        setLoading(true)
        this.checkRecaptcha()
    }

    signIn = () => {
        const {
            values: {
                email,
                password
            },
            history,
            setLoading
        } = this.props

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(firebaseUserData => history.push('/'))
            .catch(error => toast.error(error.message))
            .finally(() => setLoading())
    }

    renderModal = () => {
        const { modalOpen } = this.state
        const { setLoading } = this.props

        if (!modalOpen) {
            return null
        }

        return <ForgotPasswordModal
            closeModal={this.closeModal}
            setLoading={setLoading}
        />
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
                <Link to='/' className='logo d-block mx-auto'>
                    <img src={logo} alt='Logo do Site' />
                </Link>

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
                                <a href='#' role='button' onClick={this.openModal}>
                                    Esqueceu a senha?
                                </a>
                            </span>
                        </Input>
                    </div>

                    <ReCAPTCHA
                        ref={this.recaptchaRef}
                        sitekey='6LefGHQUAAAAACneffmHDIyGvHO7-Q8LDFtKP_wj'
                        onChange={this.checkRecaptcha}
                        size='invisible'
                    />

                    <button className='btn btn-primary btn-block' type='submit'>
                        Acessar Conta
                    </button>

                    {/* <span className='d-block my-3'>ou</span>

                    <button type='button' className='btn btn-secondary btn-block mb-3' onClick={this.facebookLogin}>
                        <FontAwesomeIcon icon={faFacebookF} className='mr-3' />
                        Acessar Com Facebook
                    </button>

                    <button type='button' className='btn btn-secondary btn-block'>
                        <FontAwesomeIcon icon={faLinkedinIn} className='mr-3' />
                        Acessar Com LinkedIn
                    </button> */}
                </form>

                <h5>Não possui uma conta?</h5>
                <Link to='/cadastro/candidato'>
                    <h6>Criar conta</h6>
                </Link>

                {this.renderModal()}
            </div>
        )
    }
}

const fields = [
    'email',
    'password'
]

export default Form(SignIn, fields)