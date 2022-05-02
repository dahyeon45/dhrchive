import { createHashHistory } from "history";
import React from "react";
import Home from "routes/Home";

var client_id = process.env.REACT_APP_CLIENT_ID;
var client_secret = process.env.REACT_APP_CLIENT_SECRET;
var redirect_uri = "https://dahyeon45.github.io/dhrchive/";

var access_token = null;
var refresh_token = null;

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";

function requestAuthorization(){
  let url = AUTHORIZE;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read user-read-playback-state";
  window.location.href = url;
}

export const handleRedirect = () => {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("","",redirect_uri);

    function fetchAccessToken(code){
        let body = "grant_type=authorization_code";
        body += "&code=" + code;
        body += "&redirect_uri=" + encodeURI(redirect_uri);
        body += "&client_id=" + client_id;
        body += "&client_secret=" + client_secret;
        callAuthorizationApi(body);
    }

    function callAuthorizationApi(body){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", TOKEN, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id+":"+client_secret));
        xhr.send(body);
        xhr.onload = handleAuthorizationResponse;
    }

    function getCode(){
        let code = null;
        const queryString = window.location.search;
        if (queryString.length > 0){
            const urlParams = new URLSearchParams(queryString);
            code = urlParams.get('code')
        }
        return code;
    }

    function handleAuthorizationResponse(){
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            var data = JSON.parse(this.responseText);
            if (data.access_token != undefined) {
                access_token = data.access_token;
                localStorage.setItem("access_token", access_token);
            }
            if (data.refresh_token != undefined) {
                refresh_token = data.refresh_token;
                localStorage.setItem("refresh_token", refresh_token);
            }
            <Home /> //Home으로 가야함..
        }
    }
}




const GetAuth = () => 
    <>
    <button onClick={requestAuthorization}>Login as Spotify</button>
    </>
    
export default GetAuth;