import { HTTP } from './httpCommon'

export function fetchCatalogUsers () {
  return HTTP.get('/catalogUsers')
}

export function fetchCatalogUser (id) {
  return HTTP.get(`/catalogUser/${id}`)
}

export function createCatalogUser ({ image, name, lastname, email, password }) {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('lastname', lastname)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('image', image.target.files[0])

  return HTTP.post('/catalogUser', formData)
}

export function editCatalogUser ({ image, name, lastname, email, password }) {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('lastname', lastname)
  formData.append('email', email)
  formData.append('password', password)
  if (image.target) {
    formData.append('image', image.target.files[0])
  }

  return HTTP.put('/catalogUser', formData)
}

export function deleteCatalogUser (id) {
  return HTTP.delete('/CatalogUser', { data: { id } })
}