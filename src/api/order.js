import { HTTP } from './httpCommon'

export function fetchOrders () {
  return HTTP.get('/orders')
}

export function fetchOrder (id) {
  return HTTP.get(`/order/${id}`)
}

export function changeStatus ({ id, status }) {
  return HTTP.post('/changeStatus', { id, status })
}
