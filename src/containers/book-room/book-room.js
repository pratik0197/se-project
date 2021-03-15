import React, { Component } from 'react'
import Axios from '../../api/axios'
import Authenticated from '../../hoc/Authenticated'
import classes from './book-room.module.css'
class BookRoom extends Component{
    constructor(props){
        super(props)
        this.state = {
            ac : false,
            single: true,
            roomBooked: false,
            token: null,
            unavailable : false
        }
    }

    bookRoom = async()=>{
        try{
            const ac = this.state.ac
            const single = this.state.single
            const response = await Axios.post('/book-room',{ac,single})
            console.log(response)
            if(response.data.token){
                this.setState({
                    roomBooked : true,
                    token: response.data.token,
                    unavailable: false
                })
            }else{
                this.setState({
                    unavailable: true
                })
            }
            
        }catch(e){
            alert('error')
        }
    }

    changeACState = ()=>{
        const ACState = this.state.ac
        this.setState({
            ac: !ACState
        })
    }

    changeSingleState =()=>{
        const SingleState = this.state.ac
        this.setState({
            single: !SingleState
        })
    }
    render(){
        let element = <div className={classes.bookRoom}>
            <label>AC: </label>
            <input type="checkbox" onClick={this.changeACState}></input>
            <br/>
            <label>Double Room:</label>
            <input type="checkbox" onClick={this.changeSingleState}></input>
            <br/>
            <button type="submit" onClick={this.bookRoom}>BOOK ROOM</button>
        </div>

        if(this.state.roomBooked)
            element = <div>
                Your token number for room is {this.state.token}
            </div>
        if(this.state.unavailable)
            element = <div>
                We do not have any rooms matching your choice right now, sorry for the inconvenience
            </div>
        return <Authenticated>
            {element}
        </Authenticated>
    }
}

export default BookRoom