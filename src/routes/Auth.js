import React from "react";
import { createHashHistory } from "history";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
var client_id = process.env.REACT_APP_CLIENT_ID;
var client_secret = process.env.REACT_APP_CLIENT_SECRET;
var redirect_uri = "https://dahyeon45.github.io/dhrchive/";

function requestAuthorization(){
  let url = AUTHORIZE;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read user-read-playback-state";
  window.location.href = url;
}

const Auth = () => 
    <>
    <button onClick={requestAuthorization}>Login as Spotify</button>
    </>
    
export default Auth;

