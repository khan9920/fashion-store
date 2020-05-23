import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Dropdown} from 'primereact/dropdown';
import {UserService} from "../../services/userService";
import {Growl} from "primereact/growl";

class AddUserModal extends Component {
  // Services
  userService;
  growl;

  /**
   * Constructor set the initial state
   * Initialize an object of UserService class
   */
  constructor(props) {
    super(props);

    this.userService = new UserService();

    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      role: '',
      isLoading: false,
      shouldRedirect: false
    }
  }

  /**
   * @param event
   * get the event when onChange method on inputs
   * Then update the state variables
   */
  formUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  };

  /**
   * @param event
   * Register user method
   * Gets triggered on submitting the form
   * prevents default event
   * get user details from the state
   * call the create user method on the UserService class
   */
  addUser = (event) => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      role: this.state.role,
      phone: this.state.phone
    }
    this.setState({
      isLoading: true,
    });
    this.userService.createEmployee(user).then(data => {
      if (data.data.status) {
        this.growl.show({ severity: 'success', summary: 'User Created Successfully' });
        this.initialState();
        this.props.close();
      } else {
        this.growl.show({ severity: 'error', summary: data.data.msg });
        this.initialState();
        return this.props.onHide();
      }
    });
  }

  initialState() {
    this.setState({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      role: '',
      isLoading: false,
      shouldRedirect: false
    });
  }

  buttonValidation() {
    return this.state.email === '' ||
      this.state.password.length < 8 ||
      this.state.first_name === '' ||
      this.state.last_name === '' ||
      this.state.role === '';
  }

  render() {
    const roles = [
      {label: 'Admin', value: 'Admin'},
      {label: 'Store Manager', value: 'Store Manager'},
    ];
    return (
      <div>
        <Growl ref={(el) => this.growl = el} />
        <div>
          {/*Modal Start*/}
          <Modal
            show={this.props.show} onHide={this.props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create User
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/*Form starting*/}
              <form onSubmit={this.addUser}>

                <div className="row mt-4">
                  <div className="col-3">
                    <p>Email</p>
                  </div>
                  <div className="col-9">
                        <span className="p-float-label">
                          <InputText className="text_field"
                                     type="email"
                                     id="email"
                                     value={this.state.email}
                                     name="email"
                                     onChange={this.formUpdate}/>
                          <label htmlFor="in">Email</label>
                        </span>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-3">
                    <p>password</p>
                  </div>
                  <div className="col-9">
                        <span className="p-float-label">
                          <Password
                            className="text_field
                            " name="password"
                            required={true}
                            value={this.state.password}
                            onChange={this.formUpdate}/>
                          <label htmlFor="in">password</label>
                        </span>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-3">
                    <p>First Name</p>
                  </div>
                  <div className="col-9">
                        <span className="p-float-label">
                          <InputText className="text_field"
                                     type="text"
                                     id="first_name"
                                     value={this.state.first_name}
                                     name="first_name"
                                     required={true}
                                     onChange={this.formUpdate}/>
                          <label htmlFor="in">First Name</label>
                        </span>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-3">
                    <p>Last Name</p>
                  </div>
                  <div className="col-9">
                        <span className="p-float-label">
                          <InputText className="text_field"
                                     id="last_name"
                                     value={this.state.last_name}
                                     name="last_name"
                                     required={true}
                                     onChange={this.formUpdate}/>
                          <label htmlFor="in">Last Name</label>
                        </span>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-3">
                    <p>Role</p>
                  </div>
                  <div className="col-9">
                        <span className="p-float-label">
                          <Dropdown className="text_field"
                                    id="role"
                                    value={this.state.role}
                                    name="role"
                                    options={roles}
                                    required={true}
                                    onChange={this.formUpdate}
                                    placeholder="User role"
                          />
                        </span>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-3">
                    <p>Phone</p>
                  </div>
                  <div className="col-9">
                        <span className="p-float-label">
                          <InputText className="text_field"
                                     type="number"
                                     id="phone"
                                     value={this.state.phone}
                                     name="phone"
                                     required={true}
                                     onChange={this.formUpdate}/>
                          <label htmlFor="in">Phone</label>
                        </span>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-6 btn-wrapper">
                    <Button className="py-1" disabled={this.buttonValidation() || this.state.isLoading} id="submit"
                            type="submit" label="Create Account"
                            icon={this.state.isLoading ? "pi pi-spin pi-spinner" : "pi pi-check"}
                            style={{marginRight: '.25em'}}/>;
                  </div>
                </div>
              </form>
            {/*  Form Ending */}
            </Modal.Body>
          </Modal>
        {/*  Modal Ending*/}
        </div>
      </div>
    );
  }
}

AddUserModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.any,
  close: PropTypes.any
};

export default AddUserModal;
