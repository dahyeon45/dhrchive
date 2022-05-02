import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import firebase from "myBase";

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(onPageload);

  function onPageload(){
    if (window.location.search.length > 0){
      setIsLoggedIn(true);
    }
    else {
      var access_token = localStorage.getItem("access_token");
      if (access_token == null) {
        console.log("No access token");
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
    <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;




