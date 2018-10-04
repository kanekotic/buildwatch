import { observable, action, computed, runInAction, configure } from 'mobx'
import octokit from '@octokit/rest'

configure({ enforceActions: "observed" })

class Repositories {
  @observable 
  repositories = []
  @observable
  token

  @action
  updateToken(token){
    this.token = token
  }

  @action
  async fetchProjects(){
    let github = new octokit()
    await github.authenticate({ type: 'token', token: this.token })
    let githubRepos = await github.activity.getWatchedRepos({per_page: 100, page: 1})
    runInAction(() => {
      this.repositories = githubRepos
    })
  }
}


export default new Repositories()