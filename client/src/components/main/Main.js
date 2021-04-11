import React, { Component } from 'react'
import NavigationBar from '../navbar/Navbar'
import CreateMemory from '../memory/createMemory'
import ShowMemories from '../memory/showMemories'

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
            memories:[]
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

    render() {
        console.log(this.state)
        return (
            <div>
                <NavigationBar createMemory={this.createMemory} user={this.state.user} gezin={this.state.gezin} showPublic={this.showPublic} showPrivate={this.showPrivate}/>
                <div className="container-fluid">
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
