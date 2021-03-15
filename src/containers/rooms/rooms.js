import React ,{Component}from 'react'
import Axios from '../../api/axios'
import Spinner from '../../components/Spinner/spinner'
import classes from './rooms.module.css'
class Rooms extends Component{

    constructor(props){
        super(props)
        this.state = {
            rooms: null
        }
    }
    fetchData = async()=>{
        const rooms = (await Axios.get('/rooms')).data.rooms
        this.setState({rooms})
    }
    componentDidMount(){
        this.fetchData();
    }

    checkInRoom = async(roomNumber)=>{
        const response = await Axios.post(`/check-in/${roomNumber}`,{advancePaid:0})
        console.log(response)
        await this.fetchData()
    }

    checkOutRoom = async(roomNumber)=>{
        const response = await Axios.post(`/check-out/${roomNumber}`,{advancePaid:0})
        console.log(response)
        await this.fetchData()
    }
    render(){

        let show = <Spinner/>
        if(this.state.rooms !== null){
            const contents = this.state.rooms.map(room=><tr>
                <td>{room.number}</td>
                <td>{room.ac ? 'YES' : 'NO'}</td>
                <td>{room.single ? 'YES' : 'NO'}</td>
                <td>{room.bookedBy}</td>
                <td><button onClick={()=>this.checkInRoom(room._id)}>CheckIn</button></td>
                <td><button onClick={()=>this.checkOutRoom(room._id)}>Checkout</button></td>
            </tr>)
            show = <table>
                <tr>
                    <th>Room Number</th>
                    <th>AC</th>
                    <th>Single Room</th>
                    <th>Booked By</th>
                    <th>   </th>
                    <th>   </th>
                </tr>
                {contents}
            </table>
        }
            
        return <div className={classes.Rooms}>
            {show}
        </div>;
    }
}

export default Rooms