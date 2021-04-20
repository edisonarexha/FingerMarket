import React, { Component } from "react";
import './delete-phone.css'
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core'



class DeletePhone extends Component{

  
    removeMobile(id) {
      fetch('http://localhost:5000/api/MobilePhones/'+id,{
          method:'DELETE',
          header:{'Accept':'application/json',
          'Content-Type':'application/json'}
      }).then(() => this.props.refreshList())
    }
    render() {
        return (
          <Dialog className="dialog-wrapper" open={!!this.props.model}>
          
            <div class="dialog">
              <DialogTitle>
                <div className="x-button">
                  
                <i class="fa fa-times" aria-hidden="true" onClick={this.props.closeDeleteView}></i>
                </div>
                <div className="title">
                  <div>Are you sure you want to delete this product</div>
                  
                  </div>
              </DialogTitle>
              <DialogContent class="d-container">
                
                <div className="yes-button"
                  onClick={() => this.removeMobile(this.props.model.MobilePhonesID)}>YES</div>
                
               
                <div className="no-button"
                 onClick={this.props.closeDeleteView}>NO</div>
                
              </DialogContent></div>
          </Dialog>
        )
}
}
export default DeletePhone