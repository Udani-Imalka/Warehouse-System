import { Component, React } from "react";
import Dashboard from './Dashboard';
import axios from "axios";
import Adduser from "./Adduser";

class User extends Component{

  constructor(props) {
    super(props)
  
    this.state = { 
      user_id : '',
      user_code : '',
      user_name : '',
      user_email : '',
      user_type : '',
      user_telnumber : '',  
      user_password : '',
      user_com_name : '',
      user_regDate : '',
      user_isActive : 'Active',
      user_gender : '',
      users : []
    }
  }
  
  componentDidMount(){    
    axios.get('http://localhost:3030/warehouse/users')
    .then(res => {
        this.setState({
            users : res.data.data
        })
        console.log(res.data);
    })

  }

//Handle the change if we change the value in input field in add form and update form
  handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
  }

  //get user by id to do the update
  getUserById = (id, event) => {
    axios.get("http://localhost:3030/warehouse/users/"+id)

    .then(res => {
      if(res.data != null){
        console.log("res",res.data.data)
        let data = res.data.data;
        this.setState(
        {
          user_id :data.user_id,
          user_name :data.user_name,
          user_type: data.user_type, 
          user_email:data.user_email, 
          user_gender: data.user_gender, 
          user_telnumber: data.user_telnumber, 
          user_code: data.user_code,
          user_com_name : data.user_com_name,
          user_regDate : data.user_regDate,
          user_isActive : data.user_isActive,
          user_password : data.user_password,
        }
        )}    
      })
  }

