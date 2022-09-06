import axios from 'axios';
//http://3.88.61.92:8080/api/v1.0
//const API_URL = "http://localhost:8080/api/v1.0/tweets/";
const API_URL = "http://3.88.61.92:8080/api/v1.0/tweets/";

class TweetService {
  getAllTweet() {
    return axios.get(API_URL + 'all');
  }

  getMyTweet(loginId) {
    return axios.get(API_URL+'user/' + loginId);
  }

  // getMyTweet(loginId) {
  //   return axios.get(API_URL+loginId);
  // }

  getTweetByUuid(uuid) {
    return axios.get(API_URL + 'byUuid/' + uuid);
  }

  getUsers() {
    return axios.get(API_URL + 'users/all');
  }

  postTweet(loginId,postdata) {
    return axios.post(API_URL +'/'+ loginId,
                                postdata, 
                                {headers: {'Content-Type': 'application/json'}
                              });
  }

  updateATweet(loginId,id,postdata){
    return axios.put(API_URL +loginId+'/update/'+id , postdata,
                                      {headers: {'Content-Type': 'application/json'}
                            });
  }

  likeATweet(loginId, id){
    return axios.put(API_URL + loginId + '/like/' +id );
  }

  replyTweet(loginId,id,postdata){
    return axios.post(API_URL +loginId+'/reply/'+id , postdata,
                                                {headers: {'Content-Type': 'application/json'}
                                                     });
  }

  deleteATweet(loginId,id){
    return axios.delete(API_URL + loginId + '/delete/' +id 
                          ).then(response => {
                            if (response.data) {
                              console.log(response.message);
                              console.log(response.data.status);
                              console.log(response.status);
                            }
                            return response;
                          });
  }
  
}
export default new TweetService();