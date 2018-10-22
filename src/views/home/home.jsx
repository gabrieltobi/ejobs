import React, { Component } from 'react'
import Nav from '../../components/nav/nav'
import Highlights from './highlights/highlights'
import Passionates from './passionates/passionates'
import Opportunities from './opportunities/opportunities'
import Stories from './stories/stories'

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Highlights />
                <Passionates />
                <Opportunities />
                <Stories />
            </React.Fragment>
        )
    }
}

export default Home