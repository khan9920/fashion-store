import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "primereact/button";
import {UserService} from "../../services/userService";

class deleteDialog extends Component {
  // services
  userService;
  constructor(props) {
    super(props);
    this.userService = new UserService();
  }

  delete = () => {
    this.userService.deleteUser(this.props.id).then(data => {
      if (data.data.status) {
        return this.props.onHide;
      }
    });

    return this.props.onHide();
  }
  render() {
    return (
      <div>
        <Modal
          {...this.props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className = "d-flex justify-content-center modal-header" closeButton>
            <h3 className="ml-5">Delete User</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12 text-center">
                <h5>Are You sure you want to delete this user?</h5>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className = "d-flex justify-content-center">
            <Button className="py-1" id="Delete" onClick={this.delete} label="Delete" style={{marginRight: '.25em', background: "#fff !important"}}/>
            <Button className="py-1" id="Close" onClick={this.props.onHide} label="Close" style={{marginRight: '.25em'}}/>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default deleteDialog;
