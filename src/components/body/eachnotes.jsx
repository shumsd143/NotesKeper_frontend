import React from 'react'
import {Card,Button} from 'react-bootstrap'
import axios from 'axios'

class Eachnotes extends React.Component{
    constructor(props){
        super(props)
        let data=this.props.passeddata
        let imgurl='https://funky802.com/elements/event_calendar/images/no_image.png'
        if(data.image){
            imgurl="https://noteskeperbackend.herokuapp.com/files/"+data.image
        }
        this.state={
            text:data.text,
            title:data.title,
            image:imgurl,
            link:data.link,
            checkbox:data.checkbox
        }
    }
    openanotherlink=()=>{
        if(this.state.link){
            window.open(this.state.link)
        }
        else{
            alert('No link is attached')
        }
    }
    changecheckbox=()=>{
        let body={}
        if(this.state.checkbox===true){
            this.setState({
                checkbox:false
            })
            body={
                checkbox:false,
                email:this.props.passeddata.email,
                title:this.state.title
            }
        }
        else{
            this.setState({
                checkbox:true
            })
            body={
                checkbox:true,
                email:this.props.passeddata.email,
                title:this.state.title
            }
        }
        axios.post('https://noteskeperbackend.herokuapp.com/user/data/checkbox',body)
    }
    render(){
        let {text,title,image,checkbox}=this.state
        return(
            <div className="headnote">
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={image} />
                    <input type="checkbox" className="stylecheckbox" checked={checkbox} onClick={this.changecheckbox}/>
                    <Card.Body className="Cardcolor">
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {text}
                        </Card.Text>
                        <Button variant="primary" onClick={this.openanotherlink}>Go to the Source</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default Eachnotes