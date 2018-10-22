import React, { Component } from 'react'

class NavAnonymus extends Component {
    render() {
        return (
            <div className='actions text-right'>
                <a href='/acesso' className='btn btn-secondary mr-2'>
                    Acessar
                </a>
                <a href='/cadastro/candidato' className='btn btn-primary'>
                    Criar Cadastro
                </a>
            </div>
        )
    }
}

export default NavAnonymus