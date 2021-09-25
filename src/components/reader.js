import React, { Component } from 'react';
import Member from './member.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Reader extends Component {
  idArray = []
  
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      memberList: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getData()
  }
  
  async getData(){
    try {
      const res = await axios.get('/api/v1/ids');
      res.data.values.forEach(id => {
        this.idArray.push(id[0])
      })
    } catch(e) {
      console.log(e)
    }
  }
 
  handleSubmit() {
      var found = true;
      this.idArray.forEach((id, pos) => {
        if(id === this.state.id){
          found = false;
          this.setState({
            memberList: this.state.memberList.concat(<Member position={pos+1} />)
          })
        }
      })
      
      if(found){
          toast.error("Member not found", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
      }
  }
  
  handleKeypress = e => {
    if (e.code === "Enter") {
      this.handleSubmit()
    }
  }

  handleChange(event) {
    if(event.target.value.length <= 8){
      this.setState({id: event.target.value});
    } 
  }
  render() {
    return (
      <div className="reader">
        <label>
          ID Number:
          <input type="number" name="id" id="num"  value={this.state.id} onChange={this.handleChange} onKeyPress={this.handleKeypress} autoFocus /> 
        </label>

        <input type="submit" id="button" value="Submit" onClick={this.handleSubmit} />
      
        <br />
        <span className="members">
        { 
          this.state.memberList.map((component) => (
            <React.Fragment>
              {component}
            </React.Fragment>
          ))
        }
        </span>
        <ToastContainer />
      </div>
    )
  }
}
