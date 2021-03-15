import React, { Component } from 'react'
import Axios from '../../api/axios';
import Admin from '../../utils/isAdmin';
import classes from './updatePrice.module.css'
class UpdatePrice extends Component{


    constructor(props){
        super(props)
        this.state = {
            ac : false,
            single : true,
            price: 0
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

    updatePrice = (event)=>{
        this.setState({
            price: event.target.value
        })
    }

    updatePriceOfRooms = async()=>{
        try{
            const ac = this.state.ac
            const single = this.state.single
            const price = this.state.price
            console.log(price)
            const response = await Axios.put('/update-price',{ac,single,price})
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }
    render(){
        
        return <Admin>
            <div className={classes.UpdatePrice}>
                <label> AC </label>
                <input type="checkbox" onClick={this.changeACState}></input>
                <br/>
                <label> Double Room </label>
                <input type="checkbox" onClick={this.changeSingleState}></input>
                <br/>
                <label> Price </label>
                
                <input type="text" onChange={this.updatePrice}></input>
                <br/>
                <button type="submit" onClick={this.updatePriceOfRooms}>UPDATE PRICE</button>
            </div>
        </Admin>
    }
}

export default UpdatePrice