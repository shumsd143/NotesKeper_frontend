import React from 'react'
import './loginstyle.css'
import axios from 'axios'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loginform:true,
            registeremail:'',
            registerpassword:'',
            registerusername:'',
            loginemail:'',
            loginpassword:'',
        }
    }
    tablogin=()=>{
        this.setState({
            loginform:true
        })
    }
    tabsign=()=>{
        this.setState({
            loginform:false
        })
    }
    changeregisteremail=(event)=>{
        this.setState({
            registeremail:event.target.value
        })
    }
    changeregisterpassword=(event)=>{
        this.setState({
            registerpassword:event.target.value
        })
    }
    changeregisterusername=(event)=>{
        this.setState({
            registerusername:event.target.value
        })
    }
    registertheuser=()=>{
        let body={
            'name':this.state.registerusername,
            'email':this.state.registeremail,
            'password':this.state.registerpassword
        }
        fetch('https://noteskeperbackend.herokuapp.com/user/validity/'+this.state.registeremail).then(res=>res.json()).then(json=>{
            console.log(json)
            if(json.presence===false){
                axios.post('https://noteskeperbackend.herokuapp.com/user',body).then(response=>{
                    this.setState({
                        loginform:true,
                        registerusername:'',
                        registeremail:'',
                        registerpassword:''
                    })
                })
            }
            else{
                alert('email is already registered')
            }
        })
    }
    changeloginemail=(event)=>{
        this.setState({
            loginemail:event.target.value
        })
    }
    changeloginpassword=(event)=>{
        this.setState({
            loginpassword:event.target.value
        })
    }
    logintheuser=(event)=>{
        if(this.state.loginemail==='' || this.state.loginpassword===''){
            alert('Email or password cannot be empty')
            return
        }
        let body={
            'email':this.state.loginemail,
            'password':this.state.loginpassword
        }
        console.log(body)
        axios.post('https://noteskeperbackend.herokuapp.com/user/login',body).then(response=>{
            if(response.data.status==="passed"){
                console.log('logged in')
                this.props.onloggedin(response.data.email,response.data.name)
                event.preventDefault()
            }
            else{
                alert('wrong email or password')
                event.preventDefault()
            }
        })
        event.preventDefault()
    }
    render(){
        let {loginform}=this.state
        if(loginform===true){
            return (
                <div className="align">
                    <h1 className="heading">userlogin</h1>
                    <div className="carder">
                        <div className="head">
                            <div></div>
                            <a id="login" className="selected" href="#login" onClick={this.tablogin}>Login</a>
                            <a id="register" href="#register" onClick={this.tabsign}>Register</a>
                            <div></div>
                        </div>
                        <div className="tabs">
                            <form className="form" onSubmit={this.logintheuser}>
                                <div className="inputs">
                                    <div className="input">
                                        <input placeholder="Email" value={this.state.loginemail} onChange={this.changeloginemail} type="email"/>
                                    </div>
                                    <div class="input">
                                        <input placeholder="Password" value={this.state.loginpassword} onChange={this.changeloginpassword} type="password"/>
                                    </div>
                                    <button className="cardbutton1">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="align">
                    <h1 className="heading">userlogin</h1>
                    <div className="carder">
                        <div className="head">
                            <div></div>
                            <a id="login" href="#login" onClick={this.tablogin}>Login</a>
                            <a id="register" className="selected" href="#register" onClick={this.tabsign}>Register</a>
                            <div></div>
                        </div>
                        <div className="tabs">
                            <form className="form" onSubmit={this.registertheuser}>
                                <div className="inputs">
                                    <div className="input">
                                        <input placeholder="Email" type="email" value={this.state.registeremail} onChange={this.changeregisteremail}/>
                                    </div>
                                    <div className="input">
                                        <input placeholder="Username" type="text" value={this.state.registerusername} onChange={this.changeregisterusername}/>
                                    </div>
                                    <div className="input">
                                        <input placeholder="Password" type="password" value={this.state.registerpassword} onChange={this.changeregisterpassword}/>
                                    </div>
                                </div>
                                <button className="cardbutton">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Login