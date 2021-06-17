import React from 'react'
import Card from 'react-bootstrap/Card'
import ReactPlayer from 'react-player'


export default function MemoryCard(props) {
    let video = '' 
    if (props.image.includes('.mp')){
        video = props.image.substr(0, 50) + 'q_auto' + props.image.substr(49)
    }
    
    if(props.image && props.memory){
        return (
            <Card className="text-center" style={{backgroundColor:`${props.cardColour}`,color:`${props.textColour}`,justifyContent: 'center'}}>
                {props.image.includes('.mp') && 
                    <ReactPlayer url={video} width='100%' height='100%' controls/>
                }
                {!props.image.includes('.mp') && 
                    <Card.Img variant="top" src={props.image} style={{objectFit:'contain', maxWidth:'100%'}} />
                }
                
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <blockquote className="blockquote mb-0 card-body">
                        <p>
                            {props.memory}
                        </p>
                        <footer>
                            <small style={{color:`${props.textColour}`}}>
                                <cite title={props.owner}>{props.owner}</cite>
                            </small>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        )
    }

    if(props.image && !props.memory && !props.title && !props.owner){
        return (
            
            <Card className="text-center" style={{backgroundColor:`${props.cardColour}`,color:`${props.textColour}`,justifyContent: 'center'}}>
                
                 {props.image.includes('.mp') && 
                    <ReactPlayer url={video} width='100%' height='100%' controls/>
                }
                {!props.image.includes('.mp') &&
                    <Card.Img variant='top' src={props.image} style={{objectFit:'contain', maxWidth:'100%'}}/>
                }
            </Card>
        )
    }
    
    if(props.image && !props.memory){
        return (
            
            <Card className="text-center" style={{backgroundColor:`${props.cardColour}`,color:`${props.textColour}`,justifyContent: 'center'}}>
                
                 {props.image.includes('.mp') && 
                    <ReactPlayer url={video} width='100%' height='100%' controls/>
                }
                {!props.image.includes('.mp') &&
                    <Card.Img variant='top' src={props.image} style={{objectFit:'contain', maxWidth:'100%'}}/>
                }
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                </Card.Body>
            </Card>
        )
    }

   

    if(!props.image && props.memory){
        return (
            <Card className="text-center" style={{backgroundColor:`${props.cardColour}`,color:`${props.textColour}`, justifyContent: 'center'}}> 
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <blockquote className="blockquote mb-0 card-body">
                        <p>
                            {props.memory}
                        </p>
                        <footer>
                            <small style={{color:`${props.textColour}`}}>
                                <cite title={props.owner}>{props.owner}</cite>
                            </small>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        )
    }
    if(!props.image && !props.memory){
        return (
            <Card className="text-center" style={{backgroundColor:`${props.cardColour}`,color:`${props.textColour}`, justifyContent: 'center'}}> 
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <blockquote className="blockquote mb-0 card-body">
                        <footer>
                            <small style={{color:`${props.textColour}`}}>
                                <cite title={props.owner}>{props.owner}</cite>
                            </small>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        )
    }
}


