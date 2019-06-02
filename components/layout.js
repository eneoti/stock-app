import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {
    Container, Row, Col, Nav, NavItem, Button, Form, NavLink, Collapse,
    Navbar, NavbarToggler, NavbarBrand, Modal, ModalHeader, ModalBody,
    ModalFooter, ListGroup, ListGroupItem
} from 'reactstrap'
import Signin from './signin'
import { NextAuth } from 'next-auth/client'
import Cookies from 'universal-cookie'
import Package from '../package'
import Styles from '../css/index.scss'

export default class extends React.Component {

    static propTypes() {
        return {
            session: React.PropTypes.object.isRequired,
            providers: React.PropTypes.object.isRequired,
            children: React.PropTypes.object.isRequired,
            fluid: React.PropTypes.boolean,
            navmenu: React.PropTypes.boolean,
            signinBtn: React.PropTypes.boolean
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            navOpen: false,
            modal: false,
            providers: null
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    async toggleModal(e) {
        if (e) e.preventDefault()

        // Save current URL so user is redirected back here after signing in
        if (this.state.modal !== true) {
            const cookies = new Cookies()
            cookies.set('redirect_url', window.location.pathname, { path: '/' })
        }

        this.setState({
            providers: this.state.providers || await NextAuth.providers(),
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <React.Fragment>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>{this.props.title || 'Stock app'}</title>
                    <style dangerouslySetInnerHTML={{ __html: Styles }} />
                    <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
                </Head>
                <MainBody navmenu={this.props.navmenu} fluid={this.props.fluid} container={this.props.container}>
                    {this.props.children}
                </MainBody>
            </React.Fragment>
        )
    }
}

export class MainBody extends React.Component {
    render() {
        return (
            <Container fluid={this.props.fluid} style={{ marginTop: '1em' }}>
                {this.props.children}
            </Container>)
    }
}
