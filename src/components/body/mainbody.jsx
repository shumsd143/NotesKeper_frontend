import React from 'react'
import UploadModal from './UploadModal'
import './mainbody.css'
import {Modal,Spinner} from 'react-bootstrap'
import Userdata from './userdata'

class Mainbody extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loaded:false,
            modal:false,
            data:''
        }
    }
    openmodal=()=>{
        this.setState({
            modal:true
        })
    }
    closemodal=()=>{
        this.setState({
            modal:false
        })
    }
    fetcher=()=>{
        fetch('http://localhost:5000/user/data/note/'+this.props.emailpass)
        .then(res=>res.json())
        .then(json=>{
            this.setState({
                loaded:true,
                data:json
            })
        })
    }
    reloader=()=>{
        this.setState({
            loaded:false
        })
        setTimeout(()=>{ this.fetcher() }, 2000);
    }
    componentDidMount(){
        this.fetcher();
    }
    render(){
        var {modal,loaded}=this.state
        if(loaded===false){
            return (
                <div>
                    <button className="Adjustbutton" onClick={this.openmodal}>Create a Note</button>
                    <Modal show={modal}
                        onHide={this.closemodal}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <UploadModal reloadingpage={this.reloader} emailid={this.props.emailpass}/>
                    </Modal>
                    <div className="inputparent">
                        <input className="inputer" type="text" placeholder="  Search for Notes"/>
                    </div>
                    <div className="loader">
                        <Spinner animation="grow" />
                        <Spinner animation="grow" />
                        <Spinner animation="grow" />
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <button className="Adjustbutton" onClick={this.openmodal}>Create a Note</button>
                    <Modal show={modal}
                        onHide={this.closemodal}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <UploadModal reloadingpage={this.reloader} emailid={this.props.emailpass}/>
                    </Modal>
                    <Userdata showndata={this.state.data}/>
                </div>
            )
        }
    }
}
export default Mainbody