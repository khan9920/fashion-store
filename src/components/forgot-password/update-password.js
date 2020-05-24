import React, {Component} from 'react';
import {UserService} from "../../services/userService";
import {JwtService} from "../../services/jwtService";
import {Growl} from "primereact/growl";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Link, Redirect} from "react-router-dom";
import {Button} from "primereact/button";

class UpdatePassword extends Component {
  // Services
  userService;
  growl;
  jwtService;

  constructor(props) {
    super(props);
    this.userService = new UserService();
    this.jwtService = new JwtService();
    this.state = {
      email: '',
      oldPassword: '',
      password: '',
      confPass: '',
      isLoading: false,
    }

  }

  formUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  };

  updatePassword = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.confPass) {
      this.growl.show({ severity: 'error', summary: 'Please check confirm password' });
      return;
    }
    this.setState({
      isLoading: true,
    });
    // get User details
    const user = {
      email: this.state.email,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.password
    }
    // api call to login
    this.userService.updatePassword(user).then(data => {
      this.setState({
        isLoading: false
      });
      if (data.data) {
        if (data.data.status) {
          this.growl.show({ severity: 'success', summary: 'Password Changed', details: 'Proceed to login' });
          this.setState({
            email: '',
            oldPassword: '',
            password: '',
            confPass: '',
          })
          return;
          // this.props.history.push('/store')
        } else {
          this.growl.show({ severity: 'error', summary: 'Error', detail: data.data.msg });
        }
      }
    }).catch(error => {
      this.setState({
        isLoading: false
      });
      this.growl.show({ severity: 'error', summary: 'Update Failed'});
    })
  }

  buttonValidation() {
    return this.state.email === '' || this.state.password.length < 8  || this.state.confPass === '' || this.state.oldPassword === '';
  }

  render() {
    let sectionStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url(img/background-image.jpg)`,
      backgroundSize: 'cover'
    };

    const header = <h2>Update Password</h2>;
    return (
      <div style={sectionStyle} className="background">
        <Growl ref={(el) => this.growl = el} />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 card-div">
                <Card header={header}>
                  <div className="text-center">
                    <p>Remember to keep credentials safe</p>
                  </div>
                  <form onSubmit={this.updatePassword}>

                    <div className="row mt-4">
                      <div className="col-2">
                        <p>Email</p>
                      </div>
                      <div className="col-10">
                        <span className="p-float-label">
                          <InputText className="text_field"
                                     type="email"
                                     id="email"
                                     value={this.state.email}
                                     name="email"
                                     onChange={this.formUpdate} />
                          <label htmlFor="in">Email</label>
                        </span>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-2">
                        <p>Generated Password</p>
                      </div>
                      <div className="col-10">
                        <span className="p-float-label">
                          <InputText className="text_field"
                                     type="password"
                                     id="oldPassword"
                                     value={this.state.oldPassword}
                                     name="oldPassword"
                                     onChange={this.formUpdate} />
                          <label htmlFor="in">Generated Password</label>
                        </span>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-2">
                        <p>password</p>
                      </div>
                      <div className="col-10">
                        <span className="p-float-label">
                          <InputText type="password" className="text_field" id="password"
                                     value={this.state.password}
                                     name="password"
                                     onChange={this.formUpdate} />
                          <label htmlFor="in">password</label>
                        </span>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-2">
                        <p>Confirm Password</p>
                      </div>
                      <div className="col-10">
                        <span className="p-float-label">
                          <InputText type="password" className="text_field" id="confPass"
                                     value={this.state.confPass}
                                     name="confPass"
                                     onChange={this.formUpdate} />
                          <label htmlFor="in">Confirm Password</label>
                        </span>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-2">
                        <Link className="link" to='/login'>
                          Login
                        </Link>
                      </div>

                    </div>

                    <div className="row mt-3">
                      <div className="col-6 btn-wrapper">
                        <Button className="py-1" disabled={this.buttonValidation() || this.state.isLoading} id="submit" type="submit" label="Save"
                                icon={this.state.isLoading ? "pi pi-spin pi-spinner" : "pi pi-check"} style={{ marginRight: '.25em' }} />
                      </div>
                    </div>
                  </form>

                </Card>
              </div>
            </div>
          </div>
        </div>
        {this.state.isLoggedIn && <Redirect to="/" />}

      </div>
    );
  }
}

export default UpdatePassword;
