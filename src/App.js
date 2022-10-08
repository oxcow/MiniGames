import { NavLink, Outlet } from "react-router-dom";
import { routeConfig } from "./router.config";
import './App.scss';
import React from "react";

function App() {
  return (
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
        <div className="docs-nav">
          <div className="accordion-container">
            <ul className="menu menu-nav">
              {routeConfig.map((route, index) => (
                <li key={index} className="menu-item">
                  <NavLink to={route.path} className={({ isActive }) =>
                      isActive ? "active" : ""
                    }>{route.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/*<a className="off-canvas-overlay" href="#close"/>*/}
      <div className="off-canvas-content">
        <div className="docs-content" id="content">
          <div className="container">
            <Outlet />
          </div>
          <div className="docs-footer container grid-lg" id="copyright">
            ©{new Date().getFullYear()} by Leeyee, All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;