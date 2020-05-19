import React, {Component} from 'react';
import {UserService} from "../../services/userService";
import {JwtService} from "../../services/jwtService";
import {Growl} from "primereact/growl";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Link, Redirect} from "react-router-dom";
import {Button} from "primereact/button";
import './register.css';

class Register extends Component {
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
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      isLoading: false,
      isLoggedIn: this.jwtService.validateToken()
    }
  }

  formUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  };

  signUp = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
      isLoggedIn: false
    });
    // get User details
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    // api call to login
    this.userService.userLogin(user).then(data => {
      this.setState({
        isLoading: false
      });
      if (data.data) {
        if (data.data.status) {
          this.growl.show({ severity: 'success', summary: 'Welcome' });
          localStorage.setItem('token', data.data.token);
          this.setState({
            isLoggedIn: true
          });
          return;
          // this.props.history.push('/store')
        } else {
          this.growl.show({ severity: 'error', summary: 'Login Failed', detail: data.data.msg });
        }
      }
    }).catch(error => {
      this.setState({
        isLoading: false
      });
      this.growl.show({ severity: 'error', summary: 'Login Failed', detail: 'Please try again' });
    })
  }

  buttonValidation() {
    return this.state.email === '' || this.state.password.length < 8 || this.state.first_name === '' || this.state.last_name === '';
  }

  render() {
    let sectionStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url(img/background-image.jpg)`,
      backgroundSize: 'cover'
    };

    const header = <h2>Register</h2>;
    return (
      <div style={sectionStyle} className="background">
        <Growl ref={(el) => this.growl = el} />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 card-div">
                <Card header={header}>
                  <div className="text-center">
                    <p>Welcome to the fashion store</p>
                  </div>
                  <form onSubmit={this.signUp}>

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
                                     onChange={this.formUpdate} />
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
                          <InputText type="password" className="text_field" id="password"
                                     value={this.state.password}
                                     name="password"
                                     onChange={this.formUpdate} />
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
                                     onChange={this.formUpdate} />
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
                                     onChange={this.formUpdate} />
                          <label htmlFor="in">Last Name</label>
                        </span>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-12">
                        Already Have an Account? <Link className="link" to='/login'>
                          Login
                        </Link>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-6 btn-wrapper">
                        <Button className="py-1" disabled={this.buttonValidation() || this.state.isLoading} id="submit" type="submit" label="Sign Up"
                                icon={this.state.isLoading ? "pi pi-spin pi-spinner" : "pi pi-check"} style={{marginRight: '.25em'}}/>;
                      </div>
                    </div>
                  </form>

                </Card>
              </div>
            </div>
          </div>
        </div>
        { this.state.isLoggedIn && <Redirect to="/"/> }

      </div>
    );
  }
}

export default Register;
