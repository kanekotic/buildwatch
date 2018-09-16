import React, { Component } from 'react';
import { decorate, observable, configure, action, computed } from "mobx"
import { observer } from "mobx-react"
import builds from './stores/builds'

configure({ enforceActions: "observed" })

class Store {
  @observable 
  employeesList = [
    { name: "John Doe", salary: 150 },
    { name: "Richard Roe", salary: 225 },
  ]

  @action 
  clearList() {
    this.employeesList = []
  }

  @action 
  pushEmployee(e) {
    this.employeesList.push(e)
  }

  @computed
  get totalSum() {
    let sum = 0
    this.employeesList.map(e => sum = sum + e.salary)
    return sum
  }

  get highEarnersCount() {
    return this.employeesList.filter(e => e.salary > 500).length
  }
}

const appStore = new Store()

const Row = (props) => {
  return (<tr>
    <td>{props.data.name}</td>
    <td>{props.data.salary}</td>
  </tr>)
}

@observer
class Table extends Component {
  render() {
    const { store } = this.props
    return (<div>
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>Daily salary:</td>
          </tr>
        </thead>
        <tbody>
          {store.employeesList.map((e, i) =>
            <Row
              key={i}
              data={e}
            />
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>TOTAL:</td>
            <td>{store.totalSum}</td>
          </tr>
        </tfoot>
      </table>
      <div className="fade">
        You have <u>{store.highEarnersCount} team members </u>that earn more that 500$/day.
      </div>
    </div>)
  }
}

class Controls extends Component {
  
  render() {
    return (<div className="controls">
      <button onClick={() => this.props.store.clearList()}>clear table</button>
      <button onClick={() => this.props.store.pushEmployee({ name: "pepe", salary: 200 })}>add record</button>
    </div>)
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Controls store={appStore} />
        <Table store={appStore} />
      </div>
    )
  }
}

export default App;
