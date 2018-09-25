import React, { Component } from 'react'

class NavAnonymus extends Component {
    render() {
        return (
            <div className='actions text-right'>
                <a href='/login' className='btn btn-secondary mr-2'>
                    Acessar
                </a>
                <a href='/signup' className='btn btn-primary'>
                    Criar Cadastro
                </a>
            </div>
        )
    }
}

export default NavAnonymus