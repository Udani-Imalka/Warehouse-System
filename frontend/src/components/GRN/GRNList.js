import { Component } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";

class GRNList extends Component{

  constructor(props) {
    super(props)
  
    this.state = { 
      grn_id : '',
      grn_supc_id : '',
      grn_user_id : '',
      grn_purorder_id : '',
      grn_date : '',
      grn_isActive : '',
      grn_addedDate : '',   
      grnlist : [],
      companies : [],
      users : [],
      orders: []
    }
  }
  
  componentDidMount(){  
    axios.get('http://localhost:3030/warehouse/grn')
    .then(res => {
        this.setState({
            grnlist : res.data.data
        })
    })
    
    axios.get('http://localhost:3030/warehouse/porders')
    .then(res => {
        this.setState({
            orders : res.data.data
        })
    })

    axios.get('http://localhost:3030/warehouse/supcompany')
    .then(res => {
        this.setState({
            companies : res.data.data
        })
    })

    axios.get('http://localhost:3030/warehouse/users')
    .then(res => {
        this.setState({
            users : res.data.data
        })
    })
   
  }

//Handle the change if we change the value in input field in add form and update form
handleChange = (event) => {
  this.setState({
    [event.target.name] : event.target.value
  })
}


  //get user by id to do the update
  getGRNlistById = (id, event) => {
    console.log(id)
    axios.get('http://localhost:3030/warehouse/grn/'+id)

    .then(res => {
      if(res.data != null){
        console.log("res",res.data.data)
        let data = res.data.data;
        this.setState(
        {
          grn_id : data.grn_id,
          grn_supc_id : data.grn_supc_id,
          grn_user_id : data.grn_user_id,
          grn_purorder_id : data.grn_purorder_id,
          grn_date : data.grn_date,
          grn_isActive : data.grn_isActive,
          grn_addedDate : data.grn_addedDate,   
        }
        )}    
      })
  }

//update an existing grn
handleUpdateGRNlist = (event) => {
    
  event.preventDefault()
  axios.put('http://localhost:3030/warehouse/grn', this.state)
  .then(res => {
    console.log(res.data);
    this.componentDidMount();
  })
}


//add a new grn to the system
handleAddGRNList = (event) => {
  event.preventDefault()
  axios.post('http://localhost:3030/warehouse/grn', this.state)
  .then(res => {
      console.log(res.data);
      this.componentDidMount();
  })  
} 

//delete a grn 
handleDeleteGRNList = (id) => {
  console.log(id)
  axios.delete("http://localhost:3030/warehouse/grn/"+id)
  .then(res => {

    if(res.data != null){
      alert("Deleted successfully");

      this.setState({
        grnlist : this.state.grnlist.filter(data => data.grn_id !== id)
      })
    }
    console.log(res);
  })
}




