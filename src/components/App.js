import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import './App.css';


var client_id = process.env.REACT_APP_CLIENT_ID;
var client_secret = process.env.REACT_APP_CLIENT_SECRET;
var redirect_uri = "http://localhost:3000";
var access_token = null;
var refresh_token = null;

const TOKEN = "https://accounts.spotify.com/api/token";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(onPageload);

  function handleRedirect(){
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("","",redirect_uri);
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

  async function fetchAccessToken(code){
      let body = "grant_type=authorization_code";
      body += "&code=" + code;
      body += "&redirect_uri=" + encodeURI(redirect_uri);
      body += "&client_id=" + client_id;
      body += "&client_secret=" + client_secret;
      
      await callAuthorizationApi(body).then(
          (response) => {
              response.json().then((data)=>{
                if (data.access_token != undefined) {
                  access_token = data.access_token;
                  localStorage.setItem("access_token", access_token);
                }
                if (data.refresh_token != undefined) {
                  refresh_token = data.refresh_token;
                  localStorage.setItem("refresh_token", refresh_token);
                }
                onPageload();
              })
          }
      )
  }

  async function callAuthorizationApi(body){
      const response = await window.fetch(TOKEN, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret)
          },
          credentials: 'same-origin',
          body: body
      });
      return response;
  }


  function onPageload(){
    if (window.location.search.length > 0){
      handleRedirect();
    }
    else {
      var access_token = localStorage.getItem("access_token");
      if (access_token == null) {
        setIsLoggedIn(false);
      }
      else {
        setIsLoggedIn(true);
      }
    }
  }

  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn}/>
    <footer className = "footer"> &copy; {new Date().getFullYear()}. Dahyeon Jeong. All Rights Reserved.</footer>
    </>
  );
}

export default App;




