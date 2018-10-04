import React, { Component } from 'react'

export default class Repository extends Component {
  
    render() {
      return (<div className="repository">
        {this.props.full_name}
      </div>)
    }
  }