import React, { Component } from 'react'
import logo from '../../images/logo.png'

import './signup.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faceboo, faMapMarker, faMap } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

class SignUp extends Component {
    render() {
        return (
            <div className='login'>
                <a href='/' className='login-logo'>
                    <img src={logo} alt='Logo do Site' />
                </a>

                <div className='login-box'>
                    <h2 className='login-title'>Criar sua conta</h2>

                    <div className='fields'>
                        <div className='field'>
                            <label htmlFor='language'>Idioma</label>
                            <select id='language'>
                                <option value='pt'>Português</option>
                            </select>
                        </div>
                        <div className='field'>
                            <label htmlFor='name'>Nome</label>
                            <input id='name' type='text' />
                        </div>
                        <div className='field'>
                            <label htmlFor='nickname'>Sobrenome</label>
                            <input id='nickname' type='text' />
                        </div>
                        <div className='field'>
                            <label htmlFor='country'>País de origem *</label>
                            <select id='country'>
                                <option value='br'>Brasil</option>
                            </select>
                        </div>
                        <div className='field'>
                            <label htmlFor='document'>CPF *</label>
                            <input id='document' type='text' />
                        </div>
                        <div className='field'>
                            <label htmlFor='email'>E-mail *</label>
                            <input id='email' type='email' />
                        </div>
                        <div className='field'>
                            <label htmlFor='emailconfirm'>Confirme seu e-mail *</label>
                            <input id='emailconfirm' type='email' />
                        </div>
                        <div className='field'>
                            <label htmlFor='password'>Senha *</label>
                            <input id='password' type='password' />
                        </div>
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