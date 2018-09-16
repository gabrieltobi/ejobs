import './signup.scss'

import React, { Component } from 'react'
import logo from '../../images/logo.png'
import Input from '../../components/input/input'
import Select from '../../components/select/select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { Form } from '../../utils/Form'
import { getNumbersOnly } from '../../utils/Toolbox'
import { isValidCpf } from '../../utils/Validations'
import firebase from 'firebase'
import { ToastContainer, toast } from 'react-toastify'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'

class SignUp extends Component {
    cpfValidation = (evt) => {
        const {
            fields
        } = this.props

        const input = evt.target
        const value = input.value

        input.setCustomValidity('')

        //Só checa após já ter passado a validação nativa do browser
        if (!input.validity.patternMismatch) {
            if (!isValidCpf(getNumbersOnly(value))) {
                input.setCustomValidity('Informe um CPF válido')
            }
        }

        fields.document.onChange(evt)
    }

    emailConfirmValidation = (evt) => {
        const {
            fields
        } = this.props

        const input = evt.target
        const value = input.value

        input.setCustomValidity('')

        //Só checa após já ter passado a validação nativa do browser
        if (!input.validity.email) {
            if (fields.email.value !== value) {
                input.setCustomValidity('Os e-mails estão diferentes')
            }
        }

        fields.emailConfirm.onChange(evt)
    }

    onSubmit = (event) => {
        event.preventDefault()

        const {
            values: {
                emailConfirm,
                password,
                tosAcceptance,
                ...userData
            },
            history
        } = this.props

        firebase.auth().createUserWithEmailAndPassword(userData.email, password)
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
            .catch(error => {
                toast.error(error.message)
            })
    }

    render() {
        const {
            fields
        } = this.props

        return (
            <div className='signup'>
                <a href='/' className='login-logo'>
                    <img src={logo} alt='Logo do Site' />
                </a>

                <form className='login-box' onSubmit={this.onSubmit}>
                    <h2 className='login-title'>Criar sua conta</h2>

                    <div className='fields'>
                        {/* <Select
                            id='language'
                            label='Idioma'
                            options={(
                                <option value='pt'>Português</option>
                            )}
                        /> */}

                        <Input
                            type='text'
                            label='Nome'
                            required
                            title={'Informe seu nome'}
                            {...fields.name}
                        />

                        <Input
                            type='text'
                            label='Sobrenome'
                            required
                            title={'Informe seu sobrenome'}
                            {...fields.surname}
                        />

                        {/* <Select
                            id='country'
                            label='País de origem'
                            options={(
                                <option value='br'>Brasil</option>
                            )}
                        /> */}

                        <Input
                            type='tel'
                            label='CPF'
                            required
                            pattern='^\d{3}.\d{3}.\d{3}-\d{2}$'
                            mask='999.999.999-99'
                            title={'Informe seu CPF'}
                            {...fields.document}
                            onChange={this.cpfValidation}
                        />

                        <Input
                            type='email'
                            label='E-mail'
                            required
                            {...fields.email}
                            title={'Informe um e-mail, será o seu e-mail de acesso'}
                        />

                        <Input
                            type='email'
                            label='Confirme seu e-mail'
                            required
                            title={'Informe o mesmo e-mail informado anteriormente'}
                            {...fields.emailConfirm}
                            onChange={this.emailConfirmValidation}
                        />

                        <Input
                            type='password'
                            label='Senha'
                            required
                            minLength='6'
                            title={'Crie uma senha para acesso'}
                            {...fields.password}
                        />

                        <div className='field'>
                            <input
                                type='checkbox'
                                required
                                title={'Fique de acordo com os termos de uso'}
                                {...fields.tosAcceptance}
                            />
                            <label htmlFor='tosAcceptance'>
                                Concordo com os&nbsp;
                                <a href='#'>termos de uso</a>
                            </label>
                        </div>
                    </div>

                    <button type='submit' className='btn btn-secondary btn-block'>
                        Criar Conta
                    </button>

                    <div className='text-divider'>ou</div>

                    <a href='/login'>
                        <button type='button' className='btn btn-secondary btn-block icon-left'>
                            <FontAwesomeIcon icon={faFacebookF} />
                            Acessar Com Facebook
                        </button>
                    </a>
                    <a href='/login'>
                        <button type='button' className='btn btn-primary btn-block icon-left'>
                            <FontAwesomeIcon icon={faLinkedinIn} />
                            Acessar Com LinkedIn
                        </button>
                    </a>
                </form>

                <h5>Já possui uma conta?</h5>
                <a href='/login'>
                    <h6>Acessar</h6>
                </a>

                <ToastContainer />
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