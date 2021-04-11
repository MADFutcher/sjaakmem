import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/esm/Button'





export default class NavigationBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            gezin: this.props.gezin==='false' ? false : true,
            createMemory: false
        }
    }

    createMemory=()=>{
        this.props.createMemory()
        this.setState({createMemory:!this.state.createMemory})
    }

    showPrivate=()=>{
        this.props.showPrivate()
    }

    showPublic=()=>{
        this.props.showPublic()
    }


    render() {
        console.log(this.state)
        return (
            <Navbar bg="light" expand="lg" sticky="top" className="mb-5">
                <Navbar.Brand>Van Mama voor Tess ❤️</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {this.state.gezin &&
                            <div>
                                <Button variant="light" className='m-2' onClick={this.showPrivate}>Private</Button>
                                <Button variant="light" className='m-2' onClick={this.showPublic}>Public</Button>
                            </div>
                        }
                        <Button variant="light" onClick={this.createMemory} className='m-2'>{this.state.createMemory ? "Show Memories" : "Create Memory"}</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
