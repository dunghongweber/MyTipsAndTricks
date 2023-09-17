import axios from 'axios'
import cache from '@/utils/cache'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_URL

const failureFunction = (error) => {
  const status = error.response ? error.response.status : 500
  const errorCode = error.response ? error.response.data : 'error'

  if (error.response && error.response.data && error.response.data.allAnswers) {
    const responseData = {
      errorCode: error.response.data.error,
      updatedData: {
        answers: error.response.data.allAnswers
      }
    }

    return Promise.reject({ status, ...responseData })
  }

  if (errorCode && errorCode.name === 'TokenExpiredError') {
    window.dispatchEvent(
      new CustomEvent('forceTasterOut', {
        detail: { error: 'token.expired' }
      })
    )
  }

  if (errorCode === 'user.deleted') {
    window.dispatchEvent(
      new CustomEvent('forceTasterOut', {
        detail: { error: 'user.deleted' }
      })
    )
  }

  return Promise.reject({ status, errorCode })
}

export const GET = (url, options = {}) => {
  const headers = {}

  if (options.useAuthorization) {
    const token = cache.getItem('flavorwiki-payment-token')
    headers['Authorization'] = `Bearer ${token}`
  }

  const params = options.params || {}

  return axios.get(url, { headers, params }).catch(failureFunction)
}

export const POST = (url, formData, options = {}) => {
  const headers = {}

  if (options.useAuthorization) {
    const token = cache.getItem('flavorwiki-payment-token')
    headers['Authorization'] = `Bearer ${token}`
  }

  const params = options.params || {}

  return axios.post(url, formData, { headers, params }).catch(failureFunction)
}

export const DELETE = (url, options = {}) => {
  const headers = {}

  if (options.useAuthorization) {
    const token = cache.getItem('flavorwiki-payment-token')
    headers['Authorization'] = `Bearer ${token}`
  }
  return axios.delete(url, { headers }).catch(failureFunction)
}
