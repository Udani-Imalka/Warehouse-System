import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "metismenu";

export default class Main extends Component {
  componentDidMount() {
    //metis menu
    $("#side-menu").metisMenu();

    //Collpsed Button
    $("#vertical-menu-btn").on("click", function (event) {
      event.preventDefault();
      $("body").toggleClass("sidebar-enable");
      if ($(window).width() >= 992) {
        $("body").toggleClass("vertical-collpsed");
      } else {
        $("body").removeClass("vertical-collpsed");
      }
    });

    //Show Active Menu
    $("#sidebar-menu a").each(function () {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      if (this.href === pageUrl) {
        $(this).addClass("active");
        $(this).parent().addClass("mm-active"); // add active to li of the current link
        $(this).parent().parent().addClass("mm-show");
        $(this).parent().parent().prev().addClass("mm-active"); // add active class to an anchor
        $(this).parent().parent().parent().addClass("mm-active");
        $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass("mm-active");
      }
    });

    //Menu Item Scroll
    $(document).ready(function () {
      if (
        $("#sidebar-menu").length > 0 &&
        $("#sidebar-menu .mm-active .active").length > 0
      ) {
        var activeMenu = $("#sidebar-menu .mm-active .active").offset().top;
        if (activeMenu > 300) {
          activeMenu = activeMenu - 300;
          $(".vertical-menu .simplebar-content-wrapper").animate(
            { scrollTop: activeMenu },
            "slow"
          );
        }
      }
    });

    //Hori Menu Active
    $(".navbar-nav a").each(function () {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      if (this.href === pageUrl) {
        $(this).addClass("active");
        $(this).parent().addClass("active");
        $(this).parent().parent().addClass("active");
        $(this).parent().parent().parent().addClass("active");
        $(this).parent().parent().parent().parent().addClass("active");
        $(this).parent().parent().parent().parent().parent().addClass("active");
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass("active");
      }
    });

    //Full Screen
    $('[data-toggle="fullscreen"]').on("click", function (e) {
      e.preventDefault();
      $("body").toggleClass("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    });
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    function exitHandler() {
      if (
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        console.log("pressed");
        $("body").removeClass("fullscreen-enable");
      }
    }

    //Right Side Bar
    $(".right-bar-toggle").on("click", function (e) {
      $("body").toggleClass("right-bar-enabled");
    });

    $(document).on("click", "body", function (e) {
      if ($(e.target).closest(".right-bar-toggle, .right-bar").length > 0) {
        return;
      }

      $("body").removeClass("right-bar-enabled");
      return;
    });

    //DropDown Menu
    if (document.getElementById("topnav-menu-content")) {
      var elements = document
        .getElementById("topnav-menu-content")
        .getElementsByTagName("a");
      for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function (elem) {
          if (elem.target.getAttribute("href") === "#") {
            elem.target.parentElement.classList.toggle("active");
            elem.target.nextElementSibling.classList.toggle("show");
          }
        };
      }
      window.addEventListener("resize", updateMenu);
    }
    function updateMenu() {
      var elements = document
        .getElementById("topnav-menu-content")
        .getElementsByTagName("a");
      for (var i = 0, len = elements.length; i < len; i++) {
        if (
          elements[i].parentElement.getAttribute("class") ===
          "nav-item dropdown active"
        ) {
          elements[i].parentElement.classList.remove("active");
          if (elements[i].nextElementSibling !== null) {
            elements[i].nextElementSibling.classList.remove("show");
          }
        }
      }
    }

    //PreLoader
    $(window).on("load", function () {
      $("#status").fadeOut();
      $("#preloader").delay(350).fadeOut("slow");
    });

    //Theme Settings
    if (window.sessionStorage) {
      var alreadyVisited = sessionStorage.getItem("is_visited");
      if (!alreadyVisited) {
        sessionStorage.setItem("is_visited", "light-mode-switch");
      } else {
        $(".right-bar input:checkbox").prop("checked", false);
        $("#" + alreadyVisited).prop("checked", true);
        updateThemeSetting(alreadyVisited);
      }
    }
    $(
      "#light-mode-switch, #dark-mode-switch, #rtl-mode-switch, #dark-rtl-mode-switch"
    ).on("change", function (e) {
      updateThemeSetting(e.target.id);
    });

    // show password input value
    $("#password-addon").on("click", function () {
      if ($(this).siblings("input").length > 0) {
        $(this).siblings("input").attr("type") === "password"
          ? $(this).siblings("input").attr("type", "input")
          : $(this).siblings("input").attr("type", "password");
      }
    });

    function updateThemeSetting(id) {
      if (
        $("#light-mode-switch").prop("checked") === true &&
        id === "light-mode-switch"
      ) {
        $("html").removeAttr("dir");
        $("#dark-mode-switch").prop("checked", false);
        $("#rtl-mode-switch").prop("checked", false);
        $("#dark-rtl-mode-switch").prop("checked", false);
        $("#bootstrap-style").attr("href", "assets/css/bootstrap.min.css");
        $("#app-style").attr("href", "assets/css/app.min.css");
        sessionStorage.setItem("is_visited", "light-mode-switch");
      } else if (
        $("#dark-mode-switch").prop("checked") === true &&
        id === "dark-mode-switch"
      ) {
        $("html").removeAttr("dir");
        $("#light-mode-switch").prop("checked", false);
        $("#rtl-mode-switch").prop("checked", false);
        $("#dark-rtl-mode-switch").prop("checked", false);
        $("#bootstrap-style").attr("href", "assets/css/bootstrap-dark.min.css");
        $("#app-style").attr("href", "assets/css/app-dark.min.css");
        sessionStorage.setItem("is_visited", "dark-mode-switch");
      } else if (
        $("#rtl-mode-switch").prop("checked") === true &&
        id === "rtl-mode-switch"
      ) {
        $("#light-mode-switch").prop("checked", false);
        $("#dark-mode-switch").prop("checked", false);
        $("#dark-rtl-mode-switch").prop("checked", false);
        $("#bootstrap-style").attr("href", "assets/css/bootstrap-rtl.min.css");
        $("#app-style").attr("href", "assets/css/app-rtl.min.css");
        $("html").attr("dir", "rtl");
        sessionStorage.setItem("is_visited", "rtl-mode-switch");
      } else if (
        $("#dark-rtl-mode-switch").prop("checked") === true &&
        id === "dark-rtl-mode-switch"
      ) {
        $("#light-mode-switch").prop("checked", false);
        $("#rtl-mode-switch").prop("checked", false);
        $("#dark-mode-switch").prop("checked", false);
        $("#bootstrap-style").attr(
          "href",
          "assets/css/bootstrap-dark-rtl.min.css"
        );
        $("#app-style").attr("href", "assets/css/app-dark-rtl.min.css");
        $("html").attr("dir", "rtl");
        sessionStorage.setItem("is_visited", "dark-rtl-mode-switch");
      }
    }
    //Check All
    $("#checkAll").on("change", function () {
      $(".table-check .form-check-input").prop(
        "checked",
        $(this).prop("checked")
      );
    });
    $(".table-check .form-check-input").change(function () {
      if (
        $(".table-check .form-check-input:checked").length ===
        $(".table-check .form-check-input").length
      ) {
        $("#checkAll").prop("checked", true);
      } else {
        $("#checkAll").prop("checked", false);
      }
    });
  }

  render() {
    return (
      <div id="layout-wrapper">
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              {/* LOGO */}
              <div className="navbar-brand-box">
                <a href="index.html" className="logo logo-dark">
                  <span className="logo-lg">
                    <img src="assets/images/logo-dark.svg" alt="" height={22} />
                  </span>
                  <span className="logo-lg">
                    <img src="assets/images/logo-dark.png" alt="" height={17} />
                  </span>
                </a>
                <a href="index.html" className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src="assets/images/logo-light.svg"
                      alt=""
                      height={22}
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="assets/images/logo-light.png"
                      alt=""
                      height={19}
                    />
                  </span>
                </a>
              </div>
              <button
                type="button"
                className="btn btn-sm px-3 font-size-16 header-item waves-effect"
                id="vertical-menu-btn"
              >
                <i className="fa fa-fw fa-bars" />
              </button>
              {/* App Search*/}
              <form className="app-search d-none d-lg-block">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <span className="bx bx-search-alt" />
                </div>
              </form>
            </div>
            <div className="d-flex">
              <div className="dropdown d-inline-block d-lg-none ms-2">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  id="page-header-search-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-magnify" />
                </button>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-search-dropdown"
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="submit">
                            <i className="mdi mdi-magnify" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="dropdown d-none d-lg-inline-block ms-1">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  data-toggle="fullscreen"
                >
                  <i className="bx bx-fullscreen" />
                </button>
              </div>
              <div className="dropdown d-inline-block">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-bell bx-tada" />
                  <span className="badge bg-danger rounded-pill"></span>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="p-3">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0" key="t-notifications">
                          {" "}
                          Notifications{" "}
                        </h6>
                      </div>
                      <div className="col-auto">
                        <a href="#!" className="small" key="t-view-all">
                          {" "}
                          View All
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 border-top d-grid">
                    <a
                      className="btn btn-sm btn-link font-size-14 text-center"
                      href="/#"
                    >
                      <i className="mdi mdi-arrow-right-circle me-1" />{" "}
                      <span key="t-view-more">View More..</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="dropdown d-inline-block">
                <button
                  type="button"
                  className="btn header-item waves-effect"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="rounded-circle header-profile-user"
                    src="assets/images/users/avatar-1.jpg"
                    alt="Header Avatar"
                  />
                  <span className="d-none d-xl-inline-block ms-1" key="t-henry">
                    Henry
                  </span>
                  <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  {/* item*/}
                  <a className="dropdown-item" href="/#">
                    <i className="bx bx-user font-size-16 align-middle me-1" />{" "}
                    <span key="t-profile">Profile</span>
                  </a>
                  <a className="dropdown-item" href="/#">
                    <i className="bx bx-wallet font-size-16 align-middle me-1" />{" "}
                    <span key="t-my-wallet">My Wallet</span>
                  </a>
                  <a className="dropdown-item d-block" href="/#">
                    <span className="badge bg-success float-end">11</span>
                    <i className="bx bx-wrench font-size-16 align-middle me-1" />{" "}
                    <span key="t-settings">Settings</span>
                  </a>
                  <a className="dropdown-item" href="/#">
                    <i className="bx bx-lock-open font-size-16 align-middle me-1" />{" "}
                    <span key="t-lock-screen">Lock screen</span>
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item text-danger" href="/#">
                    <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />{" "}
                    <span key="t-logout">Logout</span>
                  </a>
                </div>
              </div>
              <div className="dropdown d-inline-block">
                <button
                  type="button"
                  className="btn header-item noti-icon right-bar-toggle waves-effect"
                >
                  <i className="bx bx-cog bx-spin" />
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* ========== Left Sidebar Start ========== */}
        <div className="vertical-menu">
          <div data-simplebar className="h-100">
            {/*- Sidemenu */}
            <div id="sidebar-menu">
              {/* Left Menu Start */}
              <ul
                className="metismenu list-unstyled"
                id="side-menu"
                role="menubar"
              >
                <li className="menu-title" key="t-menu">
                  Menu
                </li>
                <li role="menuitem" aria-haspopup="true">
                  <a href="/#" className="waves-effect">
                    <i className="bx bx-home-circle" />
                    <span className="badge rounded-pill bg-info float-end">
                      04
                    </span>
                    <span key="t-dashboards">Dashboards</span>
                  </a>
                  <ul className="sub-menu" role="menu">
                    <li>
                      <Link key="t-default" role="menuitem" to="/">
                        Default
                      </Link>
                    </li>
                    <li>
                      <a
                        href="dashboard-saas.html"
                        key="t-saas"
                        role="menuitem"
                      >
                        Saas
                      </a>
                    </li>
                    <li>
                      <a
                        href="dashboard-crypto.html"
                        key="t-crypto"
                        role="menuitem"
                      >
                        Crypto
                      </a>
                    </li>
                    <li>
                      <a
                        href="dashboard-blog.html"
                        key="t-blog"
                        role="menuitem"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </li>
                <li role="menuitem" aria-haspopup="true">
                  <a href="/#" className="has-arrow waves-effect">
                    <i className="bx bx-layout" />
                    <span key="t-layouts">Layouts</span>
                  </a>
                  <ul className="sub-menu" role="menu">
                    <li>
                      <a
                        href="/#"
                        className="has-arrow"
                        key="t-vertical"
                        role="menuitem"
                      >
                        Vertical
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a
                            href="layouts-light-sidebar.html"
                            key="t-light-sidebar"
                            role="menuitem"
                          >
                            Light Sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-compact-sidebar.html"
                            key="t-compact-sidebar"
                            role="menuitem"
                          >
                            Compact Sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-icon-sidebar.html"
                            key="t-icon-sidebar"
                            role="menuitem"
                          >
                            Icon Sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-boxed.html"
                            key="t-boxed-width"
                            role="menuitem"
                          >
                            Boxed Width
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-preloader.html"
                            key="t-preloader"
                            role="menuitem"
                          >
                            Preloader
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-colored-sidebar.html"
                            key="t-colored-sidebar"
                            role="menuitem"
                          >
                            Colored Sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-scrollable.html"
                            key="t-scrollable"
                            role="menuitem"
                          >
                            Scrollable
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li role="menuitem" aria-haspopup="true">
                      <a href="/#" className="has-arrow" key="t-horizontal">
                        Horizontal
                      </a>
                      <ul className="sub-menu" role="menu">
                        <li>
                          <a
                            href="layouts-horizontal.html"
                            key="t-horizontal"
                            role="menuitem"
                          >
                            Horizontal
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-hori-topbar-light.html"
                            key="t-topbar-light"
                            role="menuitem"
                          >
                            Topbar light
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-hori-boxed-width.html"
                            key="t-boxed-width"
                            role="menuitem"
                          >
                            Boxed width
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-hori-preloader.html"
                            key="t-preloader"
                            role="menuitem"
                          >
                            Preloader
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-hori-colored-header.html"
                            key="t-colored-topbar"
                            role="menuitem"
                          >
                            Colored Header
                          </a>
                        </li>
                        <li>
                          <a
                            href="layouts-hori-scrollable.html"
                            key="t-scrollable"
                            role="menuitem"
                          >
                            Scrollable
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li role="menuitem" aria-haspopup="true">
                  <a href="/#" className="has-arrow waves-effect">
                    <i className="bx bx-user-circle" />
                    <span key="t-ecommerce">Suppliers</span>
                  </a>
                  <ul className="sub-menu" role="menu">
                    <li>
                      <Link key="t-p-grid" role="menuitem" to="/supplier">
                        Supplier List
                      </Link>
                    </li>
                  </ul>
                </li>
                <li role="menuitem" aria-haspopup="true">
                  <a href="/#" className="has-arrow waves-effect">
                    <i className="bx bx-user" />
                    <span key="t-contacts">Users</span>
                  </a>
                  <ul className="sub-menu" role="menu">
                    <li>
                      <Link key="t-p-grid" role="menuitem" to="/user">
                        User List
                      </Link>
                    </li>
                  </ul>
                </li>
                <li role="menuitem" aria-haspopup="true">
                  <a href="/#" className="has-arrow waves-effect">
                    <i className="bx bx-package" />
                    <span key="t-projects">Product</span>
                  </a>
                  <ul className="sub-menu" role="menu">
                    <li>
                      <Link key="t-p-grid" role="menuitem" to="/productList">
                        Product List
                      </Link>
                    </li>
                    <li>
                      <Link key="t-p-grid" role="menuitem" to="/productVariation">
                        Product Variation
                      </Link>
                    </li>
                    <li>
                      <Link key="t-p-grid" role="menuitem" to="/category">
                        Category
                      </Link>
                    </li>
                    <li>
                      <Link key="t-p-grid" role="menuitem" to="/brand">
                        Brand
                      </Link>
                    </li>
                    <li>
                      <Link key="t-p-grid" role="menuitem" to="/recode">
                        Recode
                      </Link>
                    </li>
                    <li>
                      <Link key="t-p-grid" role="menuitem" to="/unit">
                        Unit
                      </Link>
                    </li>
                    <li>
                      <Link key="t-p-grid" role="menuitem" to="/storelocation">
                        Store Location
                      </Link>
                    </li>
                  </ul>
                </li>
                <li role="menuitem" aria-haspopup="true">
                  <a href="/#" className="has-arrow waves-effect">
                    <i className="bx bx-detail" />
                    <span key="t-blog">Purchase</span>
                  </a>
                  <ul className="sub-menu" role="menu">
                    <li>
                      <Link key="t-blog-list" role="menuitem" to="/purchase">
                        Purchase Order
                      </Link>
                    </li>
                  </ul>
                </li>
                <li role="menuitem" aria-haspopup="true">
                  <a href="/#" className="has-arrow waves-effect">
                    <i className="bx bx-cart" />
                    <span key="t-crypto">GRN</span>
                  </a>
                  <ul className="sub-menu" role="menu">
                    <li>
                      <Link key="t-wallet" role="menuitem" to="/grnList">
                        GRN List
                      </Link>
                    </li>
                    <li>
                      <Link key="t-buy" role="menuitem" to="/grnCart">
                        GRN cart list
                      </Link>
                    </li>
                    <li>
                      <Link key="t-exchange" role="menuitem" to="/innvoice">
                        Innvoice
                      </Link>
                    </li>
                  </ul>
                </li>

                <li role="menuitem" aria-haspopup="true">
                  <a href="/#" className="has-arrow waves-effect">
                    <i className="bx bx-task" />
                    <span key="t-tasks">Payments</span>
                  </a>
                  <ul className="sub-menu" role="menu">
                    <li>
                      <Link key="t-task-list" role="menuitem" to="paymentList">
                        Payment List
                      </Link>
                    </li>
                    <li>
                      <Link key="t-task-list" role="menuitem" to="paymentType">
                        Payment Type
                      </Link>
                    </li>
                    <li>
                      <Link key="t-task-list" role="menuitem" to="paymentMethod">
                        Payment Method
                      </Link>
                    </li>
                    <li>
                      <Link key="t-task-list" role="menuitem" to="cheque">
                        Cheque
                      </Link>
                    </li>
                  </ul>
                </li>

                <li role="menuitem" aria-haspopup="true">
                  <a href="/#" className="has-arrow waves-effect">
                    <i className="bx bx-dollar-circle" />
                    <span key="t-invoices">Expenses</span>
                  </a>
                  <ul className="sub-menu" role="menu">
                    <li>
                      <Link key="t-invoice-list" role="menuitem" to="/expenses">
                        Expenses List
                      </Link>
                    </li>
                    <li>
                      <Link
                        key="t-invoice-list"
                        role="menuitem"
                        to="/expensetype"
                      >
                        Expenses Type
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* Sidebar */}
          </div>
        </div>
        {/* Left Sidebar End */}

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">© Skote.</div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Design &amp; Develop by Themesbrand
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className="right-bar">
          <div data-simplebar className="h-100">
            <div className="rightbar-title d-flex align-items-center px-3 py-4">
              <h5 className="m-0 me-2">Settings</h5>
              <a href="/#" className="right-bar-toggle ms-auto">
                <i className="mdi mdi-close noti-icon" />
              </a>
            </div>
            {/* Settings */}
            <hr className="mt-0" />
            <h6 className="text-center mb-0">Choose Layouts</h6>
            <div className="p-4">
              <div className="mb-2">
                <img
                  src="assets/images/layouts/layout-1.jpg"
                  className="img-thumbnail"
                  alt="layout images"
                />
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input theme-choice"
                  type="checkbox"
                  id="light-mode-switch"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="light-mode-switch">
                  Light Mode
                </label>
              </div>
              <div className="mb-2">
                <img
                  src="assets/images/layouts/layout-2.jpg"
                  className="img-thumbnail"
                  alt="layout images"
                />
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input theme-choice"
                  type="checkbox"
                  id="dark-mode-switch"
                />
                <label className="form-check-label" htmlFor="dark-mode-switch">
                  Dark Mode
                </label>
              </div>
              <div className="mb-2">
                <img
                  src="assets/images/layouts/layout-3.jpg"
                  className="img-thumbnail"
                  alt="layout images"
                />
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input theme-choice"
                  type="checkbox"
                  id="rtl-mode-switch"
                />
                <label className="form-check-label" htmlFor="rtl-mode-switch">
                  RTL Mode
                </label>
              </div>
              <div className="mb-2">
                <img
                  src="assets/images/layouts/layout-4.jpg"
                  className="img-thumbnail"
                  alt="layout images"
                />
              </div>
              <div className="form-check form-switch mb-5">
                <input
                  className="form-check-input theme-choice"
                  type="checkbox"
                  id="dark-rtl-mode-switch"
                />
                <label
                  className="form-check-label"
                  htmlFor="dark-rtl-mode-switch"
                >
                  Dark RTL Mode
                </label>
              </div>
            </div>
          </div>{" "}
          {/* end slimscroll-menu*/}
        </div>
        {/* /Right-bar */}
      </div>
    );
  }
}
