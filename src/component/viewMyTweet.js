import React, { Component } from 'react'
import TweetDataService from "../services/TweetDataService";
import "./ViewTweets.css";
import { AiFillLike ,AiOutlineFieldTime } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import {withRouter} from "react-router-dom";

class ViewMytweetComponent extends Component {

    constructor(props) {
        super(props)
        this.onChangeReply = this.onChangeReply.bind(this);

        this.state = {
            Tweet: [],
            reply: "",
            user: AuthService.getCurrentUser()
        }

        this.deleteTweet = this.deleteTweet.bind(this);

    }

    componentDidMount() {
        const {user} = this.state;
        var userId = user.userId;
        TweetDataService.getMyTweet(userId).then((res) => {
            this.setState({ Tweet: res.data });
        });
    }

    updateTweet(Tweetloginid,tweetId){
        const {user} = this.state;
        var userId = user.userId;
        if(Tweetloginid === userId){
        this.props.history.push(`/update/${tweetId}`);
        window.location.reload();
        }
        else{
            alert(" U Cannot Update Others Tweet...Press  OK and Continue Tweet..Thank You!!");
        }
    }

    likeTweet(tweetId){
        const {user} = this.state;
        var userId = user.userId;
        TweetDataService.likeATweet(userId, tweetId).then(
         () => {
           
            this.componentDidMount();
         });
        
     }

     replyTweet(tweetId) {
        const {user} = this.state;
        var userId = user.userId;
        TweetDataService.replyTweet(userId, tweetId, this.state.reply).then(
            () => {
              
                this.componentDidMount();
            });
    }

    replyViewTweet(Tweetloginid,Tweetuuid){
        this.props.history.push(`/view/${Tweetuuid}/${Tweetloginid}`);
        window.location.reload();
    
    }

    onChangeReply(e) {
        this.setState({
          reply:e.target.value
        });
      }


      deleteTweet(Tweetloginid,tweetId) {
          console.log('first');
          console.log(tweetId);
        const {user} = this.state;
        var userId = user.userId;
       
        
            console.log(Tweetloginid);
            console.log(userId);
            TweetDataService.deleteATweet(Tweetloginid, tweetId).then((res) => {
                this.setState({
                    Tweet: this.state.Tweet.filter(Tweet =>
                        Tweet.tweetId !== tweetId)
                });
            });
        
    }


    render() {
        return (
            
                <div className="row">
                    <table className = "table table-striped table-dark ">
                        <tbody className="myTweetbody">
                            {
                                this.state.Tweet.map(
                                    Tweet =>
                                        <tr key={Tweet.tweetId}>
                                            <td> @{Tweet.userId} </td>
                                            <td> {Tweet.tweet} <br></br><Button onClick={ () => this.likeTweet(Tweet.tweetId)} variant="outline-info"><AiFillLike/></Button> {Tweet.like} <br></br><AiOutlineFieldTime/> {Tweet.timestamp}</td>
                                            <td>
                                            <div>
                                                <Form>
                                                    <Input type="textbox" className="replybox" name={Tweet.tweetId} placeholder="commnet here.." onChange={this.onChangeReply} value={this.state[Tweet.tweetId] || ""}></Input>
                                                    <Button onClick={() => this.replyTweet(Tweet.tweetId)}>Reply</Button>
                                                </Form>
                                            </div>
                                            </td>
                                            <td>
                                                <button onClick={ () => this.updateTweet(Tweet.userId,Tweet.tweetId)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick= {() => this.deleteTweet(Tweet.userId,Tweet.tweetId)} className="btn btn-danger">Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={ () => this.replyViewTweet(Tweet.userId,Tweet.tweetId)} className="btn btn-info">View Replies </button>
                                        
                                            </td>
                                        </tr>    
                                )
                            }
                            
                        </tbody>
                    </table>

                </div>
        )
    }
}

export default withRouter(ViewMytweetComponent)