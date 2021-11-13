import { Component } from "react";
import $ from 'jquery';
import 'metismenu';
import { Link } from "react-router-dom";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
//import jQueryPart from './jQueryPart';
import Supplier from './Supplier';
import User from "./User";
import POCart from './PurchaseOrder/POCart';
import POList from "./PurchaseOrder/POList";
import GRNList from "./GRN/GRNList";
import GRNCart from "./GRN/GRNCart";
import Invoice from "./GRN/Invoice";

class Dashboard extends Component{

    componentDidMount(){
        //metis menu
        $("#side-menu").metisMenu();
    
        //Collpsed Button
        $('#vertical-menu-btn').on('click', function (event) {
            event.preventDefault();
            $('body').toggleClass('sidebar-enable');
            if ($(window).width() >= 992) {
                $('body').toggleClass('vertical-collpsed');
            } else {
                $('body').removeClass('vertical-collpsed');
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
                $(this).parent().parent().parent().parent().parent().addClass("mm-active");
            }
        });
    
        //Menu Item Scroll
        $(document).ready(function () {
            if ($("#sidebar-menu").length > 0 && $("#sidebar-menu .mm-active .active").length > 0) {
                var activeMenu = $("#sidebar-menu .mm-active .active").offset().top;
                if (activeMenu > 300) {
                    activeMenu = activeMenu - 300;
                    $(".vertical-menu .simplebar-content-wrapper").animate({ scrollTop: activeMenu }, "slow");
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
                $(this).parent().parent().parent().parent().parent().parent().addClass("active");
            }
        });
    
        //Full Screen
        $('[data-toggle="fullscreen"]').on("click", function (e) {
            e.preventDefault();
            $('body').toggleClass('fullscreen-enable');
            if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
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
        document.addEventListener('fullscreenchange', exitHandler);
        document.addEventListener("webkitfullscreenchange", exitHandler);
        document.addEventListener("mozfullscreenchange", exitHandler);
        function exitHandler() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                console.log('pressed');
                $('body').removeClass('fullscreen-enable');
            }
        }
    
        //Right Side Bar
        $('.right-bar-toggle').on('click', function (e) {
            $('body').toggleClass('right-bar-enabled');
        });
    
        $(document).on('click', 'body', function (e) {
            if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
                return;
            }
    
            $('body').removeClass('right-bar-enabled');
            return;
        });
    
        //DropDown Menu
        if (document.getElementById("topnav-menu-content")) {
            var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
            for (var i = 0, len = elements.length; i < len; i++) {
                elements[i].onclick = function (elem) {
                    if (elem.target.getAttribute("href") === "#") {
                        elem.target.parentElement.classList.toggle("active");
                        elem.target.nextElementSibling.classList.toggle("show");
                    }
                }
            }
            window.addEventListener("resize", updateMenu);
        }
        function updateMenu() {
            var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
            for (var i = 0, len = elements.length; i < len; i++) {
                if (elements[i].parentElement.getAttribute("class") === "nav-item dropdown active") {
                    elements[i].parentElement.classList.remove("active");
                    if (elements[i].nextElementSibling !== null) {
                        elements[i].nextElementSibling.classList.remove("show");
                    }
                }
            }
        }
    
        //PreLoader
        $(window).on('load', function () {
            $('#status').fadeOut();
            $('#preloader').delay(350).fadeOut('slow');
        });
    
        //Theme Settings
        if (window.sessionStorage) {
            var alreadyVisited = sessionStorage.getItem("is_visited");
            if (!alreadyVisited) {
                sessionStorage.setItem("is_visited", "light-mode-switch");
            } else {
                $(".right-bar input:checkbox").prop('checked', false);
                $("#" + alreadyVisited).prop('checked', true);
                updateThemeSetting(alreadyVisited);
            }
        }
        $("#light-mode-switch, #dark-mode-switch, #rtl-mode-switch, #dark-rtl-mode-switch").on("change", function (e) {
            updateThemeSetting(e.target.id);
        });
    
        // show password input value
        $("#password-addon").on('click', function () {
            if ($(this).siblings('input').length > 0) {
                $(this).siblings('input').attr('type') === "password" ? $(this).siblings('input').attr('type', 'input') : $(this).siblings('input').attr('type', 'password');
            }
        })
    
        function updateThemeSetting(id) {
            if ($("#light-mode-switch").prop("checked") === true && id === "light-mode-switch") {
                $("html").removeAttr("dir");
                $("#dark-mode-switch").prop("checked", false);
                $("#rtl-mode-switch").prop("checked", false);
                $("#dark-rtl-mode-switch").prop("checked", false);
                $("#bootstrap-style").attr('href', 'assets/css/bootstrap.min.css');
                $("#app-style").attr('href', 'assets/css/app.min.css');
                sessionStorage.setItem("is_visited", "light-mode-switch");
            } else if ($("#dark-mode-switch").prop("checked") === true && id === "dark-mode-switch") {
                $("html").removeAttr("dir");
                $("#light-mode-switch").prop("checked", false);
                $("#rtl-mode-switch").prop("checked", false);
                $("#dark-rtl-mode-switch").prop("checked", false);
                $("#bootstrap-style").attr('href', 'assets/css/bootstrap-dark.min.css');
                $("#app-style").attr('href', 'assets/css/app-dark.min.css');
                sessionStorage.setItem("is_visited", "dark-mode-switch");
            } else if ($("#rtl-mode-switch").prop("checked") === true && id === "rtl-mode-switch") {
                $("#light-mode-switch").prop("checked", false);
                $("#dark-mode-switch").prop("checked", false);
                $("#dark-rtl-mode-switch").prop("checked", false);
                $("#bootstrap-style").attr('href', 'assets/css/bootstrap-rtl.min.css');
                $("#app-style").attr('href', 'assets/css/app-rtl.min.css');
                $("html").attr("dir", 'rtl');
                sessionStorage.setItem("is_visited", "rtl-mode-switch");
            } else if ($("#dark-rtl-mode-switch").prop("checked") === true && id === "dark-rtl-mode-switch") {
                $("#light-mode-switch").prop("checked", false);
                $("#rtl-mode-switch").prop("checked", false);
                $("#dark-mode-switch").prop("checked", false);
                $("#bootstrap-style").attr('href', 'assets/css/bootstrap-dark-rtl.min.css');
                $("#app-style").attr('href', 'assets/css/app-dark-rtl.min.css');
                $("html").attr("dir", 'rtl');
                sessionStorage.setItem("is_visited", "dark-rtl-mode-switch");
            }
    
        }
        //Check All
        $('#checkAll').on('change', function () {
            $('.table-check .form-check-input').prop('checked', $(this).prop("checked"));
        });
        $('.table-check .form-check-input').change(function () {
            if ($('.table-check .form-check-input:checked').length === $('.table-check .form-check-input').length) {
                $('#checkAll').prop('checked', true);
            } else {
                $('#checkAll').prop('checked', false);
            }
        });
    }

