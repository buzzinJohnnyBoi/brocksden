'use client'
import React, { Component } from 'react';
import Link from 'next/link'

// import { BrowserRouter, Route, Link } from "react-router-dom";
// import {Outlet} from "react-router-dom";
// import mainImg from './src/mainimg.jpg';
import './nav.css';
// import Axios from 'axios';

class Nav extends Component {
    state = {
        links: null,
        top: true,
        paddTop: "30px",
        mobileMode: this.ismobile,
        menuOpen: false,
        navMobileLeft: "-300px",
        maxWidthMobile: 850
    }
    async updateNavLinks() {
        this.setState({
            links: this.props.links
        })
    }
    ismobile = () => {
        if(window.innerWidth < this.state.maxWidthMobile) {
            return true;
        }
        else if(window.innerWidth > this.state.maxWidthMobile) {
            return false;
        }
    }
    render() { 
        if(this.state.mobileMode) {
            return (
                <React.Fragment>
                    <div className='cover' onClick={this.changeMenu}></div>
                    <div className='navMobile' style={{left: this.state.navMobileLeft}}>{this.renderLinks()}</div>
                    <header style={{paddingTop: this.state.paddTop, paddingBottom: this.state.paddTop,}}><ul> <div className='pmfTitle'>Pretty Much Flawless</div>{this.renderMenubtn()}</ul></header>
                    <div className='nav-spacer'></div>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <div className='nav-spacer'></div>
                    <header style={{paddingTop: this.state.paddTop, paddingBottom: this.state.paddTop,}}>{this.renderLinks()}</header>
                </React.Fragment>
            );
        }
    }
    renderLinks() {
        const links = (this.state.links != null) ? this.state.links.map(link => <li key={link.name}><Link href={this.getLink(link.link)} key={link.name}>{link.name}</Link></li>) : (<li>Loading</li>);
        return (
            <>
                {/* <img src={mainImg}></img> */}
                <ul>
                    {links}
                </ul>
            </>
        );  
    }
    getLink(link) {
        if(link != "") {
            return "/page/" + link;
        }
        else {
            return "/";
        }
    }
    renderMenubtn = () => {
        if(this.state.menuOpen) {
            return (
	            <div className='menubtn' onClick={this.changeMenu}>
	                <div className='lineClose' id='mbtnl1'></div>
	                <div className='lineClose' id='mbtnl2' style={{top: '20px'}}></div>
	                <div className='line2' id='mbtnl3' style={{top: '-10px', opacity: 0}}></div>
	            </div>
	        );
        }
        else {
	        return (
	            <div className='menubtn' onClick={this.changeMenu}>
	                <div className='line' id='mbtnl5'></div>
	                <div className='line' id='mbtnl4' style={{opacity: 1}}></div>
	                <div className='line2' id='mbtnl3' style={{top: '0px', opacity: 1}}></div>
	            </div>
	        );
        }
    }
    changeMenu = () => {
        if(this.state.mobileMode) {
            if(this.state.menuOpen) {
                this.setState({menuOpen: false});
                this.setState({navMobileLeft: "-300px"});
                document.querySelector(".cover").style.display = "none";
            }
            else {
                this.setState({navMobileLeft: "0px"});
                this.setState({menuOpen: true});
                document.querySelector(".cover").style.display = "block";
            }
        }
        else {
            this.setState({menuOpen: false});
            this.setState({navMobileLeft: "-300px"});
            document.querySelector(".cover").style.display = "none";
        }
    }
    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
        this.updateNavLinks();
        const mode = this.ismobile();
        this.setState({mobileMode: mode});
    }
    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }
    handleScroll = (event) => {
        let scrollTop = document.documentElement.scrollTop;
        if(scrollTop == 0 && !this.state.top) {
            this.setState({ top: true });
            this.foldDown();
        }
        else if(this.state.top && scrollTop != 0) {
            this.setState({ top: false });
            this.foldUp();
        }
    }
    handleResize = (event) => {
        if(window.innerWidth < this.state.maxWidthMobile && !this.state.mobileMode) {
            this.setState({mobileMode: true});
        }
        else if(window.innerWidth > this.state.maxWidthMobile && this.state.mobileMode) {
            this.setState({mobileMode: false});
        }
    }
    foldUp = () => {
        this.setState({paddTop: "10px"});
    }
    foldDown = () => {
        this.setState({paddTop: "30px"});
    }
}
 
// // addEventListener('scroll', Nav.onscroll);



export default Nav;