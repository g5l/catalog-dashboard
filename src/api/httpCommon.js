import axios from 'axios'
import { LOGIN_TOKEN } from '@/constants'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3030/' : 'http://catalog-com-br.umbler.net'

const token = window.localStorage.getItem(LOGIN_TOKEN)

export const HTTP = axios.create({
  baseURL,
  headers: { [LOGIN_TOKEN]: token }
})
