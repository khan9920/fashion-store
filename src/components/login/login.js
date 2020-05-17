import React, {Component} from 'react';
import {Card} from 'primereact/card';
import PropTypes from 'prop-types';
import './login.css';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {UserService} from "../../services/userService";

class MyComponent extends Component {
  // Services
  userService;

  constructor() {
    super();
    this.userService = new UserService();
    this.state = {
      email: '',
      password: ''
    }
  }

  formUpdate = (event) => {
    console.log(event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  };

  login = (event) => {
    event.preventDefault();
    this.userService.userLogin(this.state).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
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
    const footer = <div className="row mt-3">
      <div className="col-6 btn-wrapper">
        <Button id="submit" type="submit" onSubmit={this.login} label="Save" icon="pi pi-check" style={{marginRight: '.25em'}}/>;
      </div>
    </div>
    return (
      <div style={sectionStyle} className="background">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 card-div">
                <Card  header={header}>
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
                                 onChange={this.formUpdate}/>
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
                                 onChange={this.formUpdate}/>
                      <label htmlFor="in">password</label>
                  </span>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-6 btn-wrapper">
                        <Button disabled={this.buttonValidation()} id="submit" type="submit" label="Save" icon="pi pi-check" style={{marginRight: '.25em'}}/>;
                      </div>
                    </div>
                  </form>

                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyComponent.propTypes = {};

export default MyComponent;
