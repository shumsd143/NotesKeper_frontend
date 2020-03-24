import React from 'react'
import Eachnote from './eachnotes'
import './eachnote.css'
import {Alert} from 'react-bootstrap'

class Userdata extends React.Component{
    constructor(props){
        super(props)
        this.state={
            urlvalue:'',
            data:this.props.showndata,
            urlchangeddata:this.props.showndata,
        }
    }
    changedata=(event)=>{
        this.setState({
            urlvalue:event.target.value
        })
        let data=this.state.data
        console.log(event.target.value)
        let newdata=data.filter(eve=>{
            let title=eve.title.toLowerCase()
            let url=event.target.value.toLowerCase()
            if(title.includes(url)===true){
                console.log(title)
                return eve
            }
        })
        console.log(newdata)
        this.setState({
            urlchangeddata:newdata
        })
    }
    render(){
        let {urlchangeddata}=this.state
        if(urlchangeddata.length===0){
            return (
                <div>
                    <div className="inputparent">
                        <input className="inputer" type="text" value={this.state.urlvalue} placeholder="  Search for Notes" onChange={this.changedata}/>
                    </div>
                    <Alert variant='danger'>
                        No Notes to show please upload 
                    </Alert>
                </div>
            )
        }
        else{
            return(
                <div className="arrange">
                    <div className="inputparent">
                        <input className="inputer" type="text" value={this.state.urlvalue} placeholder="  Search for Notes" onChange={this.changedata}/>
                    </div>
                    {urlchangeddata.map(data1=>
                        <Eachnote passeddata={data1} key={data1.title}/>
                    )}
                </div>
            )
        }
    }
}
export default Userdata