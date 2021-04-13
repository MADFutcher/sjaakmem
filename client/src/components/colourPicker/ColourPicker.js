
import React, { Component } from 'react'
import {BlockPicker} from 'react-color';



export default class ColourPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: '#fff',
            colours:this.props.colours
          };
    }

   
    handleChangeComplete = (color) => {
        console.log(color)
        this.setState({ background: color.hex });
        this.props.colourChange(color.hex);
      };


    render() {
      console.log(this.state.colours)
        return (
            <BlockPicker
              colors = {this.state.colours}
              color={ this.state.background }
              onChange={ this.handleChangeComplete }
              saturation={false}
            />
          );
    }
}