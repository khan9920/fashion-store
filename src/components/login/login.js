import React, { Component } from 'react';
import { Card } from 'primereact/card';
import './login.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { UserService } from "../../services/userService";
import { Link, Redirect } from 'react-router-dom';
import { JwtService } from "../../services/jwtService";
import { Growl } from 'primereact/growl';


class MyComponent extends Component {
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
      isLoading: false,
      isLoggedIn: this.jwtService.validateToken(),
      isForgotPassword: false
    }

  }

  formUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  };

  login = (event) => {
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
          if (data.data.data.is_forgot_pass == 'true') {
            this.setState({
              isForgotPassword: true
            });
            return;
          }
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
    return this.state.email === '' || this.state.password.length < 8;
  }

  render() {
    let sectionStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url(img/background-image.jpg)`,
      backgroundSize: 'cover'
    };

    const header = <h2>Login</h2>;
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
                  <form onSubmit={this.login}>

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
                      <div className="col-md-2">
                        <Link className="link" to='/register'>
                          Register
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link className="link" to='/forgot-password'>
                          Forgot Password
                        </Link>
                      </div>

                    </div>

                    <div className="row mt-3">
                      <div className="col-6 btn-wrapper">
                        <Button className="py-1" disabled={this.buttonValidation() || this.state.isLoading} id="submit" type="submit" label="Login"
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
        {this.state.isForgotPassword && <Redirect to="/update-password" />}

      </div>
    );
  }
}

MyComponent.propTypes = {};

export default MyComponent;
