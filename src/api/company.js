import { HTTP } from './httpCommon'

export function fetchMyCompany () {
  return HTTP.get('/myCompany/')
}