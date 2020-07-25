import React, {Component} from 'react';
import {baseUrl} from './baseUrl';
import { Button, Form, Container } from 'react-bootstrap';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            firstname:''
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }


    handleChange (event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
        this.setState({[name]:value});
           
      };

   

handleClick(event){
        alert("Current state is "+ JSON.stringify(this.state));
        this.registerUser({
            firstname: this.state.firstname,
            email: this.state.email,
        });        
        event.preventDefault();
    }

    registerUser(creds) {
        fetch(baseUrl+'profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
        })
        
        .then(response => console.log(response.json()))
        // .then(response => {
        //         if(response.errors!=null) {
        //             alert(JSON.stringify(response));
        //         }
        //         else {
        //             alert(JSON.stringify(response));
        //         }
        // })
    };




    render(){
        return (
            <div classNmae='Container'>
                <form >
                <div className="form-group">
                    <div class="form-row">
                        <div class="col">
                        <label>E-Mail:</label>
                        <input type='email' className="form-control" name='email' value={this.state.email} onChange={this.handleChange}   placeholder="Enter Your E-Mail" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div class="form-row">
                        <div class="col">
                        <label>First Name:</label>
                        <input className="form-control" name='firstname' value={this.state.firstname} onChange={this.handleChange}   placeholder="Enter Your name" />
                        </div>
                    </div>
                </div>
                    <Button variant="primary" type="submit" onClick={()=>this.handleClick()}>Submit</Button>
                </form>
            </div>
            );
        }
}

export default Details;