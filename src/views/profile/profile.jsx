import './profile.scss'

import React, { Component } from 'react'

import { Form } from '../../utils/Form'
import Input from '../../components/input/input'
import Textarea from '../../components/textarea/textarea'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import { toast } from 'react-toastify'
import Nav from '../../components/nav/nav'

import userNoPhoto from '../../images/user-no-photo.jpg'
import { getDocWithId } from '../../utils/FirebaseUtils';

class Profile extends Component {
    state = {
        selectedFile: null,
        selectedFileBase64: null
    }

    fileInputRef = React.createRef()

    componentDidMount() {
        const { setValues, setLoading, person: { id } } = this.props

        setLoading(true)
        firebaseDb.collection(COLLECTIONS.PEOPLE)
            .doc(id)
            .get()
            .then(doc => setValues(getDocWithId(doc)))
            .catch(error => toast.error(`Erro ao carregar perfil: ${error}`))
            .finally(() => setLoading())
    }

    onSubmit = (event) => {
        event.preventDefault()

        const { values, setLoading, person: { id } } = this.props

        setLoading(true)
        firebaseDb.collection(COLLECTIONS.PEOPLE)
            .doc(id)
            .set(values, { merge: true })
            .then(() => toast.success('Perfil Atualizado'))
            .catch(error => toast.error(`Não foi possível salvar o perfil: ${error}`))
            .finally(() => setLoading())
    }

    fileInputChange = (event) => {
        const { setLoading, setValueToField } = this.props

        setLoading(true)
        const file = event.target.files[0]

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setValueToField('photo', reader.result)
            setLoading()
        }
    }

    render() {
        const { fields } = this.props

        return (
            <React.Fragment>
                <Nav />

                <div className='page-profile'>
                    <form onSubmit={this.onSubmit}>
                        <div className='p-3 position-sticky bg-light'>
                            <div className="row">
                                <div className='col'>
                                    <h3 className='m-0'>Perfil Empresarial</h3>
                                </div>
                                <div className='col text-right'>
                                    <button type='submit' className='btn btn-primary px-5'>Salvar</button>
                                </div>
                            </div>
                        </div>

                        <div className='p-3'>
                            <div className='card  mb-3'>
                                <div className='bg-secondary d-flex align-items-center justify-content-center' style={{ height: 200 }}>
                                    <a
                                        role='button'
                                        className='btn rounded-circle'
                                        onClick={() => this.fileInputRef.current.click()}
                                    >
                                        <img
                                            className='user-img rounded-circle'
                                            src={fields.photo.value || userNoPhoto}
                                            alt='Imagem da Empresa'
                                        />
                                        <input
                                            ref={this.fileInputRef}
                                            className='d-none'
                                            type='file'
                                            accept='image/*'
                                            onChange={this.fileInputChange}
                                        />
                                    </a>
                                </div>
                                <div className='card-body'>
                                    <Input
                                        label='Razão Social *'
                                        required
                                        {...fields.companyName}
                                    />

                                    <Input
                                        label='Nome Fantasia'
                                        {...fields.fantasyName}
                                    />

                                    <Textarea
                                        label='Sobre a Empresa'
                                        style={{ minHeight: 180 }}
                                        {...fields.aboutUs}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment >
        )
    }
}

const fields = [
    'photo', 'companyName', 'fantasyName', 'aboutUs'
]

export default Form(Profile, fields)