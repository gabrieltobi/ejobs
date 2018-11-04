import './loading.scss'

import React, { Component } from 'react'

class Loading extends Component {
    render() {
        const {
            loading
        } = this.props

        return (
            <React.Fragment>
                {
                    loading &&
                    <div className='loading'>
                        <div className='lds-ripple'>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default Loading