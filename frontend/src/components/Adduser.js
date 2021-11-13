import { Component } from "react";

const Adduser = () => {

  return(
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
        )

    }

export default Adduser