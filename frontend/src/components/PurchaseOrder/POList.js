import { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";

class POList extends Component{

  constructor(props) {
    super(props)
  
    this.state = { 
      purorder_id : '',
      purorder_user_id : '',
      purorder_supc_id : '',
      purorder_date : '',
      purorder_isActive : '',
      purorder_addedDate : '',   
      orders : [],
      suppliers : [],
      users : [],
      companies : []
    }
  }
  
  componentDidMount(){    
    axios.get('http://localhost:3030/warehouse/porders')
    .then(res => {
        this.setState({
            orders : res.data.data
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

    axios.get('http://localhost:3030/warehouse/suppliers')
    .then(res => {
        this.setState({
            suppliers : res.data.data
        })
        console.log(res.data);
    })

    axios.get('http://localhost:3030/warehouse/users')
    .then(res => {
        this.setState({
            users : res.data.data
        })
        console.log(res.data);
    })
  }

  //add a new order to the system
  handleAddPOrder = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3030/warehouse/porders', this.state)
    .then(res => {
        console.log(res.data);
        this.componentDidMount();
    })  
  } 

  //Handle the change if we change the value in input field in add form and update form
  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
}


  //get user by id to do the update
  getPOById = (id, event) => {
    axios.get("http://localhost:3030/warehouse/porders/"+id)

    .then(res => {
      if(res.data != null){
        let data = res.data.data;
        this.setState(
        {
          purorder_id : data.purorder_id,
          purorder_user_id : data.purorder_user_id,
          purorder_supc_id : data.purorder_supc_id,
          purorder_date : data.purorder_date,
          purorder_isActive : data.purorder_isActive,
          purorder_addedDate : data.purorder_addedDate,   
        }
        )}    
      })
  }

//update an existing user
handleUpdatePOrder = (event) => {
    
  event.preventDefault()
  axios.put('http://localhost:3030/warehouse/porders', this.state)
  .then(res => {
    console.log(res.data);
    this.componentDidMount();
  })
}



  //delete an order
  handleDeletePOrder = (id) => {

    axios.delete("http://localhost:3030/warehouse/porders/"+id)
    .then(res => {

      if(res.data != null){
        alert("Deleted successfully");

        this.setState({
          orders : this.state.orders.filter(data => data.purorder_id !== id)
        })
      }
      console.log(res);
    })
}


render(){

  const { purorder_id, purorder_addedDate, purorder_isActive, purorder_supc_id, purorder_user_id } = this.state;

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
                <h4 className="card-title text-center my-4">Purchase Order List</h4>
                <div className="row">
                    <div className="col-10">
                        <input type="text" className="form-control rounded w-50" placeholder="Search..."/>
                    </div>
                    
                    <div className="col-2 float-right">
                        <button class="btn btn-primary waves-effect waves-light mb-3" data-bs-toggle="modal" data-bs-target="#myAddModal">Add Purchase</button>
                    </div>    
                </div> 
              
                <table className="table table-nowrap align-middle">
                    <thead>
                      <tr>
                        <th>Purchase Order ID</th>
                        <th>User</th>
                        <th>Supplier Company</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Added date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.orders.map(data => {
                      return(
                      <tr data-id={data.purorder_id}>

                        <td data-field="id">{data.purorder_id}</td>
                        <td data-field="user">{data.user_name}</td>
                        <td data-field="supp">{data.supc_name}</td>
                        <td data-field="date">{new Date(data.purorder_date).toLocaleDateString('en-GB')}</td>
                        <td data-field="status">{data.purorder_isActive}</td>
                        <td data-field="addDate">{new Date(data.purorder_addedDate).toLocaleDateString('en-GB')}</td>
                        
                        <td>
                            <button className="btn btn-outline-secondary btn-sm mx-1" title="Edit" data-bs-toggle="modal" data-bs-target="#myUpdateModal" onClick={this.getPOById.bind(this, data.purorder_id)}>
                            <i className="fas fa-pencil-alt" />
                            </button>
                            <button className="btn btn-outline-secondary btn-sm mx-1" title="Delete" onClick={this.handleDeletePOrder.bind(this, data.purorder_id)}>
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





{/* Add PO list modal */}

<div id="myAddModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title" id="myModalLabel">Add Purchase</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <h6>*All the fields are required</h6>

        <div className="card mt-3">
                
            <form onSubmit={this.handleAddPOrder}>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-name-input" className="form-label">Supplier Company name</label>
                        <select id="formrow-supp" className="form-select" name="purorder_supc_id" onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.companies.map((data) => <option key={data.supc_id}>{data.supc_id} {data.supc_name}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <br></br>
                            <button className="btn btn-outline-secondary btn-sm my-2">
                              <Link key="t-supplier-list" to="/supplier"> <i className="fa fa-plus" /></Link>
                              {/* <i className="fa fa-plus" /> */}
                            </button>
                        </div>
                    </div>
                </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-email-input" className="form-label">User name</label>
                        <select id="formrow-supp" className="form-select" name="purorder_user_id" onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.users.map((data) => <option key={data.user_id} >{data.user_id} {data.user_name}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="mb-3">
                            <label for="formrow-address-input" class="form-label">Status</label>
                            <select id="formrow-role" className="form-select" name="purorder_isActive" onChange={this.handleChange}>
                                <option selected>Choose...</option>
                                <option>Pending</option>
                                <option>Partial</option>
                                <option>Ordered</option>
                                <option>Received</option>
                        </select>
                        </div>
                        </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-input-date" className="form-label">Date</label>
                        <input type="date" class="form-control" id="formrow-input-date" name="purorder_date" onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-input-addDate" className="form-label">Added date</label>
                        <input type="date" class="form-control" id="formrow-input-addDate" name="purorder_addedDate" onChange={this.handleChange}/>
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




{/* Update PO list modal */}

  <div id="myUpdateModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
      <div className="modal-content">
          <div className="modal-header">
          <h5 className="modal-title" id="myModalLabel">Update Order</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
          <h6>*All the fields are required</h6>

          <div className="card mt-3">
                  
          <form onSubmit={this.handleUpdatePOrder}>
          <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-name-input" className="form-label">Supplier Company name</label>
                        <select id="formrow-supp" className="form-select" name="purorder_supc_id" value={this.state.purorder_supc_id} onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.companies.map((data) => <option key={data.supc_id}>{data.supc_id} {data.supc_name}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <br></br>
                            <button className="btn btn-outline-secondary btn-sm my-2">
                              <Link key="t-supplier-list" to="/supplier"> <i className="fa fa-plus" /></Link>
                              {/* <i className="fa fa-plus" /> */}
                            </button>
                        </div>
                    </div>
                </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-email-input" className="form-label">User name</label>
                        <select id="formrow-supp" className="form-select" name="purorder_user_id" value={this.state.purorder_user_id} onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.users.map((data) => <option key={data.user_id} >{data.user_id} {data.user_name}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="mb-3">
                            <label for="formrow-address-input" class="form-label">Status</label>
                            <select id="formrow-role" className="form-select" name="purorder_isActive" value={this.state.purorder_isActive} onChange={this.handleChange}>
                                <option selected>Choose...</option>
                                <option>Pending</option>
                                <option>Partial</option>
                                <option>Ordered</option>
                                <option>Received</option>
                        </select>
                        </div>
                        </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-input-date" className="form-label">Date</label>
                        <input type="date" class="form-control" id="formrow-input-date" name="purorder_date" value={this.state.purorder_date} onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-input-addDate" className="form-label">Added date</label>
                        <input type="date" class="form-control" id="formrow-input-addDate" name="purorder_addedDate" value={this.state.purorder_addedDate} onChange={this.handleChange}/>
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

export default POList