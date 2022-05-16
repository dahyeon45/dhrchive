import React, {useState} from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth";
import Search from "../routes/Search";
import Home from "routes/Home";

const AppRouter = ({isLoggedIn}) => {
    
    return(
        <Router>
            <Routes>
                {isLoggedIn ? <>
                <Route exact={true} path={"/"}
                    element={<Home />}>
                </Route>
                </> : <Route exact={true} path={"/"} element={<Auth />}> </Route>}
            
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/search" element={<Search />}></Route>
            
            </Routes>
        </Router>
    )
}

export default AppRouter;