//update an existing user
handleUpdateUser = (event) => {
    
  event.preventDefault()
  axios.put('http://localhost:3030/warehouse/users', this.state)
  .then(res => {
    console.log(res.data);
    this.componentDidMount();
  })
}


  //add a new user to the system
  handleAddUser = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3030/warehouse/users', this.state)
    .then(res => {
        console.log(res.data);
        this.componentDidMount();
    })  
  } 

  //delete a user
  handleDeleteUser = (id, event) => {

      event.preventDefault()
      axios.delete("http://localhost:3030/warehouse/users/"+id)
      .then(res => {

        if(res.data != null){
          alert("Deleted successfully");

          this.setState({
            users : this.state.users.filter(data => data.user_id !== id)
          })
        }
        console.log(res);
      })
  }



  render(){

    const {user_name, user_type, user_email, user_gender, user_telnumber, user_code, user_password, user_id, user_com_name, user_regDate, user_status} = this.state;

    return(
      <body data-sidebar="dark">
          <Dashboard/>
        <div class="main-content">
        <div class="page-content">
        
        <div className="container-fluid">     
        <div className="row">
        <div className="col-12">
        <div className="card overflow-scroll">
          <div className="card-body">
            <h4 className="card-title text-center my-4">User List</h4>
            <div className="row">
              <div className="col-10">
                  <input type="text" className="form-control rounded w-50" placeholder="Search..."/>
              </div>
              
              <div className="col-2 float-right">
                  <button class="btn btn-primary waves-effect waves-light mb-3" data-bs-toggle="modal" data-bs-target="#myAddModal">Add User</button>
              </div>    
          </div> 
              <table className="table table-nowrap align-middle">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Code</th>
                    <th>UserName</th>
                    <th>UserRole</th>
                    <th>Company name</th>
                    <th>Gender</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Registerd Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>


                <tbody>
                  {this.state.users.map(data => {
                    return(

                    <tr data-id ={data.user_id}>
                      
                      <td data-field="id">{data.user_id}</td>
                      <td data-field="code">{data.user_code}</td>
                      <td data-field="name">{data.user_name}</td>
                      <td data-field="role">{data.user_type}</td>
                      <td data-field="company">{data.user_com_name}</td>
                      <td data-field="gender">{data.user_gender}</td>
                      <td data-field="contat">{data.user_telnumber}</td>
                      <td data-field="email">{data.user_email}</td>
                      <td data-field="regDate">{new Date(data.user_regDate).toLocaleDateString('en-GB')}</td>
                      <td data-field="status">{data.user_isActive}</td>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm mx-1" title="Edit" data-bs-toggle="modal" data-bs-target="#myUpdateModal" onClick={this.getUserById.bind(this, data.user_id)}>
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button className="btn btn-outline-secondary btn-sm mx-1" title="Delete" id="sa-warning" onClick={this.handleDeleteUser.bind(this, data.user_id)}>
                          <i class="fa fa-trash" aria-hidden="true"/>
                        </button>
                      </td>
                    </tr>
                    )
                  })}
                                          
                </tbody>
                </table>
              </div>
            </div>
         </div>
       </div> 


{/* Add user modal */}
  <div id="myAddModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="myModalLabel">Add User</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <h6>*All the fields are required</h6>

          <div className="card mt-3">
            
            <form onSubmit={this.handleAddUser}>
            
              <div className="row">
              <div className="col-md-8">
                  <div className="mb-3">
                  <label htmlFor="formrow-name-input" className="form-label">User name</label>
                  <input type="text" className="form-control" id="formrow-name-input" name="user_name" onChange={this.handleChange} />
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="mb-3">
                  <label htmlFor="formrow-code-input" className="form-label">User code</label>
                  <input type="text" className="form-control" id="formrow-code-input" name="user_code" onChange={this.handleChange} />
                  </div>
              </div>
              </div>

              <div className="row">
              <div className="col-md-8">
                  <div className="mb-3">
                  <label htmlFor="formrow-comname-input" className="form-label">Company name</label>
                  <input type="text" className="form-control" id="formrow-comname-input" name="user_com_name" onChange={this.handleChange} />
                  </div>
              </div>
              <div className="col-md-4">
                  <label htmlFor="formrow-role" className="form-label">Role</label>
                  <select id="formrow-role" className="form-select" name="user_type" onChange={this.handleChange}>
                      <option selected>Choose...</option>
                      <option>Admin</option>
                      <option>Owner</option>
                      <option>Stock keeper</option>
                  </select>
              </div>
              </div>

              <div className="row">
              <div className="col-md-6">
                  <div className="mb-3">
                  <label htmlFor="formrow-email-input" className="form-label">Email</label>
                  <input type="email" className="form-control" id="formrow-email-input" name="user_email" onChange={this.handleChange}/>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="mb-3">
                  <label htmlFor="formrow-password-input" className="form-label">Password</label>
                  <input type="password" className="form-control" id="formrow-password-input" name="user_password" onChange={this.handleChange}/>
                  </div>
              </div>
              </div>
              
              <div className="row">
              <div className="col-lg-6">
                  <div className="mb-3">
                  <label htmlFor="formrow-input-contact" className="form-label">Contact number</label>
                  <input type="text" className="form-control" id="formrow-input-contact" name="user_telnumber" onChange={this.handleChange}/>
                  </div>
              </div>
              <div className="col-lg-6">
                  <div className="mb-3">
                  <label htmlFor="formrow-inputGender" className="form-label">Gender</label>
                  <select id="formrow-inputGender" className="form-select" name="user_gender" onChange={this.handleChange}>
                      <option selected>Choose...</option>
                      <option>Male</option>
                      <option>Female</option>
                  </select>
                  </div>
              </div>

              <div className="row">
              <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="formrow-date-input" className="form-label">Date</label>
                    <input type="date" className="form-control" id="formrow-date-input" name="user_regDate" onChange={this.handleChange}/>
                  </div>
                </div>
              
              <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="formrow-status-input" className="form-label">Status</label>
                    <select id="formrow-status" className="form-select" name="user_isActive" onChange={this.handleChange}>
                      <option selected>Active</option>
                      <option>Inactive</option>
                  </select>
                  </div>
                </div>
              </div>
              </div>
              
              {/* <div className="mb-3">
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck" />
                  <label className="form-check-label" htmlFor="gridCheck">
                  Check me out
                  </label>
              </div>
              </div> */}
              <div>
                <button type="submit" className="btn btn-primary w-md float-right" >Submit</button>
                <button type="submit" className="btn btn-primary w-md mx-3 float-right" data-bs-dismiss="modal">Close</button>
              </div>
            </form>
              
          </div>
                
          </div>
          
        </div>
      </div>
    </div>




    {/* Update user modal */}

      <div id="myUpdateModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="myModalLabel">Update User</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <h6>*All the fields are required</h6>

            {/* {this.state.user.map(data => {
              return( */}
          <div className="card mt-3">
              
          <form onSubmit={this.handleUpdateUser}>
                {console.log("From >>",this.state)}

            <div className="row">
              <div className="col-md-8">
                  <div className="mb-3">
                  <label htmlFor="formrow-name-input" className="form-label">User name</label>
                  <input type="text" className="form-control" id="formrow-name-input" name="user_name" value= {this.state.user_name} onChange={this.handleChange} />
                  </div>
              </div>
              <div className="col-md-4">
                  <div className="mb-3">
                  <label htmlFor="formrow-code-input" className="form-label">User code</label>
                  <input type="text" className="form-control" id="formrow-code-input" name="user_code" value= {this.state.user_code} onChange={this.handleChange} />
                  </div>
              </div>
              </div>

              <div className="row">
              <div className="col-md-8">
                  <div className="mb-3">
                  <label htmlFor="formrow-comname-input" className="form-label">Company name</label>
                  <input type="text" className="form-control" id="formrow-comname-input" name="user_com_name" value= {this.state.user_com_name} onChange={this.handleChange} />
                  </div>
              </div>
              <div className="col-md-4">
                  <label htmlFor="formrow-role" className="form-label">Role</label>
                  <select id="formrow-role" className="form-select" name="user_type" value= {this.state.user_type} onChange={this.handleChange}>
                      <option selected>Choose...</option>
                      <option>Admin</option>
                      <option>Owner</option>
                      <option>Stock keeper</option>
                  </select>
              </div>
              </div>

              <div className="row">
              <div className="col-md-6">
                  <div className="mb-3">
                  <label htmlFor="formrow-email-input" className="form-label">Email</label>
                  <input type="email" className="form-control" id="formrow-email-input" name="user_email" value= {this.state.user_email} onChange={this.handleChange}/>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="mb-3">
                  <label htmlFor="formrow-password-input" className="form-label">Password</label>
                  <input type="password" className="form-control" id="formrow-password-input" name="user_password" value= {this.state.user_password} onChange={this.handleChange}/>
                  </div>
              </div>
              </div>
              
              <div className="row">
              <div className="col-lg-6">
                  <div className="mb-3">
                  <label htmlFor="formrow-input-contact" className="form-label">Contact number</label>
                  <input type="text" className="form-control" id="formrow-input-contact" name="user_telnumber" value= {this.state.user_telnumber} onChange={this.handleChange}/>
                  </div>
              </div>
              <div className="col-lg-6">
                  <div className="mb-3">
                  <label htmlFor="formrow-inputGender" className="form-label">Gender</label>
                  <select id="formrow-inputGender" className="form-select" name="user_gender" value= {this.state.user_gender} onChange={this.handleChange}>
                      <option selected>Choose...</option>
                      <option>Male</option>
                      <option>Female</option>
                  </select>
                  </div>
              </div>
              </div>

              <div className="row">
              <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="formrow-date-input" className="form-label">Date</label>
                    <input type="date" className="form-control" id="formrow-date-input" name="user_regDate" value= {this.state.user_regDate} onChange={this.handleChange}/>
                  </div>
                </div>
              
              <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="formrow-status-input" className="form-label">Status</label>
                    <select id="formrow-status" className="form-select" name="user_isActive" value= {this.state.user_isActive} onChange={this.handleChange}>
                      <option selected>Active</option>
                      <option>Inactive</option>
                  </select>
                  </div>
                </div>
              </div>                  
                
                  {/* <div className="mb-3">
                  <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck" />
                      <label className="form-check-label" htmlFor="gridCheck">
                      Check me out
                      </label>
                  </div>
                  </div> */}
              <div>
                <button type="submit" className="btn btn-primary w-md float-right">Submit</button>
                <button type="submit" className="btn btn-primary w-md mx-3 float-right" data-bs-dismiss="modal">Close</button>
              </div>
              
              </form>
                
              </div>
                {/* )})}  */}
              </div>
            
          </div>
        </div>
      </div>


      </div>
      </div>

    </div>


    </body>   
        )
    }
}

export default User;