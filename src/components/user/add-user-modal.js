import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Button} from "primereact/button";

class AddUserModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>
          <Modal
            {...this.props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create User
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/*<h4>Centered Modal</h4>*/}
            </Modal.Body>
            <Modal.Footer>
              <Button className="py-1" id="Delete" onClick={this.delete} label="Delete" style={{marginRight: '.25em', background: "#fff !important"}}/>
              <Button className="py-1" id="Close" onClick={this.props.onClick} label="Close" style={{marginRight: '.25em'}}/>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

AddUserModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.any
};

export default AddUserModal;
