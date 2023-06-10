import axios from 'axios'

const baseURL = process.env.API_BASE_URL
const headers = {'Content-type': 'application/json; charset=UTF-8'}

// Global axios defaults
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//Custom instance defaults
export const axiosInstance = axios.create({
  baseURL,
  headers,
})

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
// axiosInstance.defaults.timeout = 2500

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // This Entire logic will be executed before the api call
    // Do something before request is sent
    // You can add here jwt token to the request or you can remove
    // you can also check the jwt life time before making an api request
    // You can add dynamic headers
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // This Entire logic will be executed once you receive the info from the api call
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
