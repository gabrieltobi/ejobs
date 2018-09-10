import React, { Component } from 'react'
import logo from '../../images/logo.png'
import Input from '../../components/input/input'
import Select from '../../components/select/select'

import './signup.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

class SignUp extends Component {
    render() {
        return (
            <div className='signup'>
                <a href='/' className='login-logo'>
                    <img src={logo} alt='Logo do Site' />
                </a>

                <div className='login-box'>
                    <h2 className='login-title'>Criar sua conta</h2>

                    <div className='fields'>
                        <Select
                            id='language'
                            label='Idioma'
                            options={(
                                <option value='pt'>Português</option>
                            )}
                        />

                        <Input id='name' type='text' label='Nome' />

                        <Input id='nickname' type='text' label='Sobrenome' />

                        <Select
                            id='country'
                            label='País de origem *'
                            options={(
                                <option value='br'>Brasil</option>
                            )}
                        />

                        <Input id='document' type='text' label='CPF *' />

                        <Input id='email' type='email' label='E-mail *' />

                        <Input id='emailconfirm' type='email' label='Confirme seu e-mail *' />

                        <Input id='password' type='password' label='Senha *' />

                        <div className='field'>
                            <input type='checkbox' />
                            <span>
                                Concordo com os&nbsp;
                                <a href='/signup'>termos de uso</a>
                            </span>
                        </div>
                    </div>

                    <a href='/'>
                        <button type='button' className='btn btn-secondary btn-block'>Criar Conta</button>
                    </a>

                    <div className='text-divider'>ou</div>

                    <a href='/login'>
                        <button type='button' className='btn btn-secondary btn-block'>
                            <FontAwesomeIcon icon={faFacebookF} />
                            Acessar Com Facebook
                        </button>
                    </a>
                    <a href='/login'>
                        <button type='button' className='btn btn-primary btn-block'>
                            <FontAwesomeIcon icon={faLinkedinIn} />
                            Acessar Com LinkedIn
                        </button>
                    </a>
                </div>

                <h5>Já possui uma conta?</h5>
                <a href='/login'>
                    <h6>Criar conta</h6>
                </a>
            </div>
        )
    }
}

export default SignUp