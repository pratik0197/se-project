import React, { Component } from 'react'
import Axios from '../../api/axios'
import Spinner from '../../components/Spinner/spinner'
import Authenticated from '../../hoc/Authenticated'
import classes from './me.module.css'
class Me extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            user : null
        }
    }

    getUserData = async()=>{
        const user = (await Axios.get('/me')).data.data
        console.log(user)
        this.setState({user})
    }
    componentDidMount(){
        this.getUserData()
    }
    render(){
        let show = <Spinner/>
        if(this.state.user != null)
            show = <div className={classes.me}>
                <p>UIN: {this.state.user._id}</p>
                <p>Email : {this.state.user.email}</p>
                <p>Room Fare : {this.state.user.roomPrice}</p>
                <p>Catering Fare: {this.state.user.cateringPrice}</p>
                <p>Total Price: {this.state.user.roomPrice + this.state.user.cateringPrice}</p>
                <p>Visits: {this.state.user.visits}</p>
            </div>
        return <Authenticated>
            {show}
        </Authenticated>
    }
}

export default Me