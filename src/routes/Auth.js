import React from "react";
import '../components/App.css';


const AUTHORIZE = "https://accounts.spotify.com/authorize";
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const redirect_uri = "https://dahyeon45.github.io/dhrchive";

function requestAuthorization(){
  let url = AUTHORIZE;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  url += "&scope=user-read-private user-read-email streaming app-remote-control";
  window.location.href = url;
}

const Auth = () => 
    <>
    <div className = "container">

      <div className = "img-container">
        <img className = "logo" src = "https://dhphotoarchive.s3.ap-northeast-2.amazonaws.com/dhlogo.svg"></img>
      </div>

      <h1 className = "m-text">2019 travel album</h1>

      <div className = "img-container">
        <img className = "main-img" src = "https://dhphotoarchive.s3.ap-northeast-2.amazonaws.com/main_cph.png"></img>
      </div>

      <h2 className = "s-text" style={{padding: "10px 0px 20px 0px"}}>Please login with your spotify account<br></br>for better experience.</h2>
      <button className = "button_1" onClick={requestAuthorization}>Continue with Spotify</button>
    </div>
    
    </>
    
export default Auth;

