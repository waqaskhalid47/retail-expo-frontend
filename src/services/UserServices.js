import GenericServices from "./GenericServices";
import jwt_decode from "jwt-decode";
class userServices extends GenericServices {
  login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post("users/login", { email, password })
        .then((token) => {
          localStorage.setItem("token", token);
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });

  register = (name, email, password) =>
    new Promise((resolve, reject) => {
      this.post("users/register", { name, email, password })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

  isLoggedin = localStorage.getItem("token") ? true : false;

  logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  getLoggedinfo = () => {
    try {
      let jwt = localStorage.getItem("token");
      var decode = jwt_decode(jwt);
      return decode;
    } catch (error) {
      console.log("error");
    }
  };
  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedinfo().role === "admin") return true;
      else return false;
    } else return false;
  };
}

let UserServices = new userServices();
export default UserServices;
