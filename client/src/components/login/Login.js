import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import AuthService from '../services/auth-services'
import './Login.css'

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
                const loggedInUser = response.username
                const gezin = response.gezin
                localStorage.setItem("user",loggedInUser)
                localStorage.setItem("gezin",gezin)

                this.props.history.push('/memories')
            },error => this.setState({errorMsg:error.response.data.message}))

    }


    render() {
        return (
            <div className='container vh-100'>
                <div className='row vh-100'>
                    <div className='col-12 mt-5 align-self-center text-center'>
                        <div className='row'>
                            <div className='col-12 text-center'>
                                <h1 className='rainbow-text'>Van Mama voor Tess</h1>
                            </div>
                        </div>
                        <div className='container mt-2'>
                            <div className='row'>
                                <div className='col-sm-6 offset-sm-3'>
                                    <Form>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group controlId="formBasicUsername">
                                                    <Form.Control type="text" name="username" placeholder="Username"  onChange={this.handleOnChange}/>
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
                                    {this.state.errorMsg&&
                                        <div>
                                            <div className='container mt-5'>
                                                <Alert variant={'danger'}>
                                                    <h4>{this.state.errorMsg}</h4>
                                                </Alert>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
