import React, { Component } from "react";
import './delete-laptop.css'
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core'



class DeleteLaptop extends Component{

  
    removeLaptop(id) {
      fetch('http://localhost:5000/api/Laptops/'+id,{
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
                  onClick={() => this.removeLaptop(this.props.model.LaptopsID)}>YES</div>
                
               
                <div className="no-button"
                 onClick={this.props.closeDeleteView}>NO</div>
                
              </DialogContent></div>
          </Dialog>
        )
}
}
export default DeleteLaptop