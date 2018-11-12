import React, { Component } from 'react'
import firebase from 'firebase'
import { toast } from 'react-toastify'

import Input from '../../../components/input/input'
import { Form } from '../../../utils/Form'

class ForgotPasswordModal extends Component {
    state = {
        formWasValidated: false
    }

    onSubmit = (event) => {
        const { setLoading, values, closeModal } = this.props
        event.preventDefault()

        const form = event.target

        if (!form.checkValidity()) {
            return this.setState({ formWasValidated: true })
        }

        setLoading(true)
        firebase.auth().sendPasswordResetEmail(values.email)
            .then(() => {
                toast.success('E-mail com instruções enviado')
                closeModal()
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setLoading(false))
    }

    render() {
        const { formWasValidated } = this.state
        const { closeModal, fields } = this.props

        return (
            <div className="modal" tabIndex="-1" role="dialog" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Esqueceu a senha</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className={`needs-validation mw-100 text-left${formWasValidated ? ' was-validated' : ''}`} onSubmit={this.onSubmit} noValidate>
                            <div className="modal-body">
                                <Input
                                    type='email'
                                    label='E-mail'
                                    title='Insira um e-mail válido'
                                    required
                                    {...fields.email}
                                >
                                    <small>Insira o e-mail usado no cadastro que lhe enviaremos um link para resetar sua senha</small>
                                </Input>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary">Enviar e-mail</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

const fields = [
    'email'
]

export default Form(ForgotPasswordModal, fields)
