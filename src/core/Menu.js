import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const Menu = ({ history }) => (
  <div>
    <div className="row">
      <div className="col-12 d-flex">
        <ul className="nav nav-tabs navbar-expand-lg bg-dark ml-auto">
          <li className="nav-item">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/cart")}
              className="nav-link"
              to="/cart"
            >
              Cart
            </Link>
          </li>
          {isAuthenticated() &&
          isAuthenticated().user.role === 0 && ( //showing the link if he is user
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link"
                  to="/user/dashboard"
                >
                  U. Dashboard
                </Link>
              </li>
            )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                A.Dashboard
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  Sign in
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && ( //whenever we use '(' bracket...we need not have to return back
            <li className="nav-item">
              <span
                className="nav-link text-warning"
                onClick={() => {
                  signout(() => {
                    //this is a middleware..nd next() will fireup a callback
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  </div>
);
export default withRouter(Menu);
//withRouter..this gonna pick all the routes using the links from the routes.js
