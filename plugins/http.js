/* eslist-disasble */

import axios from 'axios'

export const Http = axios.create({
  baseURL: process.env.API_URL
})

export const getApi = function (url, filters) {
  return new Promise((resolve, reject) => {
    Http.get(url, { params: filters })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

export const deleteApi = function (url, payload) {
  return new Promise((resolve, reject) => {
    Http.delete(url, payload)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

export const postApi = function (url, payload) {
  return new Promise((resolve, reject) => {
    Http.post(url, payload)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

export const patchApi = function (url, payload) {
  return new Promise((resolve, reject) => {
    Http.patch(url, payload)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}
