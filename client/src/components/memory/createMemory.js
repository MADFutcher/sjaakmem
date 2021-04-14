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

  colourCard=['#F47EC1','#F38FCF','#F398D6','#F3A1DD','#F2B2EB']

  textColour=['#000','#4C4F54','#E6EDF5']


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
    bttn.innerHTML = 'Opslaan...'
  
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
        bttn.innerHTML='Toevoegen'
      })
      .catch((error) => {

        
        let message;
        if(error.response.data.error.errors.title || error.response.data.error.errors.owner ){
          message = 'Check of jouw titel / naam is ingevuld'
        }else{
          message = 'Iets ging mis, probeer nog eens'
        }
        this.setState({ error: true, message, memorySaved: false });
        bttn.innerHTML='Toevoegen'
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
                      <Form.Check inline type="radio" aria-label="Private" label="Privé" name='category' value='private' onChange={this.handleOnChange}/>
                      <Form.Check inline type="radio" aria-label="Public" label="Vrienden & Familie" name='category' value='public' onChange={this.handleOnChange}/>
                  </fieldset>
                </Form.Group>
              }
              <Form.Group controlId='memoryTitle'>
                <Form.Label>Titel</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  placeholder='Titel voor jouw herinnering'
                  value={this.state.title}
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Group controlId='memoryDescription'>
                <Form.Label>Herinnering</Form.Label>
                <Form.Control
                  as='textarea'
                  name='memory'
                  placeholder='Herinneringstekst'
                  rows={3}
                  value={this.state.memory}
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.File
                  id='memory-file'
                  label='Upload foto / video'
                  name='file'
                  onChange={this.handleOnChange}
                />
              </Form.Group>

              <Form.Group controlId='memoryFrom'>
                <Form.Label>Naam</Form.Label>
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
                    <Form.Label className='text-center'>Tekst Kleur</Form.Label>
                    <ColourPicker colours={this.textColour} colourChange={this.handleTextColourChange}/>
                  </Form.Group>
                </Col>
                <Col xs="auto" md="auto" >
                  <Form.Group controlId='memoryCardColour'>
                    <Form.Label >Kaart Kleur</Form.Label>
                    <ColourPicker colours={this.colourCard} colourChange={this.handleCardColourChange}/>
                  </Form.Group>
                </Col>
                <Col xs="auto" md="auto" className="ml-md-5">
                  <Card style={{backgroundColor:this.state.cardColour}} >
                    <Card.Body>
                      <Card.Title style={{color:this.state.textColour}}>Voorbeeld Kaart</Card.Title>
                        <Card.Text style={{color:this.state.textColour}}>
                          Velit sint esse est esse consectetur aute minim elit.
                        </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Form.Row>
              <Button variant='success' onClick={this.handleSubmit} className='mt-2'>
                Toevoegen
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
