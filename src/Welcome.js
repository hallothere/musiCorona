import React from "react";
import { Registration } from "./Registration";
import { HashRouter, Route } from "react-router-dom";
import { Login } from "./login";
import { ResetPassword } from "./Reset";

export function Welcome() {
    return (
        <div>
            <h1>welcome to my social network!</h1>
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
