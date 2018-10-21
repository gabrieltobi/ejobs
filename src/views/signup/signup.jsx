import './signup.scss'

import React, { Component } from 'react'
import logo from '../../images/logo.png'
import Input from '../../components/input/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { Form } from '../../utils/Form'
import { getNumbersOnly } from '../../utils/Toolbox'
import { isValidCpf } from '../../utils/Validations'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import ReCAPTCHA from 'react-google-recaptcha'

class SignUp extends Component {
    state = {
        formWasValidated: false
    }

    recaptchaRef = React.createRef()

    cpfValidation = (evt) => {
        const {
            fields,
            setInvalidFeedback
        } = this.props

        const input = evt.target
        const value = input.value
        const field = input.name
        let validationText = ''

        //Só checa após já ter passado a validação nativa do browser
        if (!input.validity.patternMismatch) {
            if (!isValidCpf(getNumbersOnly(value))) {
                validationText = 'Informe um CPF válido'
            }
        }

        input.setCustomValidity(validationText)
        setInvalidFeedback(field, validationText)

        fields[field].onChange(evt)
    }

    emailConfirmValidation = (evt) => {
        const {
            fields,
            setInvalidFeedback
        } = this.props

        const input = evt.target
        const field = input.name
        const form = input.form

        const emailInput = form['email']
        const emailConfirmInput = form['emailConfirm']
        const emailConfirmValidity = emailConfirmInput.validity
        let validationText = ''

        //Só checa após já ter passado a validação nativa do browser
        if (!emailConfirmValidity.valueMissing && !emailConfirmValidity.typeMismatch) {
            if (emailInput.value !== emailConfirmInput.value) {
                validationText = 'Informe o mesmo e-mail informado anteriormente'
            }
        }

        emailConfirmInput.setCustomValidity(validationText)
        setInvalidFeedback('emailConfirm', validationText)

        fields[field].onChange(evt)
    }

    checkRecaptcha = (recaptchaToken) => {
        recaptchaToken = recaptchaToken || this.recaptchaRef.current.getValue()

        if (recaptchaToken) {
            this.signUp()
        } else {
            this.recaptchaRef.current.execute()
        }
    }

    onSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        if (!form.checkValidity()) {
            return this.setState({ formWasValidated: true })
        }

        this.checkRecaptcha()
    }

    signUp = () => {
        const {
            values: {
                emailConfirm,
                password,
                tosAcceptance,
                ...userData
            },
            history
        } = this.props

        firebase.auth()
            .createUserWithEmailAndPassword(userData.email, password)
            .then(firebaseUserData => {
                const uid = firebaseUserData.user.uid
                const now = Date.now()

                userData.document = getNumbersOnly(userData.document)
                userData.creationDate = now
                userData.tosAcceptanceDate = now

                firebaseDb.collection(COLLECTIONS.PEOPLE)
                    .doc(uid)
                    .set(userData, { merge: true })
                    .then(() => history.push('/'))
            })
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
            <div className='page-signup text-center py-4 px-3'>
                <a href='/' className='logo d-block mx-auto'>
                    <img src={logo} alt='Logo do Site' />
                </a>

                <form className={`needs-validation border rounded m-3 mx-auto p-4${formWasValidated ? ' was-validated' : ''}`} onSubmit={this.onSubmit} noValidate>
                    <h2 className='mb-4'>Criar sua conta</h2>

                    <div className='text-left mb-3'>
                        <Input
                            label='Nome'
                            title='Informe seu nome'
                            required
                            {...fields.name}
                        />

                        <Input
                            label='Sobrenome'
                            title='Informe seu sobrenome'
                            required
                            {...fields.surname}
                        />

                        {/* <Input
                            type='tel'
                            label='CPF'
                            title='Informe um CPF'
                            required
                            pattern='^\d{3}.\d{3}.\d{3}-\d{2}$'
                            mask='999.999.999-99'
                            {...fields.document}
                            onChange={this.cpfValidation}
                        /> */}

                        <Input
                            type='email'
                            label='E-mail'
                            title='Informe um e-mail válido, será o seu e-mail de acesso'
                            required
                            {...fields.email}
                            onChange={this.emailConfirmValidation}
                        />

                        {/* <Input
                            type='email'
                            label='Confirme seu e-mail'
                            title='Informe um e-mail válido e igual ao informado anteriormente'
                            required
                            {...fields.emailConfirm}
                            onChange={this.emailConfirmValidation}
                        /> */}

                        <Input
                            type='password'
                            label='Senha'
                            title='Crie uma senha para acesso com no mínimo 6 dígitos'
                            required
                            minLength='6'
                            {...fields.password}
                        />

                        <Input
                            type='checkbox'
                            label={(
                                <React.Fragment>
                                    Concordo com os&nbsp;
                                    <a href='#'>termos de uso</a>
                                </React.Fragment>
                            )}
                            title='Esteja de acordo com os termos de uso'
                            required
                            {...fields.tosAcceptance}
                        />
                    </div>

                    <ReCAPTCHA
                        ref={this.recaptchaRef}
                        sitekey='6LefGHQUAAAAACneffmHDIyGvHO7-Q8LDFtKP_wj'
                        onChange={this.checkRecaptcha}
                        size='invisible'
                    />

                    <button className='btn btn-primary btn-block' type='submit'>
                        Criar Conta
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

                <h5>Já possui uma conta?</h5>
                <a href='/login'>
                    <h6>Acessar</h6>
                </a>
            </div>
        )
    }
}

const fields = [
    'name',
    'surname',
    'document',
    'email',
    'emailConfirm',
    'password',
    'tosAcceptance'
]

export default Form(SignUp, fields)