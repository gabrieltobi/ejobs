import React, { Component } from 'react'
import Nav from './nav/nav'
import Highlights from './highlights/highlights'
import Passionates from './passionates/passionates'
import Opportunities from './opportunities/opportunities'
import Stories from './stories/stories'

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <Highlights />
                <Passionates />
                <Opportunities />
                <Stories />
            </React.Fragment>
        )
    }
}

export default Home