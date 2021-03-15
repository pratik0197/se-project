import React, { Component } from 'react'
import Axios from '../../api/axios';
import Admin from '../../utils/isAdmin';
import classes from './addRoom.module.css'
class AddRoom extends Component{


    constructor(props){
        super(props)
        this.state = {
            ac : false,
            single : true,
            number: ' '
        }
    }
    changeACState = ()=>{
        const ACState = this.state.ac
        this.setState({
            ac: !ACState
        })
    }
    changeSingleState = ()=>{
        const SingleState = this.state.single
        this.setState({
            single: !SingleState
        })
    }

    updateRoomNumber = (event)=>{
        this.setState({
            number: event.target.value
        })
    }

    addRoom = async()=>{
        try{
            const ac = this.state.ac
            const single = this.state.single
            const number = this.state.number
            const response = await Axios.post('/add-room',{ac,single,number})
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }
    render(){
        return <Admin>
            <div className={classes.AddRoom}>
                <label> AC </label>
                <input type="checkbox" onClick={this.changeACState}></input>
                <br/>
                <label> Double Room </label>
                <input type="checkbox" onClick={this.changeSingleState}></input>
                <br/>
                <label> Room Number </label>
                <input type="text" onChange={this.updateRoomNumber}></input>
                <br/>
                <button type="submit" onClick={this.addRoom}>ADD ROOM</button>
            </div>
        </Admin>
    }
}

export default AddRoom