import { Component } from "react";
import Dashboard from './Dashboard';
import axios from "axios";

class Supplier extends Component{

  constructor(props) {
    super(props)
  
    this.state = {
      sup_id : '',
      sup_name : '',
      sup_address1 : '',
      sup_address2 : '',
      sup_district : '',
      sup_postalcode : '',
      sup_country : '',
      sup_telnumber : '',
      sup_email : '',
      sup_isActive : '',
      sup_createdDate : '',
      sup_supc_id : '',
      suppliers : [],
      companies : []
    }
  }
  
  componentDidMount(){
    axios.get('http://localhost:3030/warehouse/suppliers')
    .then(res => {
        this.setState({
            suppliers : res.data.data
        })
        console.log(res.data);
    })

    axios.get('http://localhost:3030/warehouse/supcompany')
    .then(res => {
        this.setState({
            companies : res.data.data
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

  //add a new supplier to the system
  handleAddSupplier = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3030/warehouse/suppliers', this.state)
    .then(res => {
      console.log(res.data)
        this.componentDidMount();
    })  
  } 

  
  //get user by id to do the update
  getSupplierById = (id, event) => {
    axios.get("http://localhost:3030/warehouse/suppliers/"+id)

    .then(res => {
      if(res.data != null){
        let data = res.data.data;
        this.setState(
        {
          sup_id : data.sup_id,
          sup_name : data.sup_name,
          sup_address1 : data.sup_address1,
          sup_address2 : data.sup_address2,
          sup_district : data.sup_district,
          sup_postalcode : data.sup_postalcode,
          sup_country : data.sup_country,
          sup_telnumber : data.sup_telnumber,
          sup_email : data.sup_email,
          sup_isActive : data.sup_isActive,
          sup_createdDate : data.sup_createdDate,
          sup_supc_id : data.supc_id
        }
        )}    
      })
  }


  //update an existing supplier
  handleUpdateSupplier = (event) => {
      
    event.preventDefault()
    axios.put('http://localhost:3030/warehouse/suppliers', this.state)
    .then(res => {
      console.log(res.data);
      this.componentDidMount();
    })
  }

  //delete a supplier
  handleDeleteSupplier = (id, event) => {
    event.preventDefault()

    axios.delete("http://localhost:3030/warehouse/suppliers/"+id)
    .then(res => {
      if(res.data != null){
        alert("Deleted successfully");
        this.setState({
          suppliers : this.state.suppliers.filter(data => data.sup_id !== id)
        })
      }
      console.log(res)
    })
    
  }


render(){

  const {sup_id, sup_name, sup_address2, sup_address1, sup_telnumber, sup_supc_id, sup_district, sup_createdDate, sup_email, sup_country, sup_postalcode, sup_isActive} = this.state;

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
              <h4 className="card-title text-center my-4">Supplier List</h4>
              <div className="row">
                  <div className="col-10">
                      <input type="text" className="form-control rounded w-50" placeholder="Search..."/>
                  </div>
                  
                  <div className="col-2 float-right">
                      <button class="btn btn-primary waves-effect waves-light mb-3" data-bs-toggle="modal" data-bs-target="#addSupplierModal">Add Supplier</button>
                  </div>    
              </div> 
            
              <table className="table table-nowrap align-middle">
                  <thead>
                    <tr>
                      <th>SupID</th>
                      <th>Name</th>
                      <th>Address 1</th>
                      <th>Address 2</th>
                      <th>Postal code</th>
                      <th>District</th>
                      <th>Country</th>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Company</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.suppliers.map(data => {
                    return( 

                    <tr data-id={data.sup_id}>

                      <td data-field="id">{data.sup_id}</td>
                      <td data-field="name">{data.sup_name}</td>
                      <td data-field="address1">{data.sup_address1}</td>
                      <td data-field="address2">{data.sup_address2}</td>
                      <td data-field="postal">{data.sup_postalcode}</td>
                      <td data-field="district">{data.sup_district}</td>
                      <td data-field="country">{data.sup_country}</td>
                      <td data-field="contat">{data.sup_telnumber}</td>
                      <td data-field="email">{data.sup_email}</td>
                      <td data-field="date">{new Date(data.sup_createdDate).toLocaleDateString('en-GB')}</td>
                      <td data-field="status">{data.sup_isActive}</td>
                      <td data-field="supsupcid">{data.supc_name}</td>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm mx-1" title="Edit" data-bs-toggle="modal" data-bs-target="#updateSupplierModal" onClick={this.getSupplierById.bind(this, data.sup_id)}>
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button className="btn btn-outline-secondary btn-sm mx-1" title="Delete" onClick={this.handleDeleteSupplier.bind(this, data.sup_id)}>
                          <i class="fa fa-trash" aria-hidden="true"/>
                        </button>
                      </td>
                    </tr>
                      )})} 
                  </tbody>
                </table>

              </div>
            </div>
          
        </div>
      </div> 


{/* Add upplier modal */}
    <div id="addSupplierModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="myModalLabel">Add Supplier</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <h6>*All the fields are required</h6>

            <div className="card mt-3">
                  
                  <form onSubmit={this.handleAddSupplier}>
                  
                      <div className="row">
                      <div className="col-md-12">
                          <div className="mb-3">
                          <label htmlFor="formrow-name-input" className="form-label">Supplier name</label>
                          <input type="text" className="form-control" id="formrow-name-input" name="sup_name" onChange={this.handleChange}/>
                          </div>
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-address1-input" className="form-label">Address 1</label>
                          <textarea type="text" className="form-control" id="formrow-address1-input" name="sup_address1" onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-input-address2" className="form-label">Address 2</label>
                          <textarea type="text" className="form-control" id="formrow-input-address2" name="sup_address2" onChange={this.handleChange}/>
                          </div>
                      </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-district-input" className="form-label">District</label>
                            <input type="text" className="form-control" id="formrow-district-input" name="sup_district" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-input-pcode" className="form-label">Postal Code</label>
                            <input type="text" className="form-control" id="formrow-input-pcode" name="sup_postalcode" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-input-country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="formrow-input-country" name="sup_country" onChange={this.handleChange}/>
                            </div>
                        </div>
                      </div>


                      <div className="row">
                      <div className="col-md-8">
                          <div className="mb-3">
                          <label htmlFor="formrow-email-input" className="form-label">Email</label>
                          <input type="email" className="form-control" id="formrow-email-input" name="sup_email" onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-input-contact" className="form-label">Contact number</label>
                          <input type="text" className="form-control" id="formrow-input-contact" name="sup_telnumber" onChange={this.handleChange}/>
                          </div>
                      </div>
                      </div>
              
                      <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-date-input" className="form-label">Date</label>
                            <input type="date" className="form-control" id="formrow-date-input" name="sup_createdDate" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-status-input" className="form-label">Status</label>
                            <select id="formrow-status" className="form-select" name="sup_isActive" onChange={this.handleChange}>
                                <option selected>Choose...</option>
                                <option>Active</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-comname-input" className="form-label">Supplier Company name</label>
                            <select id="formrow-supp" className="form-select" name="sup_supc_id" onChange={this.handleChange}>
                              <option selected>Choose...</option>
                              {this.state.companies.map((data) => <option key={data.supc_id}>{data.supc_id} {data.supc_name}</option>)}
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
              </div>
            
          </div>
        </div>
      </div>




{/* Update user modal */}

<div id="updateSupplierModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="myModalLabel">Update Supplier</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <h6>*All the fields are required</h6>

            <div className="card mt-3">
                  
                  <form onSubmit={this.handleUpdateSupplier}>
                  
                  <div className="row">
                      <div className="col-md-12">
                          <div className="mb-3">
                          <label htmlFor="formrow-name-input" className="form-label">Supplier name</label>
                          <input type="text" className="form-control" id="formrow-name-input" name="sup_name" value= {this.state.sup_name} onChange={this.handleChange}/>
                          </div>
                      </div>
                      </div>

                      <div className="row">
                      <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-address1-input" className="form-label">Address 1</label>
                          <input type="text" className="form-control" id="formrow-address1-input" name="sup_address1" value= {this.state.sup_address1} onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-input-address2" className="form-label">Address 2</label>
                          <input type="text" className="form-control" id="formrow-input-address2" name="sup_address2" value= {this.state.sup_address2} onChange={this.handleChange}/>
                          </div>
                      </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-district-input" className="form-label">District</label>
                            <input type="text" className="form-control" id="formrow-district-input" name="sup_district" value= {this.state.sup_district} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-input-pcode" className="form-label">Postal Code</label>
                            <input type="text" className="form-control" id="formrow-input-pcode" name="sup_postalcode" value= {this.state.sup_postalcode} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-input-country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="formrow-input-country" name="sup_country" value= {this.state.sup_country} onChange={this.handleChange}/>
                            </div>
                        </div>
                      </div>


                      <div className="row">
                      <div className="col-md-8">
                          <div className="mb-3">
                          <label htmlFor="formrow-email-input" className="form-label">Email</label>
                          <input type="email" className="form-control" id="formrow-email-input" name="sup_email" value= {this.state.sup_email} onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-input-contact" className="form-label">Contact number</label>
                          <input type="text" className="form-control" id="formrow-input-contact" name="sup_telnumber" value= {this.state.sup_telnumber} onChange={this.handleChange}/>
                          </div>
                      </div>
                      </div>
              
                      <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-date-input" className="form-label">Date</label>
                            <input type="date" className="form-control" id="formrow-date-input" name="sup_createdDate" value= {this.state.sup_createdDate} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-status-input" className="form-label">Status</label>
                            <select id="formrow-status" className="form-select" name="sup_isActive" value= {this.state.sup_isActive} onChange={this.handleChange}>
                                <option selected>Active</option>
                                <option>Inactive</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-comname-input" className="form-label">Supplier Company name</label>
                            <select id="formrow-supp" className="form-select" name="sup_supc_id" value= {this.state.companies.supc_id+" "+this.state.companies.supc_name} onChange={this.handleChange}>
                              <option selected>Choose...</option>
                              {this.state.companies.map((data) => <option key={data.supc_id}>{data.supc_id} {data.supc_name}</option>)}
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
                        <button type="submit" className="btn btn-primary w-md float-right">Update</button>
                        <button type="submit" className="btn btn-primary w-md mx-3 float-right" data-bs-dismiss="modal">Close</button>
                      </div>
                  </form>
                  </div>
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

export default Supplier