    render(){
        return(
            <body data-sidebar="dark">
      
                <div id="layout-wrapper">
                <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">

                        {/* LOGO */}

                        <div className="navbar-brand-box">
                        <a href="index.html" className="logo logo-dark">
                            <span className="logo-sm">
                            <img src="assets/images/logo.svg" alt="" height={22} />
                            </span>
                            <span className="logo-lg">
                            <img src="assets/images/logo-dark.png" alt="" height={17} />
                            </span>
                        </a>
                        <a href="index.html" className="logo logo-light">
                            <span className="logo-sm">
                            <img src="assets/images/logo-light.svg" alt="" height={22} />
                            </span>
                            <span className="logo-lg">
                            <img src="assets/images/logo-light.png" alt="" height={19} />
                            </span>
                        </a>
                        </div>
                        <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
                        <i className="fa fa-fw fa-bars" />
                        </button>


                        {/* App Search*/}
                        <form className="app-search d-none d-lg-block">
                        <div className="position-relative">
                            <input type="text" className="form-control" placeholder="Search..." />
                            <span className="bx bx-search-alt" />
                        </div>
                        </form>
                    </div>


                <div className="d-flex">
                    <div className="dropdown d-inline-block d-lg-none ms-2">
                    <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="mdi mdi-magnify" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                        <form className="p-3">
                        <div className="form-group m-0">
                            <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify" /></button>
                            </div>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                    
{/*                         
                    <div className="dropdown d-inline-block">
                    <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="bx bx-bell bx-tada" />
                        <span className="badge bg-danger rounded-pill">3</span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                        <div className="p-3">
                        <div className="row align-items-center">
                            <div className="col">
                            <h6 className="m-0" key="t-notifications"> Notifications </h6>
                            </div>
                            <div className="col-auto">
                            <a href="#!" className="small" key="t-view-all"> View All</a>
                            </div>
                        </div>
                        </div>
                        <div data-simplebar style={{maxHeight: '230px'}}>
                        <a href="javascript: void(0);" className="text-reset notification-item">
                            <div className="d-flex">
                            <div className="avatar-xs me-3">
                                <span className="avatar-title bg-primary rounded-circle font-size-16">
                                <i className="bx bx-cart" />
                                </span>
                            </div>
                            <div className="flex-grow-1">
                                <h6 className="mb-1" key="t-your-order">Your order is placed</h6>
                                <div className="font-size-12 text-muted">
                                <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                <p className="mb-0"><i className="mdi mdi-clock-outline" /> <span key="t-min-ago">3 min ago</span></p>
                                </div>
                            </div>
                            </div>
                        </a>
                        <a href="javascript: void(0);" className="text-reset notification-item">
                            <div className="d-flex">
                            <img src="assets/images/users/avatar-3.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                            <div className="flex-grow-1">
                                <h6 className="mb-1">James Lemire</h6>
                                <div className="font-size-12 text-muted">
                                <p className="mb-1" key="t-simplified">It will seem like simplified English.</p>
                                <p className="mb-0"><i className="mdi mdi-clock-outline" /> <span key="t-hours-ago">1 hours ago</span></p>
                                </div>
                            </div>
                            </div>
                        </a>
                        <a href="javascript: void(0);" className="text-reset notification-item">
                            <div className="d-flex">
                            <div className="avatar-xs me-3">
                                <span className="avatar-title bg-success rounded-circle font-size-16">
                                <i className="bx bx-badge-check" />
                                </span>
                            </div>
                            <div className="flex-grow-1">
                                <h6 className="mb-1" key="t-shipped">Your item is shipped</h6>
                                <div className="font-size-12 text-muted">
                                <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                <p className="mb-0"><i className="mdi mdi-clock-outline" /> <span key="t-min-ago">3 min ago</span></p>
                                </div>
                            </div>
                            </div>
                        </a>
                        
                        </div>
                        <div className="p-2 border-top d-grid">
                        <a className="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                            <i className="mdi mdi-arrow-right-circle me-1" /> <span key="t-view-more">View More..</span> 
                        </a>
                        </div>
                    </div>
                    </div> */}

                    <div className="dropdown d-inline-block">
                        <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="rounded-circle header-profile-user" src="assets/images/users/avatar-1.jpg" alt="Header Avatar" />
                            <span className="d-none d-xl-inline-block ms-1" key="t-henry">User</span>
                            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                            {/* item*/}
                            <a className="dropdown-item" href="#"><i className="bx bx-user font-size-16 align-middle me-1" /> <span key="t-profile">Profile</span></a>
                            <a className="dropdown-item" href="#"><i className="bx bx-wallet font-size-16 align-middle me-1" /> <span key="t-my-wallet">My Wallet</span></a>
                            <a className="dropdown-item d-block" href="#"><span className="badge bg-success float-end">11</span><i className="bx bx-wrench font-size-16 align-middle me-1" /> <span key="t-settings">Settings</span></a>
                            <a className="dropdown-item" href="#"><i className="bx bx-lock-open font-size-16 align-middle me-1" /> <span key="t-lock-screen">Lock screen</span></a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item text-danger" href="#"><i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" /> <span key="t-logout">Logout</span></a>
                        </div>
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
                    <ul className="metismenu list-unstyled" id="side-menu">

                    <li>
                        <a href="javascript: void(0);" className="waves-effect">
                        <i className="bx bx-home-circle" />
                        <span key="t-dashboard">Dashboard</span>
                        </a>
                    </li>

                    <li>
                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                            <i className="bx bx-user-circle" />
                            <span key="t-supplier">Suppliers</span>
                        </a>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link key="t-supplier-list" to="/supplier">Supplier list</Link></li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                        <i className="bx bx-user" />
                        <span key="t-user">Users</span>
                        </a>
                        <ul className="sub-menu" aria-expanded="false">
                        <li><Link key="t-user-list" to="/user">User list</Link></li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                        <i className="bx bx-package" />
                        <span key="t-product">Products</span>
                        </a>
                        <ul className="sub-menu" aria-expanded="false">
                        <li><Link key="t-product-list">Product list</Link></li>
                        <li><Link key="t-category-list">Category</Link></li>
                        <li><Link key="t-brand-list">Brand</Link></li>
                        <li><Link key="t-unit-list">Unit</Link></li>
                        <li><Link key="t-location-list">Location</Link></li>
                        <li><Link key="t-record-list">Records</Link></li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                        <i className="bx bx-detail" />
                        <span key="t-purchase">Purchase</span>
                        </a>
                        <ul className="sub-menu" aria-expanded="false">
                        <li><Link key="t-purchase-list" to="/purchaseOrderList">Purchase Order</Link></li>
                        <li><Link key="t-purchase-cart-list" to="/purchaseOrderCart">Purchase Order Cart</Link></li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                        <i className="bx bx-cart" />
                        <span key="t-grn">GRN</span>
                        </a>
                        <ul className="sub-menu" aria-expanded="false">
                        <li><Link key="t-grn-list" to="/GRNList">GRN list</Link></li>
                        <li><Link key="t-grn-cart-list" to="/GRNCart">GRN Cart list</Link></li>
                        <li><Link key="t-invoice" to="/GRNinvoice">Invoices</Link></li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                        <i className="bx bx-task" />
                        <span key="t-payment">Payments</span>
                        </a>
                        <ul className="sub-menu" aria-expanded="false">
                        <li><Link key="t-payment-list">Payment list</Link></li>
                        <li><Link key="t-payment-category">Payment Category</Link></li>
                        <li><Link key="t-cheques">Cheques</Link></li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                        <i className="bx bx-chart" />
                        <span key="t-expenses">Expenses</span>
                        </a>
                        <ul className="sub-menu" aria-expanded="false">
                        <li><Link key="t-expenses-list">Expences List</Link></li>
                        <li><Link key="t-expenses-category">Expence Categoryt</Link></li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript: void(0);" className="has-arrow waves-effect">
                        <i className="bx bx-cog" />
                        <span key="t-settings">Settings</span>
                        </a>
                        <ul className="sub-menu" aria-expanded="false">
                        <li><Link key="t-term-conditionst">Terms and Conditions</Link></li>
                        </ul>
                    </li>
                    </ul>    
                </div>
        
                </div>
            </div>
            </div>

            </body>
        )

    }
}

export default Dashboard