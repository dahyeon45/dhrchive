import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import './App.css';

function Tracks({name, artists, preview}){
    var artistStr = "";
    {artists.map((el)=>{
        artistStr += el.name + ', ';
    })}
    artistStr = artistStr.slice(0, -2);

    return(
        <div className = "tracks">
            <h1>{name}</h1>
            <h1>{artistStr}</h1>
            <audio controls autoPlay = "" name = "media">
                <source src = {preview} type = "audio/mpeg" />
            </audio>
        </div>
    );
}

export default Tracks;