import Link from 'next/link'
import React from 'react'
import { Container, Row, Col, Button, Jumbotron, ListGroup, ListGroupItem } from 'reactstrap'
import Page from '../components/page'
import Layout from '../components/layout'
import StockChart from './stock-chart/index'

export default class extends Page {
  render() {
    return (
      <Layout {...this.props} navmenu={false} container={false}>
      <StockChart/>
      </Layout>
    )
  }
}