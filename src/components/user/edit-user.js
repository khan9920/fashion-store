import React, {Component} from 'react';
import LeftPanel from "../leftpanel/_leftPanel";
import {UserService} from "../../services/userService";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Growl} from "primereact/growl";

class EditUser extends Component {
  // services
  userService;
  growl;

  constructor() {
    super();
    this.userService = new UserService();
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
      role: '',
      _id: '',
      isLoading: false
    }
  }

  componentDidMount(): void {
    const id = this.props.match.params.id;
    this.setState({
      _id: id
    });
    this.userService.getUserById(id).then(data => {
      if (data.data) {
        if (data.data.status) {
          const user = data.data.data;
          this.setStateMethod(user);
        } else {
          console.log('error');
        }
      } else {
        console.log('error');
      }
    })
  }

  setStateMethod(user) {
    this.setState({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      role: user.role,
      isLoading: false
    });
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

  editUser = (event) => {
    event.preventDefault();
    const user = {
      _id: this.state._id,
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      role: this.state.role,
      phone: this.state.phone
    }

    this.setState({
      isLoading: true,
    });
    this.userService.updateUser(user).then(data => {
      if (data.data) {
        if (data.data.status) {
          const user = data.data.data;
          this.setStateMethod(user);
          this.growl.show({ severity: 'success', summary: 'User Edit Success' });
        } else {
          this.componentDidMount();
          this.growl.show({ severity: 'error', summary: data.data.msg, });
        }
      } else {
        this.componentDidMount();
        this.growl.show({ severity: 'Error', summary: 'Edit Failed', });
      }
    });
  }

  buttonValidation() {
    return this.state.email === '' ||
      this.state.first_name === '' ||
      this.state.last_name === '' ||
      this.state.role === '';
  }


  render() {
    const roles = [
      {label: 'Admin', value: 'Admin'},
      {label: 'Store Manager', value: 'Store Manager'},
      {label: 'User', value: 'User'},
    ];

    return (
      <div>
        <Growl ref={(el) => this.growl = el} />
        <React.Fragment>
          <div className="row">
            <LeftPanel/>
            <div className="col-md-10">
              <form onSubmit={this.editUser}>

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
            </div>
          </div>
        </React.Fragment>

      </div>
    );
  }
}

export default EditUser;
