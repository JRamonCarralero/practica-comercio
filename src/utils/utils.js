import { HttpError } from '../classes/HttpError.js'
import { simpleFetch } from '../lib/simpleFetch.js'

/**
 * Get data from API
 * @param {string} apiURL
 * @param {string} [method='GET']
 * @param {Object} [data]
 * @returns {Promise<any>}
 * @throws {HttpError} If the HTTP response is not ok.
 */
export async function getAPIData(apiURL, method = 'GET', data) {
    let apiData
  
    try {
      let headers = new Headers()
  
      headers.append('Content-Type', 'application/json')
      headers.append('Access-Control-Allow-Origin', '*')
      if (data) {
        headers.append('Content-Length', String(JSON.stringify(data).length))
      }
      /* const userData = getUser()
      if (userData) {
        headers.append('Authorization', `Bearer ${userData}`)
      } */
      apiData = await simpleFetch(apiURL, {
        signal: AbortSignal.timeout(3000),
        method: method,
        body: data || undefined,
        headers: headers
      });
    } catch (err) {
      if (err.name === 'AbortError') {
        console.error('Fetch abortado');
      }
      if (err instanceof HttpError) {
        if (err.response.status === 404) {
          console.error('Not found');
        }
        if (err.response.status === 500) {
          console.error('Internal server error');
        }
      }
    }
  
    return apiData
  }