import { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";

class Invoice extends Component{

  constructor(props) {
    super(props)
  
    this.state = { 
      grninv_id : '',
      grninv_grn_id : '',
      grninv_date : '',
      grninv_amount : '',
      grninv_isActive : '',
      grninv_addedDate : '', 
      invoices : [],
      grnlist : []
    }
  }
  
  componentDidMount(){    
    axios.get('http://localhost:3030/warehouse/grninvoice')
    .then(res => {
        this.setState({
            invoices : res.data.data
        })
        console.log(res.data);
    })

    axios.get('http://localhost:3030/warehouse/grn')
    .then(res => {
        this.setState({
            grnlist : res.data.data
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


  //get grn invoice by id to do the update
  getGRNinvoiceById = (id, event) => {
    axios.get('http://localhost:3030/warehouse/grninvoice/'+id)

    .then(res => {
      if(res.data != null){
        console.log("res",res.data.data)
        let data = res.data.data;
        this.setState(
        {
          grninv_id : data.grninv_id,
          grninv_grn_id : data.grninv_grn_id,
          grninv_date : data.grninv_date,
          grninv_amount : data.grninv_amount,
          grninv_isActive : data.grninv_isActive,
          grninv_addedDate : data.grninv_addedDate, 
        }
        )}    
      })
  }

//update an existing grn invoice
handleUpdateGRNinvoice = (event) => {
    
  event.preventDefault()
  axios.put('http://localhost:3030/warehouse/grninvoice', this.state)
  .then(res => {
    console.log(res.data);
    this.componentDidMount();
  })
}


//add a new grn invoice to the system
handleAddGRNinvoice = (event) => {
  event.preventDefault()
  axios.post('http://localhost:3030/warehouse/grninvoice', this.state)
  .then(res => {
      console.log(res.data);
      this.componentDidMount();
  })  
} 

//delete a grn invoice
handleDeleteGRNinvoice = (id) => {

  axios.delete('http://localhost:3030/warehouse/grninvoice/'+id)
  .then(res => {
    if(res.data != null){
      alert("Deleted successfully");
      this.setState({
        invoices : this.state.invoices.filter(data => data.grninv_id !== id)
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
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title text-center my-4">Invoice List</h4>
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
                            <th>Invoice ID</th>
                            <th>GRN ID</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Added Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.invoices.map(data => {
                        return(  

                          <tr data-id={data.grninv_id}>

                            <td data-field="id">{data.grninv_id}</td>
                            <td data-field="grnid">{data.grninv_grn_id}</td>
                            <td data-field="date">{new Date(data.grninv_date).toLocaleDateString('en-GB')}</td>
                            <td data-field="amount">{data.grninv_amount}</td>
                            <td data-field="status">{data.grninv_isActive}</td>
                            <td data-field="addDate">{new Date(data.grninv_addedDate).toLocaleDateString('en-GB')}</td>
                             
                            <td>
                              <button className="btn btn-outline-secondary btn-sm mx-1" title="Edit" data-bs-toggle="modal" data-bs-target="#myUpdateModal" onClick={this.getGRNinvoiceById.bind(this, data.grninv_id)}>
                                <i className="fas fa-pencil-alt" />
                              </button>
                              <button className="btn btn-outline-secondary btn-sm mx-1" title="Delete" onClick={this.handleDeleteGRNinvoice.bind(this, data.grninv_id)}>
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


     {/* Add grn invoice modal */}

    <div id="myAddModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title" id="myModalLabel">Add Invoice</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <h6>*All the fields are required</h6>

        <div className="card mt-3">
                
            <form onSubmit={this.handleAddGRNinvoice}>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-grnid-input" className="form-label">GRN ID</label>
                        <select id="formrow-grnid" className="form-select" name="grninv_grn_id" onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.grnlist.map((data) => <option key={data.grn_id}>{data.grn_id}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-price-input" className="form-label">Amount</label>
                          <input type="decimal" className="form-control" id="formrow-price-input" name="grninv_amount" onChange={this.handleChange}/>
                          </div>
                      </div>
                </div>

                <div className="row">
                      <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-input-date" className="form-label">Date</label>
                          <input type="date" class="form-control" id="formrow-input-date" name="grninv_date" onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-6">
                        <div class="mb-3">
                            <label for="formrow-address-input" class="form-label">Status</label>
                            <select id="formrow-role" className="form-select" name="grninv_isActive" onChange={this.handleChange}>
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
                          <label htmlFor="formrow-input-date" className="form-label">Added date</label>
                          <input type="date" class="form-control" id="formrow-input-date" name="grninv_addedDate" onChange={this.handleChange}/>
                          </div>
                      </div>

                    </div>
                      
                     
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



{/* Update grn invoice modal */}

  <div id="myUpdateModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title" id="myModalLabel">Update Invoice</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <h6>*All the fields are required</h6>

        <div className="card mt-3">
                
            <form onSubmit={this.handleUpdateGRNinvoice}>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-grnid-input" className="form-label">GRN ID</label>
                        <select id="formrow-grnid" className="form-select" name="grninv_grn_id" value={this.state.grninv_grn_id} onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.grnlist.map((data) => <option key={data.grn_id}>{data.grn_id}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-price-input" className="form-label">Amount</label>
                          <input type="decimal" className="form-control" id="formrow-price-input" name="grninv_amount" value={this.state.grninv_amount} onChange={this.handleChange}/>
                          </div>
                      </div>
                </div>

                <div className="row">
                      <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-input-date" className="form-label">Date</label>
                          <input type="date" class="form-control" id="formrow-input-date" name="grninv_date" value={this.state.grninv_date} onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-6">
                        <div class="mb-3">
                            <label for="formrow-address-input" class="form-label">Status</label>
                            <select id="formrow-role" className="form-select" name="grninv_isActive" value={this.state.grninv_isActive} onChange={this.handleChange}>
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
                          <label htmlFor="formrow-input-date" className="form-label">Added date</label>
                          <input type="date" class="form-control" id="formrow-input-date" name="grninv_addedDate" value={this.state.grninv_addedDate} onChange={this.handleChange}/>
                          </div>
                      </div>

                    </div>
                      
                     
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
        );
    }
}

export default Invoice