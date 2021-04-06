import { HTTP } from './httpCommon'

export function login (email, password) {
  return HTTP.post('/login', { email, password })
}

export function me () {
  return HTTP.get('/me')
}