import React, { Component } from 'react';
import axios from 'axios';

export default class Member extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userPos: this.props.position,
            id: 0,
            name: '',
            role: '',
            valid: '',
            signOut: true    
        }
    }

    async componentDidMount() {
        if(this.state.userPos !== 0 && this.state.userPos >= 1){
            const res = await axios.post(`/api/v1/userinfo/${this.state.userPos}`)
            this.setState({
                name: res.data.values[0][1],
                id: res.data.values[0][2],
                role: res.data.values[0][4],
                valid: res.data.values[0][5]              
            })
            await axios.post(`/api/v1/sendLog/${this.state.name}/${this.state.id}/${this.state.role}/${this.state.valid}/IN/${new Date()}`)
        }       
    }

    handleClick = async () => {
        this.setState({signOut: false})

        await axios.post(`/api/v1/sendLog/${this.state.name}/${this.state.id}/${this.state.role}/${this.state.valid}/OUT/${new Date()}`)        
    }

    render() {
        if(this.state.signOut) {
            if(this.state.userPos !== 0 && this.state.userPos >= 1){
                return (            
                    <div className="member">
                        <h2>{this.state.name}</h2>
                        <h3>{this.state.role}</h3>
                        <h4>{this.state.valid}</h4>
                        <button onClick={this.handleClick}>Exit</button>
                    </div>
                )    
            } else {
                return(
                    <div></div>
                )
            }
        } else {
            return(
                <div></div>
            )
        }
    }
}