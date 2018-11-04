import './signup.scss'

import React, { Component } from 'react'
import logo from '../../images/logo.png'
import Input from '../../components/input/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { Form } from '../../utils/Form'
import { getNumbersOnly } from '../../utils/Toolbox'
import { isValid as isValidCpf } from "@fnando/cpf"
import { isValid as isValidCnpj } from "@fnando/cnpj"
import firebase from 'firebase'
import { toast } from 'react-toastify'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import ReCAPTCHA from 'react-google-recaptcha'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            formWasValidated: false,
            applicantMode: (props.match.params.mode === 'candidato')
        }
    }

    recaptchaRef = React.createRef()
    tabs = [
        { tab: 'Candidato', mode: 'candidato' },
        { tab: 'Empresa', mode: 'empresa' }
    ]

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

    cnpjValidation = (evt) => {
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
            if (!isValidCnpj(getNumbersOnly(value))) {
                validationText = 'Informe um CNPJ válido'
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
        //const emailConfirmInput = form['emailConfirm']
        //const emailConfirmValidity = emailConfirmInput.validity
        let validationText = ''

        //Só checa após já ter passado a validação nativa do browser
        //if (!emailConfirmValidity.valueMissing && !emailConfirmValidity.typeMismatch) {
        //if (emailInput.value !== emailConfirmInput.value) {
        //    validationText = 'Informe o mesmo e-mail informado anteriormente'
        //}
        //}

        //emailConfirmInput.setCustomValidity(validationText)
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
        const { applicantMode } = this.state

        firebase.auth()
            .createUserWithEmailAndPassword(userData.email, password)
            .then(firebaseUserData => {
                const uid = firebaseUserData.user.uid
                const now = Date.now()

                userData.document = getNumbersOnly(userData.document)
                userData.creationDate = now
                userData.tosAcceptanceDate = now

                firebaseDb.collection(applicantMode ? COLLECTIONS.PEOPLE : COLLECTIONS.COMPANIES)
                    .doc(uid)
                    .set(userData, { merge: true })
                    .then(() => {
                        if (applicantMode) {
                            history.push('/curriculo')
                        } else {
                            history.push('/')
                        }
                    })
            })
            .catch(error => toast.error(error.message))
    }

    renderTab = (tab) => {
        const { match: { params: { mode } } } = this.props

        return (
            <li key={tab.mode} className='nav-item'>
                <a className={`nav-link${((tab.mode === mode) ? ' active' : '')}`} href={tab.mode}>{tab.tab}</a>
            </li>
        )
    }

    render() {
        const {
            fields
        } = this.props

        const {
            formWasValidated,
            applicantMode
        } = this.state

        return (
            <div className='page-signup text-center py-4 px-3'>
                <a href='/' className='logo d-block mx-auto mb-3'>
                    <img src={logo} alt='Logo do Site' />
                </a>

                <div className='usable-area mx-auto'>
                    <ul className='nav nav-tabs nav-fill'>
                        {this.tabs.map(this.renderTab)}
                    </ul>

                    <form className={`needs-validation border border-top-0 rounded-bottom mb-3 p-4${formWasValidated ? ' was-validated' : ''}`} onSubmit={this.onSubmit} noValidate>

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

                            {
                                !applicantMode &&
                                <React.Fragment>
                                    <Input
                                        type='tel'
                                        label='CNPJ'
                                        title='Informe um CNPJ'
                                        required
                                        pattern='^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$'
                                        mask='99.999.999/9999-99'
                                        {...fields.document}
                                        onChange={this.cnpjValidation}
                                    />

                                    <Input
                                        label='Razão Social'
                                        title='Informe a Razão Social'
                                        required
                                        {...fields.companyName}
                                    />
                                </React.Fragment>
                            }

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

                        {
                            applicantMode &&
                            <React.Fragment>
                                <span className='d-block my-3'>ou</span>

                                <button type='button' className='btn btn-secondary btn-block mb-3' onClick={this.facebookLogin}>
                                    <FontAwesomeIcon icon={faFacebookF} className='mr-3' />
                                    Criar via Facebook
                                </button>

                                <button type='button' className='btn btn-secondary btn-block'>
                                    <FontAwesomeIcon icon={faLinkedinIn} className='mr-3' />
                                    Criar via LinkedIn
                                </button>
                            </React.Fragment>
                        }
                    </form>
                </div>

                <h5>Já possui uma conta?</h5>
                <a href='/acesso'>
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
    'companyName',
    'email',
    'emailConfirm',
    'password',
    'tosAcceptance'
]

export default Form(SignUp, fields)