import React, { Component } from 'react'
import NavigationBar from '../navbar/Navbar'
import CreateMemory from '../memory/createMemory'
import ShowMemories from '../memory/showMemories'
import InfoModal from '../modal/InfoModal'
import Card from 'react-bootstrap/Card'
import ReactPlayer from 'react-player'

import './Main.css'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user:this.props.user,
            gezin: this.props.gezin,
            showPrivate: this.props.gezin === 'false' ? false : true,
            createMemory:false,
            showMemories:true,
            memories:[],
            showModal:false
        }
    }

    createMemory=()=>{
        this.setState({
            createMemory:!this.state.createMemory,
            showMemories:!this.state.showMemories,
        })
    }
    
    showPrivate=()=>{
        this.setState({
            showPrivate:true,
            createMemory:false,
            showMemories:true,
        })
    }

    showPublic=()=>{
        this.setState({
            showPrivate:false,
            createMemory:false,
            showMemories:true,
        })
    }

    setModalShow=()=>{
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    render() {
        return (
            <div className='backgroundColour'>
                <NavigationBar createMemory={this.createMemory} user={this.state.user} gezin={this.state.gezin} showPublic={this.showPublic} showPrivate={this.showPrivate} setModalShow={this.setModalShow}/>
                <InfoModal
                    show={this.state.showModal}
                    onHide={this.setModalShow}
                />
                <div className="container-fluid">
                    {!this.state.showPrivate &&
                        <Card className="mx-auto mainVid mb-5">
                            <video src="http://d13mtmfvucoiy9.cloudfront.net/PortretJacqueline.m4v" type="video/mp4" controls></video>
                        </Card>
                    }
                    {this.state.createMemory && 
                        <CreateMemory gezin={this.state.gezin}/>
                    }
                    {this.state.showMemories && 
                        <ShowMemories category={this.state.showPrivate === true ? 'private' : 'public'}/>
                    }
                </div>
            </div>
        )
    }
}
