import axios from 'axios'
import React from 'react'
import './uploadmodal.css'
import {Modal,Button} from 'react-bootstrap'

class UploadModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            imageload:false,
            linkvalue:'',
            textvalue:'',
            imagevalue:'',
            titlevalue:''
        }
    }
    titlechange=(event)=>{
        this.setState({
            titlevalue:event.target.value
        })
    }
    linkchange=(event)=>{
        this.setState({
            linkvalue:event.target.value
        })
    }
    textchange=(event)=>{
        this.setState({
            textvalue:event.target.value
        })
    }
    filechange=(event)=>{
        console.log(event.target.files[0].name)
        this.setState({
            imageload:true,
            imagevalue:event.target.files
        })
    }
    submitter=()=>{
        console.log("submit")
        if(this.state.titlevalue==='' || this.state.textvalue===''){
            alert("Please Enter title or text")
            return
        }
        let allinfo={}
        if(this.state.imagevalue){
            const data= new FormData();
            data.append('file',this.state.imagevalue[0])
            axios.post('https://noteskeperbackend.herokuapp.com/image/upload',data,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                console.log(res)  
            })
            allinfo={
                email:this.props.emailid,
                title:this.state.titlevalue,
                text:this.state.textvalue,
                image:this.state.imagevalue[0].name,
                link:this.state.linkvalue,
                checkbox:false
            }
        }
        else{
            allinfo={
                email:this.props.emailid,
                title:this.state.titlevalue,
                text:this.state.textvalue,
                image:'',
                link:this.state.linkvalue,
                checkbox:false
            }
        }
        console.log(allinfo)
        axios.post('https://noteskeperbackend.herokuapp.com/user/data',allinfo).then(res=>{
            this.setState({
                imageload:false,
                linkvalue:'',
                textvalue:'',
                imagevalue:'',
                titlevalue:''
            })
            this.props.reloadingpage()
        })
    }
    render(){
        var {linkvalue,textvalue,imagevalue,imageload,titlevalue}=this.state
        if(imageload===false){
            return(
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Write a Note
                        </Modal.Title>
                        </Modal.Header>
                    <Modal.Body>
                    <input type="text" onChange={this.titlechange} value={titlevalue} className="link" placeholder="  Add Note Title"/>
                    <input type="text" onChange={this.linkchange} value={linkvalue} className="link" placeholder="  Add link here"/>
                    <br></br>
                    <textarea type="text" cols="40" 
                        rows="5" 
                        name="Text1" 
                        id="Text1" 
                        className="biginput"
                        placeholder="  Take a Note ......"
                        onChange={this.textchange}
                        value={textvalue}
                    />
                    <div className="fileUpload btn btn-secondary">
                        <span>Upload a Image</span>
                        <input type="file" className="upload" onChange={this.filechange} accept="image/*"/>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.submitter} block>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else{
            return(
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Write a Note
                        </Modal.Title>
                        </Modal.Header>
                    <Modal.Body>
                    <input type="text" onChange={this.linkchange} value={linkvalue} className="link" placeholder="  Add Note Title"/>
                    <input type="text" onChange={this.linkchange} value={linkvalue} className="link" placeholder="  Add link here"/>
                    <br></br>
                    <textarea type="text" cols="40" 
                        rows="5" 
                        name="Text1" 
                        id="Text1" 
                        className="biginput"
                        placeholder="  Take a Note ......"
                        onChange={this.textchange}
                        value={textvalue}
                    />
                    <div className="fileUpload btn btn-secondary">
                        <span>Upload a Image</span>
                        <input type="file" className="upload" onChange={this.filechange} accept="image/*"/>
                    </div>
                    <img className="imageresize" src={URL.createObjectURL(imagevalue[0])}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.submitter} block>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
    }
}
export default UploadModal