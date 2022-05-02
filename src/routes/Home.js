import React, { useEffect } from "react";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
var client_id = process.env.REACT_APP_CLIENT_ID;
var client_secret = process.env.REACT_APP_CLIENT_SECRET;
var redirect_uri = "https://dahyeon45.github.io/dhrchive/";
var access_token = null;
var refresh_token = null;

const TOKEN = "https://accounts.spotify.com/api/token";


/*
function handleAuthorizationResponse(data){

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
    }
}
*/



const Home = () => {

    async function handleRedirect(){
        let code = getCode();
        await fetchAccessToken(code);
        window.history.pushState("","",redirect_uri);   
    }
    
    async function fetchAccessToken(code){
        let body = "grant_type=authorization_code";
        body += "&code=" + code;
        body += "&redirect_uri=" + encodeURI(redirect_uri);
        body += "&client_id=" + client_id;
        body += "&client_secret=" + client_secret;
        
        await callAuthorizationApi(body).then(
            (data) => {
                var dataJSON = data.json();
                console.log(dataJSON);
                if (dataJSON.access_token != undefined) {
                    access_token = dataJSON.access_token;
                    localStorage.setItem("access_token", access_token);
                }
                if (dataJSON.refresh_token != undefined) {
                    refresh_token = dataJSON.refresh_token;
                    localStorage.setItem("refresh_token", refresh_token);
                }
            }
        )
    }
    
    async function callAuthorizationApi(body){
        const result = await window.fetch(TOKEN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret)
            },
            credentials: 'same-origin',
            body: body
        });
        return result;
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



    if (window.location.search.length > 0) { 
        treatAccessToken();
    }
    else { //access token treated
        //paint!
        return <span>Home</span>;
    }

    const treatAccessToken = async () => {
        await handleRedirect();
        return <span>Home</span>;
    }
}

export default Home;