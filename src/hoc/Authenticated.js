import { useHistory } from 'react-router'
import authenticationToken from '../utils/authenticationToken'

const Authenticated = (props)=>{
    const history = useHistory()
    const authToken = authenticationToken()
    if(authToken !== null)
        return props.children
    history.push('/auth')
    return null
}

export default Authenticated