import { observable, action, computed } from 'mobx'

class RepositoryList {
  @observable 
  repositoryList = [{
    name:"awesome repo 1"
  },{
    name:"awesome repo 2"
  }]
}


export default new RepositoryList()