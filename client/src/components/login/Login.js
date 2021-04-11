import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import AuthService from '../services/auth-services'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            errorMsg:'',
        }
    }

    service = new AuthService()


    handleOnChange = (e) =>{
        const name = e.target.name
        const val = e.target.value

        this.setState({
            [name]:val
        })

    }

    submitLogin = (e) =>{
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        this.service.login(username, password)
            .then(response => {
                this.setState({
                    username: "",
                    password: "",
                });
                localStorage.sid = response._id 
                console.log(response)
                const loggedInUser = response.username
                const gezin = response.gezin
                localStorage.setItem("user",loggedInUser)
                localStorage.setItem("gezin",gezin)

                this.props.history.push('/memories')
            },error => this.setState({errorMsg:error.response.data.message}))

    }


    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mt-5'>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Control type="text" name="username" placeholder="Enter Username"  onChange={this.handleOnChange}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleOnChange}/>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Button variant='secondary' type="submit" onClick={this.submitLogin}>
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
                {this.state.errorMsg&&
                <div>
                    <div className='container'>
                        <Alert variant={'danger'}>
                            <h4>{this.state.errorMsg}</h4>
                        </Alert>
                    </div>
                </div>
                }
            </div>
        )
    }
}
