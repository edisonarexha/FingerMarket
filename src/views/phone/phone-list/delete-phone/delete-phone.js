import React, { Component } from "react";
import './delete-phone.css'
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core'

class DeletePhone extends Component{

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
                
                <input type="button" onClick={() => this.removeMobile(elem.MobilePhonesID)}>YES</input>
                <input type="button" onClick={this.props.closeAddView}>NO</input>
              </DialogContent></div>
          </Dialog>
        )
}
}