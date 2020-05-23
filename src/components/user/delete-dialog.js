import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "primereact/button";
import {UserService} from "../../services/userService";
import {Growl} from "primereact/growl";


class deleteDialog extends Component {
  // services
  userService;
  growl;

  constructor(props) {
    super(props);
    this.userService = new UserService();
  }

  delete = () => {
    this.userService.deleteUser(this.props.id).then(data => {
      if (data.data.status) {
        this.growl.show({ severity: 'success', summary: 'User Deleted' });
        return this.props.close();
      } else {
        this.growl.show({ severity: 'error', summary: data.data.msg });
        return this.props.onHide();
      }
    });
  }
  render() {
    return (
      <div>
        <Growl ref={(el) => this.growl = el} />
        <Modal
          show={this.props.show} onHide={this.props.onHide}
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
