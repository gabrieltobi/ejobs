import './profile.scss'

import React, { Component } from 'react'

import { Form } from '../../utils/Form'
import Input from '../../components/input/input'
import Select from '../../components/select/select'
import firebase from 'firebase'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import { toast } from 'react-toastify'
import Nav from '../../components/nav/nav'

import userNoPhoto from '../../images/user-no-photo.jpg'

class Profile extends Component {
    onSubmit = (event) => {
        event.preventDefault()

        const { values, setLoading } = this.props

        setLoading(true)
        firebaseDb.collection(COLLECTIONS.PEOPLE)
            .doc(firebase.auth().currentUser.uid)
            .set(values, { merge: true })
            .then(() => toast.success('Currículo Atualizado'))
            .finally(() => setLoading())
    }


    
    render() {
        const { fields, values, person } = this.props
        console.log(person)
        return (
            <React.Fragment>
                <Nav />

                <div className="page-profile">
                    <div className="p-3">
                        <div className="card">
                            <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                                <img
                                    className='user-img rounded-circle'
                                    src={person.photo || userNoPhoto}
                                    alt='Sua Foto'
                                />
                            </div>
                            <div className="card-body">
                                <Input
                                    label='Razão Social *'
                                    {...fields.companyName}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='p-3 pt-4'>
                        <div className='mb-4'>
                            <h3>Currículo</h3>
                        </div>

                        <form onSubmit={this.onSubmit}>
                            <div className='text-right mb-3'>
                                <button type='submit' className='btn btn-primary'>Salvar</button>
                            </div>

                            <div className='border p-3 mb-3'>
                                <h4 className='mb-3'>Informações Pessoais</h4>

                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <Input
                                            label='Digite seu endereço completo *'
                                            title='Exemplo: Av. Santa Monica, 56, Rio de Janeiro, Brasil'
                                            disabled={person}
                                            {...fields.address}
                                        />
                                    </div>
                                    <div className='col-md-6 col-sm-12'>
                                        <Input
                                            label='Data de nascimento *'
                                            mask='99/99/9999'
                                            disabled={person}
                                            {...fields.birthday}
                                        />
                                    </div>
                                    <div className='col-md-6 col-sm-12'>
                                        <Select
                                            label='Gênero *'
                                            disabled={person}
                                            {...fields.gender}
                                            options={(
                                                <React.Fragment>
                                                    <option value='M'>Masculino</option>
                                                    <option value='F'>Feminino</option>
                                                    <option value='O'>Outro</option>
                                                    <option value='NI'>Prefiro não informar</option>
                                                </React.Fragment>
                                            )}
                                        />
                                    </div>
                                    <div className='col-sm-12'>
                                        <Select
                                            label='Tipo de deficiência *'
                                            disabled={person}
                                            {...fields.disability}
                                            options={(
                                                <React.Fragment>
                                                    <option value='D'>Deficiência Física</option>
                                                </React.Fragment>
                                            )}
                                        />
                                    </div>
                                    <div className='col-md-6 col-sm-12'>
                                        <Input
                                            label='Celular *'
                                            mask='(99) 99999-9999'
                                            disabled={person}
                                            {...fields.cellphone}
                                        />
                                    </div>
                                    <div className='col-md-6 col-sm-12'>
                                        <Input
                                            label='Telefone'
                                            mask='(99) 99999-9999'
                                            disabled={person}
                                            {...fields.phone}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='text-right mb-3'>
                                <button type='submit' className='btn btn-primary'>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

const fields = [
    'name', 'lastname', 'email', 'address', 'birthday', 'gender', 'disability',
    'cellphone', 'phone', 'name', 'lastname', 'email', 'education', 'degree',
    'status', 'institution', 'class', 'startDate', 'endDate', 'experience',
    'companyName', 'position', 'startDateJob', 'endDateJob', 'currentJob',
    'descriptionJob', 'interestAreas', 'achievements', 'achievement', 'title',
    'descriptionAchievement', 'language', 'level', 'facebook', 'linkedin', 'site'
]

export default Form(Profile, fields, {
    interestAreas: []
})