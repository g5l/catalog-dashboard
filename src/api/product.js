import { HTTP } from './httpCommon'

export function fetchProducts () {
  return HTTP.get('/products')
}

export function fetchProduct (id) {
  return HTTP.get(`/product/${id}`)
}

export function createProduct ({ name, image, reference, price, companyId }) {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('image', image)
  formData.append('reference', reference)
  formData.append('price', price)
  formData.append('companyId', companyId)

  return HTTP.post('/product', formData)
}

export function editProduct ({ id, name, image, reference, price }) {
  const formData = new FormData()
  formData.append('id', id)
  formData.append('name', name)
  formData.append('image', image)
  formData.append('reference', reference)
  formData.append('price', price)

  return HTTP.put('/product', formData)
}

export function deleteProduct (id) {
  return HTTP.delete('/product', { data: { id } })
}
