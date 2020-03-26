import React from "react";
import { Registration } from "./Registration";
import { HashRouter, Route } from "react-router-dom";
import { Login } from "./login";
import { ResetPassword } from "./Reset";

export function Welcome() {
    return (
        <div id="welcome-container">
            <img src="/piano.png" id="piano" />
            <div className="concerthubWelcome">welcome to ConcertHub!</div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
