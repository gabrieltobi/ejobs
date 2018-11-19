import './resume.scss'

import React, { Component } from 'react'

import { Form } from '../../utils/Form'
import Input from '../../components/input/input'
import Select from '../../components/select/select'
import firebase from 'firebase'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import { toast } from 'react-toastify'
import Nav from '../../components/nav/nav'

class Resume extends Component {
    constructor(props) {
        super(props)

        this.state = {
            disabled: true
        }

        const id = props.match.params.id
        if (id) {
            props.setLoading(true)
            this.state.disabled = (props.person.id !== id)

            firebase.auth().onAuthStateChanged(currentUser => {
                firebaseDb.collection(COLLECTIONS.PEOPLE)
                    .doc(id)
                    .get()
                    .then(doc => {
                        if (doc.exists) {
                            props.setValues(doc.data())
                        }
                    })
                    .finally(() => props.setLoading())
            })
        }
    }

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
        const { fields, values } = this.props
        const { disabled } = this.state

        return (
            <React.Fragment>
                <Nav />
                <div className='page-opportunity p-3 pt-4'>
                    <div className='mb-4'>
                        <h3>Currículo</h3>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        {
                            !disabled &&
                            <div className='text-right mb-3'>
                                <button type='submit' className='btn btn-primary'>Salvar</button>
                            </div>
                        }

                        <div className='border p-3 mb-3'>
                            <div className='row'>
                                <div className='col-md-6 col-sm-12'>
                                    <Input
                                        label='Nome'
                                        disabled={disabled}
                                        {...fields.name}
                                    />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Input
                                        label='Sobrenome'
                                        disabled={disabled}
                                        {...fields.lastname}
                                    />
                                </div>
                                <div className='col-sm-12'>
                                    <Input
                                        type='email'
                                        label='E-mail'
                                        disabled={disabled}
                                        {...fields.email}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='border p-3 mb-3'>
                            <h4 className='mb-3'>Informações Pessoais</h4>

                            <div className='row'>
                                <div className='col-sm-12'>
                                    <Input
                                        label='Digite seu endereço completo *'
                                        title='Exemplo: Av. Santa Monica, 56, Rio de Janeiro, Brasil'
                                        disabled={disabled}
                                        {...fields.address}
                                    />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Input
                                        label='Data de nascimento *'
                                        mask='99/99/9999'
                                        disabled={disabled}
                                        {...fields.birthday}
                                    />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Select
                                        label='Gênero *'
                                        disabled={disabled}
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
                                        disabled={disabled}
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
                                        disabled={disabled}
                                        {...fields.cellphone}
                                    />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Input
                                        label='Telefone'
                                        mask='(99) 99999-9999'
                                        disabled={disabled}
                                        {...fields.phone}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='border p-3 mb-3'>
                            <h4 className='mb-3'>Grau de Instrução</h4>

                            <div className='row'>
                                <div className='col-sm-12'>
                                    <div className='form-group'>
                                        <label className='d-block'>Possui educação superior? *</label>
                                        <Input
                                            type='radio'
                                            label='Sim'
                                            disabled={disabled}
                                            {...fields.education}
                                            id='haveEducation'
                                            value='Y'
                                        />
                                        <Input
                                            type='radio'
                                            label='Não'
                                            disabled={disabled}
                                            {...fields.education}
                                            id='haventEducation'
                                            value='N'
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Select
                                        label='Grau *'
                                        disabled={disabled}
                                        {...fields.degree}
                                        options={(
                                            <React.Fragment>
                                                <option value='1'>Curso Técnico</option>
                                                <option value='2'>Tecnólogo</option>
                                                <option value='3'>Graduação</option>
                                                <option value='4'>Pós Graduação</option>
                                                <option value='5'>Mestrado</option>
                                                <option value='6'>Doutorado</option>
                                                <option value='7'>Pós Doutorado</option>
                                            </React.Fragment>
                                        )}
                                    />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Select
                                        label='Status *'
                                        {...fields.status}
                                        disabled={disabled}
                                        options={(
                                            <React.Fragment>
                                                <option value='C'>Completo</option>
                                                <option value='EA'>Em Andamento</option>
                                                <option value='I'>Incompleto</option>
                                            </React.Fragment>
                                        )}
                                    />
                                </div>

                                {
                                    (values.education === 'Y') &&
                                    <React.Fragment>
                                        <div className='col-md-6 col-sm-12'>
                                            <Input
                                                label='Instituição'
                                                disabled={disabled}
                                                {...fields.institution}
                                            />
                                        </div>
                                        <div className='col-md-6 col-sm-12'>
                                            <Input
                                                label='Curso'
                                                disabled={disabled}
                                                {...fields.class}
                                            />
                                        </div>
                                        <div className='col-md-6 col-sm-12'>
                                            <Input
                                                label='Data de início *'
                                                mask='99/99/9999'
                                                disabled={disabled}
                                                {...fields.startDate}
                                            />
                                        </div>
                                        <div className='col-md-6 col-sm-12'>
                                            <Input
                                                label='Data de formação *'
                                                mask='99/99/9999'
                                                disabled={disabled}
                                                {...fields.endDate}
                                            />
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                        </div>

                        <div className='border p-3 mb-3'>
                            <h4 className='mb-3'>Experiência Profissional</h4>

                            <div className='row'>
                                <div className='col-sm-12'>
                                    <div className='form-group'>
                                        <label className='d-block'>Possui experiência profissional? *</label>
                                        <Input
                                            type='radio'
                                            label='Sim'
                                            disabled={disabled}
                                            {...fields.experience}
                                            id='haveExperience'
                                            value='Y'
                                        />
                                        <Input
                                            type='radio'
                                            label='Não'
                                            disabled={disabled}
                                            {...fields.experience}
                                            id='haventExperience'
                                            value='N'
                                        />
                                    </div>
                                </div>

                                {
                                    (values.experience === 'Y') &&
                                    <React.Fragment>
                                        <div className='col-md-6 col-sm-12'>
                                            <Input
                                                label='Nome da Empresa *'
                                                disabled={disabled}
                                                {...fields.companyName}
                                            />
                                        </div>
                                        <div className='col-md-6 col-sm-12'>
                                            <Input
                                                label='Cargo'
                                                disabled={disabled}
                                                {...fields.position}
                                            />
                                        </div>
                                        <div className='col-md-6 col-sm-12'>
                                            <Input
                                                label='Data de início *'
                                                mask='99/99/9999'
                                                disabled={disabled}
                                                {...fields.startDateJob}
                                            />
                                        </div>
                                        <div className='col-md-6 col-sm-12'>
                                            <Input
                                                label='Data de término *'
                                                mask='99/99/9999'
                                                disabled={disabled || values.currentJob}
                                                {...fields.endDateJob}
                                            >
                                                <Input
                                                    type='checkbox'
                                                    label='Este é o meu emprego atual'
                                                    disabled={disabled}
                                                    {...fields.currentJob}
                                                />
                                            </Input>
                                        </div>
                                        <div className='col-sm-12'>
                                            <div className='form-group'>
                                                <label htmlFor='descriptionJob'>Descrição</label>
                                                <textarea className='form-control' id='descriptionJob' disabled={disabled} {...fields.descriptionJob} />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                        </div>

                        <div className='border p-3 mb-3'>
                            <h4 className='mb-3'>Áreas de interesse e conquistas</h4>

                            <div className='row'>
                                <div className='col-sm-12'>
                                    <Select
                                        label='Quais são as suas áreas de interesse? *'
                                        disabled={disabled}
                                        {...fields.interestAreas}
                                        multiple
                                        options={(
                                            <React.Fragment>
                                                <option value='1'>Marketing</option>
                                                <option value='2'>Recursos Humanos</option>
                                                <option value='3'>Logística</option>
                                                <option value='4'>Jurídico</option>
                                                <option value='5'>Produção</option>
                                            </React.Fragment>
                                        )}
                                    />
                                </div>

                                <div className='col-sm-12'>
                                    <div className='form-group'>
                                        <label className='d-block'>Você tem conquistas como cursos, certificados e reconhecimentos?</label>
                                        <Input
                                            type='radio'
                                            label='Sim'
                                            disabled={disabled}
                                            {...fields.achievements}
                                            id='haveAchievements'
                                            value='Y'
                                        />
                                        <Input
                                            type='radio'
                                            label='Não'
                                            disabled={disabled}
                                            {...fields.achievements}
                                            id='haventAchievements'
                                            value='N'
                                        />
                                    </div>
                                </div>

                                {
                                    (values.achievements === 'Y') &&
                                    <React.Fragment>
                                        <div className='col-md-6 col-sm-12'>
                                            <Select
                                                label='Conquista *'
                                                disabled={disabled}
                                                {...fields.achievement}
                                                options={(
                                                    <React.Fragment>
                                                        <option value='1'>Certificado</option>
                                                        <option value='2'>Curso</option>
                                                        <option value='3'>Reconhecimento</option>
                                                        <option value='4'>Trabalho Voluntário</option>
                                                    </React.Fragment>
                                                )}
                                            />
                                        </div>
                                        <div className='col-md-6 col-sm-12'>
                                            <Input
                                                label='Título'
                                                disabled={disabled}
                                                {...fields.title}
                                            />
                                        </div>
                                        <div className='col-sm-12'>
                                            <div className='form-group'>
                                                <label htmlFor='descriptionAchievement'>Descrição</label>
                                                <textarea className='form-control' id='descriptionAchievement' disabled={disabled} {...fields.descriptionAchievement} />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                        </div>

                        <div className='border p-3 mb-3'>
                            <h4 className='mb-3'>Idiomas</h4>

                            <div className='row'>
                                <div className='col-md-6 col-sm-12'>
                                    <Select
                                        label='Idioma *'
                                        disabled={disabled}
                                        {...fields.language}
                                        options={(
                                            <React.Fragment>
                                                <option value='1'>Inglês</option>
                                                <option value='2'>Italiano</option>
                                                <option value='3'>Japonês</option>
                                                <option value='4'>Espanhol</option>
                                            </React.Fragment>
                                        )}
                                    />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Select
                                        label='Nível *'
                                        disabled={disabled}
                                        {...fields.level}
                                        options={(
                                            <React.Fragment>
                                                <option value='1'>Básico</option>
                                                <option value='2'>Intermediário</option>
                                                <option value='3'>Avançado</option>
                                                <option value='4'>Fluente/Nativo</option>
                                            </React.Fragment>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='border p-3 mb-3'>
                            <h4 className='mb-3'>Perfil em redes sociais</h4>

                            <div className='row'>
                                <div className='col-md-6 col-sm-12'>
                                    <Input
                                        label='Perfil no Facebook'
                                        disabled={disabled}
                                        {...fields.facebook}
                                    />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Input
                                        label='Perfil no LinkedIn'
                                        disabled={disabled}
                                        {...fields.linkedin}
                                    />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Input
                                        label='Blog ou site pessoal'
                                        disabled={disabled}
                                        {...fields.site}
                                    />
                                </div>
                            </div>
                        </div>

                        {
                            !disabled &&
                            <div className='text-right mb-3'>
                                <button type='submit' className='btn btn-primary'>Salvar</button>
                            </div>
                        }
                    </form>
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

export default Form(Resume, fields, {
    interestAreas: []
})