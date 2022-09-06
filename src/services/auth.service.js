import axios from "axios";

//const API_URL = "http://localhost:8080/api/v1.0/tweets/";
const API_URL = "http://3.88.61.92:8080/api/v1.0/tweets/";

class AuthService {
  login(emailID, password) {
    return axios
      .post(API_URL + "login", {
        emailID,
        password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data);
       
        return response.data;
      });
  }
  
  register(firstName, lastName, loginId, password, confirmPassword ,emailId ,contactNo, resetAns) {
    return axios.post(API_URL + "register", {
      firstName, 
      lastName,
      loginId,
      password,
      confirmPassword,
      emailId,
      contactNo, 
      resetAns
    });
  }

  forgot(loginId,resetAns,newPass){
    return axios.post(API_URL+loginId+"/forgot", {
      resetAns,
      newPass
     });
  }

  getCurrentUser() {
    return(JSON.parse(localStorage.getItem('user')));

  }

  logout() {
    localStorage.removeItem("user");
  }

}
export default new AuthService();