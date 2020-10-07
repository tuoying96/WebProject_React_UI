/*
module to send ajax request
return is promise Object
 */
import axios from 'axios'
const baseUrl = ''
// const baseUrl = 'http://localhost:4000'
export default function ajax(url, data={}, type='GET') {
    url = baseUrl + 'api' + url
    // url = baseUrl + url
    console.log(url)
    if(type==='GET') { // GET request
        // merge string
        // data: {username: tom, password: 123}
        // paramStr: username=tom&password=123
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if(paramStr) {
            paramStr = paramStr.substring(0, paramStr.length-1)
        }
        // GET request using axios
        return axios.get(url + '?' + paramStr)
    } else {// POST request
        // POST request using axios
        return axios.post(url, data)
    }
}
