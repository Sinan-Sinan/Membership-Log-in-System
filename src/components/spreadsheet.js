import React, { Component } from 'react';
import axios from 'axios';

export default class Spreadsheet extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            readSpreadsheetUrl: '',
            writeSpreadsheetUrl: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.parseUrl = this.parseUrl.bind(this);
    }

    async handleSubmit(){
        var readSpreadsheetId = this.parseUrl(this.state.readSpreadsheetUrl)
        var writeSpreadsheetId = this.parseUrl(this.state.writeSpreadsheetUrl)
        
       
        if(this.state.readSpreadsheetUrl.length > 39) {
            await axios.post(`/api/v1/read-spreadsheet/${readSpreadsheetId}`)
        }

        if(this.state.writeSpreadsheetUrl.length > 39) {
            await axios.post(`/api/v1/write-spreadsheet/${writeSpreadsheetId}`)
        }
         
    }
        

    parseUrl(url){
        var resourceUrl = url;

        var matches = /\/([\w-_]{15,})\/(.*?gid=(\d+))?/.exec(resourceUrl);

        if (matches) {
            resourceUrl = matches[1];
        }

        return resourceUrl;
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Spreadsheet Link To Get Member Data From:
                        <input type="text" name="readSpreadsheetUrl" id="num" value={this.state.readSpreadsheetUrl} onChange={this.handleChange}  /> 
                    </label>
                    <label>
                    Spreadsheet Link To Log Member Activity:
                        <input type="text" name="writeSpreadsheetUrl" id="num" value={this.state.writeSpreadsheetUrl} onChange={this.handleChange}  /> 
                    </label>
                    <br />
                    <input type="submit" id="button" value="Submit" />
                </form>
            </div>
        )
    }
}