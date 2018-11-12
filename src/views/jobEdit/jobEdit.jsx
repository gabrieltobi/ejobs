import './jobEdit.scss'

import React, { Component } from 'react'
import { toast } from 'react-toastify'

import Opportunity from '../../components/opportunity/opportunity'
import Nav from '../../components/nav/nav'
import Select, { enumToOptions } from '../../components/select/select'
import { Form } from '../../utils/Form'
import { firebaseDb, COLLECTIONS } from '../../config/firebase'
import { HIRING_TYPES, DISABILITY, WORK_PLACE, OCUPPATION } from '../../config/enums'
import Input from '../../components/input/input'
import Textarea from '../../components/textarea/textarea'

class JobEdit extends Component {
    constructor(props) {
        super(props)

        const id = props.match.params.id
        if (id) {
            props.setLoading(true)
            firebaseDb.collection(COLLECTIONS.JOBS)
                .doc(id)
                .get()
                .then(doc => props.setValues(doc.data()))
                .finally(() => props.setLoading())
        }
    }

    onSubmit = (event) => {
        event.preventDefault()

        const { values, setLoading, match: { params: { id } }, match: { url }, history, person } = this.props
        let collection = firebaseDb.collection(COLLECTIONS.JOBS)

        setLoading(true)
        if (id) {
            collection
                .doc(id)
                .set(values)
                .then(() => toast.success('Vaga Atualizada'))
                .finally(() => setLoading())
        } else {
            const job = {
                ...values,
                company: person.id,
                creationDate: Date.now()
            }

            collection
                .add(job)
                .then(doc => {
                    history.push(`${url}/${doc.id}`)
                    toast.success('Vaga Adicionada')
                })
                .finally(() => setLoading())
        }
    }

    render() {
        const { fields } = this.props

        return (
            <React.Fragment>
                <Nav />
                <div className='page-jobEdit p-3 pt-4'>
                    <form onSubmit={this.onSubmit}>
                        <div className="text-right mb-3">
                            <button type='submit' className="btn btn-primary">Salvar</button>
                        </div>

                        <div className="border p-3 mb-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Input
                                        label='Vaga'
                                        {...fields.role}
                                    />
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <Select
                                        title='Escolha uma Área de Atuação'
                                        label='Área de Atuação'
                                        {...fields.sector}
                                        options={enumToOptions(OCUPPATION, 'Selecione...')}
                                    />
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <Select
                                        title='Escolha um tipo de vaga'
                                        label='Tipo de Vaga'
                                        {...fields.hiringType}
                                        options={enumToOptions(HIRING_TYPES, 'Selecione...')}
                                    />
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <Select
                                        title='Escolha uma cidade'
                                        {...fields.place}
                                        label='Cidade'
                                        options={enumToOptions(WORK_PLACE, 'Selecione...')}
                                    />
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <Select
                                        title='Escolha uma deficiência'
                                        {...fields.disability}
                                        label='Tipo de Deficiência'
                                        options={enumToOptions(DISABILITY, 'Selecione...')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border p-3 mb-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Textarea
                                        label='Descrição da Vaga'
                                        {...fields.description}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border p-3 mb-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Textarea
                                        label='Responsabilidades a Atribuições'
                                        {...fields.assignments}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border p-3 mb-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Textarea
                                        label='Requisitos e Qualificações'
                                        {...fields.requirements}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border p-3 mb-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Textarea
                                        label='Informações Adicionais'
                                        {...fields.additional}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-right mb-3">
                            <button type='submit' className="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const fields = [
    'sector',
    'role',
    'hiringType',
    'place',
    'disability',
    'description',
    'assignments',
    'requirements',
    'additional'
]

export default Form(JobEdit, fields)