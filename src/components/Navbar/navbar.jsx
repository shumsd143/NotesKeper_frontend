import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import './header.css'

class Header extends React.Component{
    constructor(props){
        super(props)
    }
    logout=()=>{
        let check=window.confirm('Are you sure you want to log out')
        if(check===true){
            this.props.onloggedout()
        }
    }
    render(){
        return(
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand href="#">NotesKeeper</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Navbar.Text className="user">
                            Hi , {this.props.user}
                        </Navbar.Text>
                        <Nav.Link href="" onClick={this.logout}>Logout</Nav.Link>
                    </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Header