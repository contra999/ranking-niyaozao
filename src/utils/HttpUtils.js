import axios from 'axios'
import { BASE_URL } from '../config/api'

axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = 10 * 1000

export default class HttpUtils {
  static async request(config, success = f => f, failure = f => f) {
    try {
      const response = await axios(config)
      console.log(response.data)
      success(response)
      return response.data
    } catch (error) {
      failure(error)
      throw new Error(error)
    }
  }

  static get(config, success, failure) {
    this.request({
      ...config,
      method: 'get'
    }, success, failure)
  }

  static post(config, success, failure) {
    this.request({
      ...config,
      method: 'post'
    }, success, failure)
  }

  static get2(config) {
    return axios({ ...config, method: 'get' })
      .then(response => response.data)
      .catch(error => { throw new Error(error) })
  }
}
