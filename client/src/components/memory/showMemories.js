import React, { Component } from 'react'
import MemoryServices from '../services/memory-services'
import MemoryCard from '../memory/memoryCard'
import CardColumns from 'react-bootstrap/CardColumns'


export default class showMemories extends Component {
    constructor(props){
        super(props)
        this.state = {
            category: this.props.category,
            memories: []
        }

    }

    MemoryService = new MemoryServices()

    getMemories=()=>{
        this.MemoryService.getMemories(this.state.category).then(results=>{
            let memories = [...results.data]
            this.setState({memories})
        }).catch(err=>{console.log(err)})  
    }

    componentDidUpdate(prevProp){
        if(prevProp.category != this.props.category){
            this.setState({category: this.props.category}, function(){this.getMemories()})
        }
    }

    componentDidMount(){
        this.getMemories()
    }

    render() {
        return (
            <CardColumns>
                {
                    this.state.memories.map(mem=>{
                            return <MemoryCard {...mem} key={mem._id}/>
                        }
                    )
                }
            </CardColumns>
        )
    }
}
