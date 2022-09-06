import React , { Component }  from "react";
import "./profileimg.css";
import Card from 'react-bootstrap/Card';
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: AuthService.getCurrentUser()
      };
    }

    render(){
      const {user} = this.state;
      
       return(
           <div className="profile">
           
           </div>
       );
 
 }
}