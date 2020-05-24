import React, {Component} from 'react';
import LeftPanel from "../leftpanel/_leftPanel";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {UserService} from "../../services/userService";
import {Paginator} from "primereact/paginator";
import './user-management.css';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import DeleteDialog from "./delete-dialog";
import AddUserModal from "./add-user-modal";
import {JwtService} from "../../services/jwtService";
import Spinner from "../Spinner";

class UserManagement extends Component {
  // Services
  userService;
  editModel;
  jwtService;

  userRole = '';

  constructor(props) {
    super(props);
    this.userService = new UserService();
    this.jwtService = new JwtService();
    this.userRole = this.jwtService.validateToken().role;
    this.state = {
      // User data state
      users: [
      ],
      // pagination data
      pagination: {
        limit: 10,
        page: 0,
        search: '',
        column: 1,
        order: 'asc',
        status: 'active',
        roles: this.userRole === 'Admin' ? 'roles%5B%5D=Store%20Manager&roles%5B%5D=User&roles%5B%5D=Admin' : 'roles%5B%5D=User'
      },
      rows: 2,
      recordsTotal: 0,
      isLoading: true,
      paginationLoading: false,
      // modal dialog state
      dialogVisible: false,
      role: this.userRole,
      addUserModalVisible: false,
      // ----------------------
      addUserModal: false,
      first: 0,
      // selected User Id state
      id: ''
    };

    this.editModel = null;
  }

  componentDidMount(): void {
    this.setData();
  }

  setData() { // method used to set data to the data table
    this.setState({
      paginationLoading: true
    });
    this.userService.getAllUsers( // make http call using the user service
      this.state.pagination.limit,
      this.state.pagination.page,
      this.state.pagination.search,
      this.state.pagination.column,
      this.state.pagination.order,
      this.state.pagination.status,
      this.state.pagination.roles
    ).then(data => { // use promise to get the data
      if (data.data) { // check if data is available
        if (data.data.status) { // Check the status
          this.setState({
            users: data.data.data, // add data to data table
            isLoading: false,
            paginationLoading: false,
            recordsTotal: data.data.recordsTotal // add records total for pagination
          })
        } else {
          this.setState({
            users: [] // else make the table empty
          })
        }
      } else {
        this.setState({
          users: []
        })
      }
    })
  }

  pageChange = (event) => { // on pagination change method
    this.setState({ // update the statue of pagination data
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
    }, () => {this.setData()}); // callback method to call the set data function
  }

  actionTemplate = (rowData) => {
    return <div>
      <Button type="button" className="mr-2" icon="pi pi-pencil" onClick={() => this.buttonClick(rowData._id, false)}/>
      <Button type="button" icon="pi pi-ban" onClick={() => this.buttonClick(rowData._id, true)}/>
    </div>;
  }

  buttonClick(id, isDelete) {
    if (isDelete) {
      this.setState({
        dialogVisible: true,
        id: id
      })
    } else {
      this.props.history.push(`/store/admin/users/${id}`);
    }
  }

  search = (event) => {
    this.setState({
      pagination: {
        search: event.target.value,
        limit: 10,
        page: 0,
        column: 1,
        order: 'asc',
        status: 'active',
        roles: this.userRole === 'Admin' ? 'roles%5B%5D=Store%20Manager&roles%5B%5D=User&roles%5B%5D=Admin' : 'roles%5B%5D=User'
      }
    }, () => {this.setData()});
  };

  delete = () => {
    this.setData();
    this.setState({
      dialogVisible: false,
      addUserModalVisible: false
    });
  }

  render() {
    const header = <div>
      <div className="row">
        <div className="col-1">
          {this.state.paginationLoading && <i className="pi pi-spin pi-spinner" style={{fontSize: '2rem'}}/>}
        </div>
        <div className="col-3 text-right">
          { this.state.role === 'Admin' && <Button className="user-add-btn py-1" id="submit"
                  onClick={() => {this.setState({addUserModalVisible: true})}}
                  type="submit" label="Add New User"
                  style={{marginRight: '.25em'}}/>}
        </div>
        <div className="col-8 d-flex justify-content-end">
          <div className="row">
            <div className="col-3 mt-2">
              Search:
            </div>
            <div className="col-6">
              <InputText onKeyUp={this.search}/>
            </div>
          </div>
        </div>
      </div>
    </div>;


    return (
      <div>
        {/*Modal to delete users */}
        {this.state.isLoading && <Spinner/>}
        <DeleteDialog id={this.state.id} show={this.state.dialogVisible}
                      onHide={() => {this.setState({dialogVisible: false})}}
                      close={() => {this.delete()}}/>
        <AddUserModal show={this.state.addUserModalVisible} onHide={() => {this.setState({addUserModalVisible: false})}} close={() => {this.delete()}}/>
        <React.Fragment>
          <div className="row">
            {!this.state.isLoading && <LeftPanel/>}
            <div className="col-md-10">
              {!this.state.isLoading && <DataTable totalRecords={120}
                         value={this.state.users}
                         footer={this.state.users.length > 0 ? <Paginator
                           first={this.state.first}
                           totalRecords={this.state.recordsTotal}
                           rows={this.state.pagination.limit}
                           rowsPerPageOptions={[10, 20 , 50]}
                           template={'PrevPageLink PageLinks NextPageLink'}
                           onPageChange={this.pageChange}/> : <p>No data available</p>}
                         sortMode="multiple"
                         sortField={this.state.users.email}
                         header={ header }
              >
                <Column field="email" header="Email" style={{width: "30%"}} sortable={true}/>
                <Column field="first_name" header="First Name" style={{width: "20%"}} sortable={true}/>
                <Column field="last_name" header="Last Name" style={{width: "20%"}} sortable={true}/>
                <Column field="role" header="Role" className="text-center" style={{width: "10%"}} sortable={true}/>
                <Column body={this.actionTemplate} header="Actions" style={{width: "20%"}} className="text-center"/>

              </DataTable> }
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default UserManagement;
