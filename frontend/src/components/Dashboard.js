import React, { Component } from "react";
import Main from "./Main";

export default class Unit extends Component {
  render() {
    return (
      <body data-sidebar="dark">
        <Main />

        <div class="main-content">
          <div class="page-content">
            <div class="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">Dashboard</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="/#">Dashboards</a>
                        </li>
                        <li className="breadcrumb-item active">Dashboard</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
