import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import RepositoryList from './components/repository-list'
import RepositoryListStore from './stores/repositories'

class App extends Component {
  render() {
    return (
      <div>
        <RepositoryList store={RepositoryListStore} />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<AppContainer><App /></AppContainer>, document.getElementById('App'))
}

render()
if (module.hot) {
  module.hot.accept(render)
}