  render() {
    return (
      <body data-sidebar="dark">
        <Dashboard/>
          <div class="main-content">
          <div class="page-content">
            <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card overflow-scroll">
                  <div className="card-body">
                    <h4 className="card-title text-center my-4">GRN List</h4>
                    <div className="row">
                        <div className="col-10">
                            <input type="text" className="form-control rounded w-50 mb-3" placeholder="Search..."/>
                        </div>
                       
                        <div className="col-2 float-right">
                            <button class="btn btn-primary waves-effect waves-light mb-3" data-bs-toggle="modal" data-bs-target="#myAddModal">Add GRN</button>
                        </div>  
                    </div> 
                  
                    <table className="table table-nowrap align-middle">
                        <thead>
                          <tr>
                            <th>GRN ID</th>
                            <th>Supplier Company</th>
                            <th>User</th>
                            <th>Purchase order ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Added Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>

                        {this.state.grnlist.map(data => {
                        return(
                          <tr data-id={data.grn_id}>

                            <td data-field="id">{data.grn_id}</td>
                            <td data-field="supp">{data.supc_name}</td>
                            <td data-field="user">{data.user_name}</td>
                            <td data-field="poid">{data.grn_purorder_id}</td>
                            <td data-field="date">{new Date(data.grn_date).toLocaleDateString('en-GB')}</td>
                            <td data-field="status">{data.grn_isActive}</td>
                            <td data-field="addDate">{new Date(data.grn_addedDate).toLocaleDateString('en-GB')}</td>

                            <td>
                              <button className="btn btn-outline-secondary btn-sm mx-1" title="Edit" data-bs-toggle="modal" data-bs-target="#myUpdateModal"  onClick={this.getGRNlistById.bind(this, data.grn_id)}>
                                <i className="fas fa-pencil-alt" />
                              </button>
                              <button className="btn btn-outline-secondary btn-sm mx-1" title="Delete" onClick={this.handleDeleteGRNList.bind(this, data.grn_id)}>
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
          </div>
        </div>


{/* Add GRN list modal */}

    
<div id="myAddModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title" id="myModalLabel">Add GRN</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <h6>*All the fields are required</h6>

        <div className="card mt-3">
                
            <form onSubmit={this.handleAddGRNList}>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-name-input" className="form-label">Supplier name</label>
                        <select id="formrow-supp" className="form-select" name="grn_supc_id" onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.companies.map((data) => 
                            <option key={data.supc_id}>{data.supc_id} {data.supc_name}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="mb-3">
                            <br></br>
                            <button className="btn btn-outline-secondary btn-sm my-2">
                              <Link key="t-supplier-list" to="/supplier"> <i className="fa fa-plus" /></Link>
                              {/* <i className="fa fa-plus" /> */}
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                        <label htmlFor="formrow-id-input" className="form-label">Purchase order ID</label>
                        <select id="formrow-supp" className="form-select" name="grn_purorder_id" onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.orders.map((data) => <option key={data.purorder_id} >{data.purorder_id}</option>)}
                        </select>
                        </div>
                    </div>
                </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-name-input" className="form-label">User name</label>
                        <select id="formrow-supp" className="form-select" name="grn_user_id" onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.users.map((data) => <option key={data.user_id} >{data.user_id} {data.user_name}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="mb-3">
                            <label for="formrow-address-input" class="form-label">Status</label>
                            <select id="formrow-role" className="form-select" name="grn_isActive" onChange={this.handleChange}>
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
                        <input type="date" class="form-control" id="formrow-input-date" name="grn_date" onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-input-addDate" className="form-label">Added date</label>
                        <input type="date" class="form-control" id="formrow-input-addDate" name="grn_addedDate" onChange={this.handleChange}/>
                        </div>
                      </div>
                    </div>
 \
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



{/* Update GRN list modal */}

    
<div id="myUpdateModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title" id="myModalLabel">Update GRN</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <h6>*All the fields are required</h6>

        <div className="card mt-3">
                
            <form onSubmit={this.handleUpdateGRNlist}>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-name-input" className="form-label">Supplier name</label>
                        <select id="formrow-supp" className="form-select" name="grn_supc_id" value={this.state.supc_name} onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.companies.map((data) => 
                            <option key={data.supc_id}>{data.supc_id} {data.supc_name}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="mb-3">
                            <br></br>
                            <button className="btn btn-outline-secondary btn-sm my-2">
                              <Link key="t-supplier-list" to="/supplier"> <i className="fa fa-plus" /></Link>
                              {/* <i className="fa fa-plus" /> */}
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                        <label htmlFor="formrow-id-input" className="form-label">Purchase order ID</label>
                        <select id="formrow-supp" className="form-select" name="grn_purorder_id" value={this.state.grn_purorder_id}  onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.orders.map((data) => <option key={data.purorder_id} >{data.purorder_id}</option>)}
                        </select>
                        </div>
                    </div>
                </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-name-input" className="form-label">User name</label>
                        <select id="formrow-supp" className="form-select" name="grn_user_id" value={this.state.grn_user_id}  onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.users.map((data) => <option key={data.user_id} >{data.user_id} {data.user_name}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="mb-3">
                            <label for="formrow-address-input" class="form-label">Status</label>
                            <select id="formrow-role" className="form-select" name="grn_isActive" value={this.state.grn_isActive}  onChange={this.handleChange}>
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
                        <input type="date" class="form-control" id="formrow-input-date" name="grn_date" value={this.state.grn_date}  onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-input-addDate" className="form-label">Added date</label>
                        <input type="date" class="form-control" id="formrow-input-addDate" name="grn_addedDate" value={this.state.grn_addedDate}  onChange={this.handleChange}/>
                        </div>
                      </div>
                    </div>
 \
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
        </body>
        );
    }
}

export default GRNList