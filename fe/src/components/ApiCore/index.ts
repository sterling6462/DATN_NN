import axios, { AxiosError, AxiosResponse } from 'axios'
import { DispatchNotification, getCookie } from 'components'
import { default as queryString } from 'query-string'

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

axios.interceptors.request.use(function (config) {
  const access_token = getCookie('access')

  config.baseURL = (`${process.env.REACT_APP_BASE_URL}` || '') + '/api'
  config.headers.Authorization = `Bearer ${access_token}`
  return config
})

export const ApiCore = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
}

export const handleError = (
  err: AxiosError,
  dispatchNotification?: DispatchNotification
) => {
  const statusErr = err.response?.status
  if (statusErr === 401) {
    //TODO replace location by window.location
    window.location.replace('/login')
  } else if (statusErr === 403) {
    // window.location.replace('/not-found')
  } else {
    dispatchNotification &&
      dispatchNotification('error', 'This page is not available')
  }
}

export type RequestProps = {
  baseURL: string
  onSuccess: (data: any) => void
  onError?: DispatchNotification
  onHandleError?: (error?: any) => void
  method?: HttpMethod
  params?: unknown
}

export const onUpdateQuery = (url = '', query = {}, manager = false) => {
  //TODO replace location by window.location
  const currentQuery = queryString.parse(window.location.search)
  if (manager) {
    return url + '&' + queryString.stringify(Object.assign(currentQuery, query))
  }
  return url + '?' + queryString.stringify(Object.assign(currentQuery, query))
}

export const invokeRequest = async (options: RequestProps) => {
  const {
    baseURL,
    params: body,
    method = HttpMethod.GET,
    onSuccess,
    onError,
    onHandleError
  } = options
  const endpointRequest = baseURL

  try {
    let response: AxiosResponse
    if (method === HttpMethod.DELETE)
      response = await ApiCore.delete(endpointRequest)
    //TODO UPDATE API OAUTH
    else if (method === HttpMethod.PATCH)
      response = await ApiCore.patch(endpointRequest, body)
    else if (method === HttpMethod.POST)
      response = await ApiCore.post(endpointRequest, body)
    else response = await ApiCore.get(endpointRequest)
    onSuccess(response.data)
  } catch (error) {
    handleError(error as AxiosError, onError)
    const errorApi = (error as AxiosError)?.response?.data
    onHandleError && onHandleError(errorApi)
  }
}
