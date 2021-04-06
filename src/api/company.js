import { HTTP } from './httpCommon'

export function fetchMyCompany () {
  return HTTP.get('/myCompany/')
}

export function fetchCompanySlug (slug) {
  return HTTP.get(`/company/${slug}/`)
}

export function editCompany ({id, name, profile}) {
  const formData = new FormData()
  formData.append('id', id)
  formData.append('name', name)
  formData.append('primaryColor', profile.primaryColor)
  formData.append('secondColor', profile.secondColor)
  // if (profile.logo && profile.logo.target) {
  //   formData.append('image', profile.logo.target.files[0])
  // }

  if (profile.background && profile.background.target) {
    formData.append('image', profile.background.target.files[0])
  }

  return HTTP.put('/company/', formData)
}