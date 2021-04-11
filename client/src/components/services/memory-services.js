import axios from 'axios';

class MemoryServices {
    constructor() {
      let service = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true
      });
      this.service = service;
    }
  
    getMemories=(category)=>{
      return this.service.get('memories', {params: {category}})
      .then(response => response.data)
    }

    postMemory = (category, title,memory,file,owner,textColour, cardColour)=>{
        this.service.defaults.headers={'Content-Type': 'multipart/form-data'}
        const formData = new FormData();
        formData.append('File', file);
        formData.append('memory', memory)
        formData.append('title', title)
        formData.append('owner', owner)
        if(category){
          formData.append('category', category)
        }
        formData.append('cardColour', cardColour)
        formData.append('textColour', textColour)

        return this.service.post('memories', formData )
                    .then(response => response.data)
    }
  
  }
  
  export default MemoryServices;