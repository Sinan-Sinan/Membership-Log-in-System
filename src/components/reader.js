import React, { Component } from 'react';
import Member from './member.js';
import axios from 'axios';

export default class Reader extends Component {
  idArray = []
  
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      memberList: []
        
    }

  }
  async componentDidMount() {
    try {
      const res = await axios.get('http://192.168.2.10:5000/api/v1/ids');
      
      res.data.values.forEach(id => {
      this.idArray.push(id[0])
      })
    } catch (err) {

    }
  }

 
  handleSubmit = () => {
    try {
      this.idArray.forEach((id, pos) => {
        if(id === this.state.id){
          this.setState({
            memberList: this.state.memberList.concat(<Member position={pos+1}></Member>)
          })
        }
      })
    } catch (e) {
      console.log(e)
    }

  }
  
  handleKeypress = e => {
    if (e.code === "Enter") {
      this.handleSubmit()
    }
  }
  
  handleInput = (event) => {
    this.state.id = event.target.value;
  }
  
  render() {
    return (
      <div className="reader">
        { this.props.children }
        <label>
          ID Number:
          <input type="number" name="id" id="num"  onChange={this.handleInput} onKeyPress={this.handleKeypress} autoFocus /> 
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
      </div>
    )
  }
}
