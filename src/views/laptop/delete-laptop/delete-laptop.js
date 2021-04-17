import React, { Component } from "react";
import './delete-laptop.css'
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core'



class DeleteLaptop extends Component{

  state = {
    LaptopsID
    }
    
    removeLaptop(id) {
        fetch('http://localhost:5000/api/Laptops/'+id,{
            method:'DELETE',
            header:{'Accept':'application/json',
            'Content-Type':'application/json'}
        }).then(() => this.getLaptops())
      }
    render() {
        return (
          <Dialog className="dialog-wrapper">
            <div class="dialog">
              <DialogTitle>
                <div className="title">
                  <div>Are you sure you want to delete this product</div>
                  <i class="fa fa-times" aria-hidden="true" onClick={this.props.closeAddView}></i>
                  </div>
              </DialogTitle>
              <DialogContent class="container">
                
                <input type="button" onClick={() => this.removeMobile(elem.LaptopsID)}>YES</input>
                <input type="button" onClick={this.props.closeAddView}>NO</input>
              </DialogContent></div>
          </Dialog>
        )
}
}