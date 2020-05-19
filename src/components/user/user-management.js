import React, {Component} from 'react';
import LeftPanel from "../leftpanel/_leftPanel";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {UserService} from "../../services/userService";
import {Paginator} from "primereact/paginator";
import './user-management.css';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

class UserManagement extends Component {
  // Services
  userService;

  constructor() {
    super();
    this.userService = new UserService();
    this.state = {
      users: [
      ],
      pagination: {
        limit: 10,
        page: 0,
        search: '',
        column: 1,
        order: 'asc',
        status: 'active',
        roles: 'roles%5B%5D=Store%20Manager&roles%5B%5D=User&roles%5B%5D=Admin'
      },
      rows: 2,
      recordsTotal: 0,
      first: 0
    };

    this.setData();
  }

  setData() {
    this.userService.getAllUsers(
      this.state.pagination.limit,
      this.state.pagination.page,
      this.state.pagination.search,
      this.state.pagination.column,
      this.state.pagination.order,
      this.state.pagination.status,
      this.state.pagination.roles
    ).then(data => {
      if (data.data) {
        if (data.data.status) {
          console.log(data.data);
          this.setState({
            users: data.data.data,
            recordsTotal: data.data.recordsTotal
          })
        } else {
          this.setState({
            users: []
          })
        }
      } else {
        this.setState({
          users: []
        })
      }
    })
  }

  pageChange = (event) => {
    console.log(event);
    this.setState({
      first: event.first,
      page: event.first,
      pagination: {
        limit: event.rows,
        page: event.page,
        search: this.state.pagination.search,
        column: this.state.pagination.column,
        status: this.state.pagination.status,
        roles: this.state.pagination.roles,
        order: this.state.pagination.order,
      }
    }, () => {this.setData()});
  }

  render() {
    const header = <div>
      <div className="row">
        <div className="col-3">
          <Button className="py-1" id="submit" type="submit" label="Add New User" style={{marginRight: '.25em'}}/>
        </div>
        <div className="col-9">
          <InputText onKeyUp={this.pageChange}/>
        </div>
      </div>
    </div>;

    return (
      <div>
        <React.Fragment>
          <div className="row">
            <LeftPanel/>
            <div className="col-md-10">
              <DataTable totalRecords={120}
                         value={this.state.users}
                         footer={<Paginator
                           first={this.state.first}
                           totalRecords={this.state.recordsTotal}
                           rows={this.state.pagination.limit}
                           rowsPerPageOptions={[10, 20 , 50]}
                           template={'PrevPageLink PageLinks NextPageLink'}
                           onPageChange={this.pageChange}/>}
                         sortMode="multiple"
                         sortField={this.state.users.email}
                         header={ header }
              >
                <Column field="email" header="Email" sortable={true}/>
                <Column field="first_name" header="First Name" sortable={true}/>
                <Column field="last_name" header="Last Name" sortable={true}/>
                <Column field="role" header="Role" sortable={true}/>

              </DataTable>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default UserManagement;
