import { observable } from 'mobx'
import axios from 'axios'

export default class AuthStore {
  @observable token = ''
  @observable user = {}

  getUserData(username) {
    return new Promise ((resolve, reject) => {
      if (!this.token) {
        // Requires user to be signed in
        return reject('Error getting user data: you must be logged in to do that!')
      }
      const requestOptions = {
        method: 'GET',
        url: 'https://tangled.michaelbeaver.info/users/' + username,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        json: true
      }
      axios(requestOptions).then((response) => {
        this.user = response.data.user
        return resolve()
      }).catch((err) => {
        return reject('Error getting user data: ', err.message)
      })
    })
  }

  logUserIn(username, password) {
    return new Promise ((resolve, reject) => {
      axios.post('https://tangled.michaelbeaver.info/login',
        {
          username: username,
          password: password
        }
      ).then((response) => {
        this.token = response.data.token
        this.getUserData(username).then(() => {
          return resolve()
        }).catch((err) => {
          return reject(err)
        })
      }).catch((err) => {
        // TODO: Error handling
        console.log("Axios Error - Auth Store")
        return reject(err.message)
      })
    })
  }
}