// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import routeConfig from "./router.config";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.min.css"
import "spectre.css/dist/spectre-exp.min.css";
import "spectre.css/docs/dist/docs.min.css";
import React from "react";

function App() {
  return (
    <Router>
      <div className="docs-container off-canvas off-canvas-sidebar-show">
        <div className="docs-navbar">
          <a className="off-canvas-toggle btn btn-link btn-action" href="#sidebar">
            <i className="icon icon-menu"></i>
          </a>
        </div>
        <div className="docs-sidebar off-canvas-sidebar" id="sidebar">
          <div className="docs-brand">
            游戏列表
          </div>
          <div className="docs-nav" style={{width: "auto"}}>
            <div className="accordion-container">
              <ul className="menu menu-nav">
                {routeConfig.map((route, index) => (
                  <li key={index} className="menu-item">
                    <Link to={route.path}>{route.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <a className="off-canvas-overlay" href="#close"></a>
        <div className="off-canvas-content">
          <div className="docs-content" id="content">
            <div className="container">
              {routeConfig.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </div>
            <div className="docs-footer container grid-lg" id="copyright">
              ©{new Date().getFullYear()} by Leeyee, All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;