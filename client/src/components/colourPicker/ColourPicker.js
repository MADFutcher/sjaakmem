
import React, { Component } from 'react'
import {BlockPicker} from 'react-color';



export default class ColourPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: '#fff',
          };
    }

   
    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
        this.props.colourChange(color.hex);
      };


    render() {
        return (
            <BlockPicker
              color={ this.state.background }
              onChangeComplete={ this.handleChangeComplete }
              saturation={false}
            />
          );
    }
}