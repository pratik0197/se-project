import { useHistory } from "react-router"

const Admin = (props)=>{
    const history = useHistory()
    const isAdministrator = localStorage.getItem('isAdmin')
    
    if(isAdministrator === 'true')
        return props.children
    else{
        history.push('/auth')
        return null
    }
}

export default Admin