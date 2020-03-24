import React from 'react'
import Header from './Navbar/navbar'
import Mainbody from './body/mainbody'
import Login from './login'

class Main extends React.Component{
    constructor(props){
        super()
        this.state={
            login:false,
            email:'',
            username:''
        }
    }
    onlogged=(remail,rusername)=>{
        this.setState({
            login:true,
            email:remail,
            username:rusername
        })
        console.log(this.state)
    }
    onlogout=()=>{
        this.setState({
            login:false,
            email:'',
            username:''
        })
    }
    render(){
        var {login}=this.state
        if(login===true){
            return(
                <div>
                    <Header user={this.state.username} onloggedout={this.onlogout}/>
                    <Mainbody emailpass={this.state.email} />
                </div>
            )
        }
        else{
            return (
                <Login onloggedin={this.onlogged} />
            )
        }
    }
}
export default Main