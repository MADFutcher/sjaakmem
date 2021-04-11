import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MemoryServices from '../services/memory-services';
import Alert from 'react-bootstrap/Alert';
import ColourPicker from '../colourPicker/ColourPicker'

export default class CreateMemory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gezin: this.props.gezin === 'true' ? true : false,
      title: '',
      memory: '',
      owner: '',
      file: null,
      cardColour:'',
      textColour:'',
      category: '',
      memorySaved: false,
      message: '',
      error: false,
    };
  }

  MemoryService = new MemoryServices();

  handleOnChange = (e) => {
    const target = e.target;
    const name = target.name;
    let val = '';
    if (name === 'file') {
      val = target.files[0];
    } else {
      val = target.value;
    }
    this.setState({
      [name]: val,
    });
  };


  handleCardColourChange =(colour)=>{
    this.setState({cardColour: colour})
  }

  handleTextColourChange=(colour)=>{
    this.setState({textColour: colour})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const bttn = e.target
    bttn.innerHTML = 'Saving...'
  
    const {category, title, memory, owner, file, textColour, cardColour } = this.state;
    this.MemoryService.postMemory(category, title, memory, file, owner, textColour, cardColour)
      .then((response) => {
        this.setState({
          memorySaved: true,
          message: response.data.message,
          error: false,
          title: '',
          memory: '',
          owner: '',
          textColour:'',
          cardColour:'',
          file: null,
        });
        bttn.innerHTML='Submit'
      })
      .catch((error) => {
        this.setState({ error: true, message: error.response.data.message, memorySaved: false });
        bttn.innerHTML='Submit'
      });
  };

  render() {
    return (
      <div className='container'>
        {this.state.memorySaved && (
          <div>
            <div className='container'>
              <Alert variant={'success'}>
                <h4>{this.state.message}</h4>
              </Alert>
            </div>
          </div>
        )}
        {this.state.error && (
          <div>
            <div className='container'>
              <Alert variant={'danger'}>
                <h4>{this.state.message}</h4>
              </Alert>
            </div>
          </div>
        )}
        <Card>
          <Card.Body>
            <Form>
              {this.state.gezin && 
                <Form.Group controlId='memoryCategory'>
                  <fieldset>
                      <Form.Check inline type="radio" aria-label="Public" label="Public" name='category' value='public' onChange={this.handleOnChange}/>
                      <Form.Check inline type="radio" aria-label="Private" label="Private" name='category' value='private' onChange={this.handleOnChange}/>
                  </fieldset>
                </Form.Group>
              }
              <Form.Group controlId='memoryTitle'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  placeholder='Please enter a title for your memory'
                  value={this.state.title}
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Group controlId='memoryDescription'>
                <Form.Label>Memory</Form.Label>
                <Form.Control
                  as='textarea'
                  name='memory'
                  rows={3}
                  value={this.state.memory}
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.File
                  id='memory-file'
                  label='Upload foto'
                  name='file'
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Group controlId='memoryFrom'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='owner'
                  value={this.state.owner}
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Row className="align-items-center">
                <Col xs="auto" md="auto">
                  <Form.Group controlId='memoryTextColour'>
                    <Form.Label className='text-center'>Text Colour</Form.Label>
                    <ColourPicker colourChange={this.handleTextColourChange}/>
                  </Form.Group>
                </Col>
                <Col xs="auto" md="auto" >
                  <Form.Group controlId='memoryCardColour'>
                    <Form.Label>Card Colour</Form.Label>
                    <ColourPicker colourChange={this.handleCardColourChange}/>
                  </Form.Group>
                </Col>
                <Col xs="auto" md="auto" className="ml-md-5">
                  <Card style={{backgroundColor:this.state.cardColour}} >
                    <Card.Body>
                      <Card.Title style={{color:this.state.textColour}}>Example Card</Card.Title>
                        <Card.Text style={{color:this.state.textColour}}>
                          Velit sint esse est esse consectetur aute minim elit.
                        </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Form.Row>
              <Button variant='success' onClick={this.handleSubmit} className='mt-2'>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
