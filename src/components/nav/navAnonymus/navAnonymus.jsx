import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavAnonymus extends Component {
    render() {
        return (
            <div className='actions text-right'>
                <Link to='/acesso' className='btn btn-secondary mr-2'>
                    Acessar
                </Link>
                <Link to='/cadastro/candidato' className='btn btn-primary'>
                    Criar Cadastro
                </Link>
            </div>
        )
    }
}

export default NavAnonymus