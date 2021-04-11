import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
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
            email:'',
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


    
    submitSignup = (e) =>{
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const gezin = this.state.gezin;

        this.service.signup(username, password, gezin)
            .then(response => {
                this.setState({
                    username: '',
                    password: '',
                    gezin:'',
                });
                localStorage.sid = response._id
                localStorage.setItem("user",JSON.stringify({user:response.user}))
                this.props.history.push('/memories')
            },error => this.setState({errorMsg:error.response.data.message}))
    }


    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" name="username" placeholder="Enter Username"  onChange={this.handleOnChange}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleOnChange}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Gezin</Form.Label>
                                        <Form.Control type="text" name="gezin" placeholder="true / false" onChange={this.handleOnChange}/>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Button variant='secondary' type="submit" onClick={this.submitSignup}>
                                    Signup
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
