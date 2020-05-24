import React, {Component} from 'react';
import {UserService} from "../../services/userService";
import {JwtService} from "../../services/jwtService";
import {Growl} from "primereact/growl";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Link, Redirect} from "react-router-dom";
import {Button} from "primereact/button";

class ForgotPassword extends Component {
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
      isLoading: false
    }

  }

  formUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  };

  forgotPassword = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    // get User details
    const user = {
      email: this.state.email,
    }
    // api call to login
    this.userService.forgotPassword(user).then(data => {
      this.setState({
        isLoading: false
      });
      if (data.data) {
        if (data.data.status) {
          this.growl.show({ severity: 'success', summary: 'An email was sent with login credentials' });
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
      this.growl.show({ severity: 'error', summary: 'Email Send fail', detail: 'Please try again' });
    })
  }

  buttonValidation() {
    return this.state.email === '';
  }

  render() {
    let sectionStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url(img/background-image.jpg)`,
      backgroundSize: 'cover'
    };

    const header = <h2>Forgot Password</h2>;
    return (
      <div style={sectionStyle} className="background">
        <Growl ref={(el) => this.growl = el} />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 card-div">
                <Card header={header}>
                  <div className="text-center">
                    <p>Please enter email to proceed</p>
                  </div>
                  <form onSubmit={this.forgotPassword}>

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
                      <div className="col-md-4">
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

      </div>
    );
  }
}

export default ForgotPassword;
