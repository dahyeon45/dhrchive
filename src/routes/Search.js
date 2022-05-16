import React, { useState, useEffect } from "react";
import Tracks from "components/Tracks";
import {HashRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./Home";


var access_token = "";
var refresh_token = "";
var client_id = process.env.REACT_APP_CLIENT_ID;
var client_secret = process.env.REACT_APP_CLIENT_SECRET;
const TOKEN = "https://accounts.spotify.com/api/token";
const SEARCH = "https://api.spotify.com/v1/search";




const Search = () => {

    useEffect(
        ()=> {
            access_token = localStorage.getItem("access_token");
            refresh_token = localStorage.getItem("refresh_token");
        }
    )
    
    const [searchData, setData] = useState([]);
    const onSearch = (data) => {
        setData(data);
    }

    const [mpost, setMpost] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        search(mpost);
    }
    const onChange = (event) => {
        const {
            target : {value},       
        } = event;
        setMpost(value);
    }

    async function refreshAccessToken(){

        let body = "grant_type=refresh_token";
        body += "&refresh_token=" +refresh_token;
        body += "&client_id=" +client_id;
        
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
                //window.location.reload();
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
    
    async function callApi(method, url, body){
        const response = await window.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+access_token,
            },
            credentials: 'same-origin',
            body: body
        });
        return response;
    }
    
    
    async function search(keyword){
        var searchStr = '?q='+ encodeURI(keyword) +'&type=track'
        await callApi('GET', SEARCH + searchStr, null).then(
            (response)=>(
                response.json().then((data)=>{
                    onSearch(data.tracks.items);
                })
            )
        ).catch(
            refreshAccessToken()
        )
    }


    return <div>
        <ul>
            <li>
                <Link to = "/" component={Home}>Home</Link>
            </li>
        </ul>

        <form onSubmit = {onSubmit}>
            <input value = {mpost} onChange = {onChange} type = "text" placeholder = "search for track" maxLength={120} />
            <input type = "submit" value = "search" />
        </form>
        <div>
            {searchData.map((items)=>(
                <Tracks
                    key = {items.id}
                    name = {items.name}
                    artists = {items.artists}
                    preview = {items.preview_url}
                />
            ))}
        </div>        
    </div>;//paint Home
}

export default Search;