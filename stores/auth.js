import { observable } from 'mobx'

export default class authenticationStore {
  @observable token = ''
  @observable username = ''

  async logUserIn(username) {
    // TODO: Use our login route once it's created
    if(!username) {
      return
    }
    this.token = 'testtoken'
    this.username = username
  }
}