import React, { Component } from 'react'
import Repository from './repository'
import { observer } from "mobx-react"

@observer
export default class RepositoryList extends Component {
    render() {
        const { store } = this.props
        return (<div className="repositoryList">
            {
                store.repositories.map((repository, index) =>
                    <Repository key={`repo_${index}`} {...repository}/>
                )
            }
        </div>)
    }
  }
