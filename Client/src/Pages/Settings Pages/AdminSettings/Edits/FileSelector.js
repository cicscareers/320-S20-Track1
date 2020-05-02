import React from 'react';
import {Button} from '@material-ui/core';



function buildFileSelector(){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
  }
  
  class FileDialogue extends React.Component {
    componentDidMount(){
      this.fileSelector = buildFileSelector();
    }
    
    handleFileSelect = (e) => {
      e.preventDefault();
      this.fileSelector.click();
      
      
    }
    
    render(){
      return <Button variant='contained' color='primary' size='large' onClick={this.handleFileSelect}>Select files</Button>
    }
  }

  export default FileDialogue