import axios from 'axios'
import authenticationToken from '../utils/authenticationToken'

const Axios = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_API}`,
    headers: {
        Authorization: `Bearer ${authenticationToken()}`
    }
})

export default Axios