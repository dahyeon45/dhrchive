import React, {useState} from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth";
import Search from "../routes/Search";

const AppRouter = ({isLoggedIn}) => {
    
    return(
        <Router>
            <Routes>
                {isLoggedIn ? <>
                <Route exact={true} path={"/"}
                    element={<Search />}>
                </Route>
                </> : <Route exact={true} path={"/"} element={<Auth />}> </Route>}
            </Routes>
        </Router>
    )
}

export default AppRouter;