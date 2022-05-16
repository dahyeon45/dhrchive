import React from "react";
import '../components/App.css';


const AUTHORIZE = "https://accounts.spotify.com/authorize";
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const redirect_uri = "http://localhost:3000";

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
      <div className = "logo-container">
        <img className = "logo" src = "https://dhphotoarchive.s3.ap-northeast-2.amazonaws.com/dhlogo.svg"></img>
      </div>
      <button className = "button_1" onClick={requestAuthorization}>Continue with Spotify</button>
    </div>
    
    </>
    
export default Auth;

