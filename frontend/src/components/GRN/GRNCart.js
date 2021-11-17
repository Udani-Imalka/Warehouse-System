import { Component } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";

class GRNCart extends Component{

  constructor(props) {
    super(props)
  
    this.state = { 
      grncart_id : '',
      grncart_p_id : '',
      grncart_grn_id : '',
      grncart_qty : '',
      grncart_buyingPrice : '',
      grncart_unit : '',
      grncart_isActive : '',
      grncart_addedDate : '',   
      grncart : [],
      products : [],
      grnlist : []
    }
  }
  
  componentDidMount(){    
    axios.get('http://localhost:3030/warehouse/grncart')
    .then(res => {
        this.setState({
            grncart : res.data.data
        })
        console.log(res.data);
    })
    axios.get('http://localhost:3030/warehouse/grn')
    .then(res => {
        this.setState({
            grnlist : res.data.data
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
  getGRNcartById = (id, event) => {
    axios.get("http://localhost:3030/warehouse/grncart/"+id)

    .then(res => {
      if(res.data != null){
        let data = res.data.data;
        console.log(data)
        this.setState(
        {
          grncart_id : data.grncart_id,
          grncart_p_id : data.grncart_p_id,
          grncart_grn_id : data.grncart_grn_id,
          grncart_qty : data.grncart_qty,
          grncart_buyingPrice : data.grncart_buyingPrice,
          grncart_unit : data.grncart_unit,
          grncart_isActive : data.grncart_isActive,
          grncart_addedDate : data.grncart_addedDate,   
        }
        )}    
      })
  }

//update an existing user
handleUpdateGRNcart = (event) => {
    
  event.preventDefault()
  axios.put('http://localhost:3030/warehouse/grncart', this.state)
  .then(res => {
    console.log(res.data);
    this.componentDidMount();
  })
}


//add a new grn cart to the system
handleAddGRNcart = (event) => {
  event.preventDefault()
  axios.post('http://localhost:3030/warehouse/grncart', this.state)
  .then(res => {
      console.log(res.data);
      this.componentDidMount();
  })  
} 

//delete a grn cart
handleDeleteGRNcart = (id) => {

  axios.delete('http://localhost:3030/warehouse/grncart/'+id)
  .then(res => {

    if(res.data.data != null){
      alert("Deleted successfully");

      this.setState({
        grncart : this.state.grncart.filter(data => data.grncart_id !== id)
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
                    <h4 className="card-title text-center my-4">GRN Cart</h4>
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
                            <th>Cart ID</th>
                            <th>GRN ID</th>
                            <th>Product ID</th>
                            <th>Qty</th>
                            <th>Unit</th>
                            <th>Buy price</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>

                        {this.state.grncart.map(data => {
                        return( 
                          <tr data-id={data.grncart_id}>

                            <td data-field="id">{data.grncart_id}</td>
                            <td data-field="grnid">{data.grncart_grn_id}</td>
                            <td data-field="pid">{data.grncart_p_id}</td>
                            <td data-field="qty">{data.grncart_qty}</td>
                            <td data-field="unit">{data.grncart_unit}</td>
                            <td data-field="price">{data.grncart_buyingPrice}</td>
                            <td data-field="status">{data.grncart_isActive}</td>
                            <td data-field="date">{new Date(data.grncart_addedDate).toLocaleDateString('en-GB')}</td>
                             
                            <td>
                              <button className="btn btn-outline-secondary btn-sm mx-1" title="Edit" data-bs-toggle="modal" data-bs-target="#myUpdateModal" onClick={this.getGRNcartById.bind(this, data.grncart_id)}>
                                <i className="fas fa-pencil-alt" />
                              </button>
                              <button className="btn btn-outline-secondary btn-sm mx-1" title="Delete" onClick={this.handleDeleteGRNcart.bind(this, data.grncart_id)}>
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


     {/* Add GRN cart modal */}

  <div id="myAddModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title" id="myModalLabel">Add GRN cart</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <h6>*All the fields are required</h6>

        <div className="card mt-3">
                
            <form onSubmit={this.handleAddGRNcart}>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-grnid-input" className="form-label">GRN ID</label>
                        <select id="formrow-grnid" className="form-select" name="grncart_grn_id" onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.grnlist.map((data) => <option key={data.grn_id}>{data.grn_id}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-pid-input" className="form-label">Product ID</label>
                        <select id="formrow-pid" className="form-select" name="grncart_p_id" onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          <option>1</option>
                          {/* {this.state.grnlist.map((data) => <option key={data.grn_id}>{data.grn_id}</option>)} */}
                        </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                      <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-price-input" className="form-label">Buy Price</label>
                          <input type="decimal" className="form-control" id="formrow-price-input" name="grncart_buyingPrice" onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-qty-input" className="form-label">Quantity</label>
                          <input type="decimal" className="form-control" id="formrow-qty-input" name="grncart_qty" onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-total-input" className="form-label">Unit</label>
                            <input type="decimal" className="form-control" id="formrow-total-input" name="grncart_unit" onChange={this.handleChange}/>
                            </div>
                        </div>
                      </div>

                  <div className="row">  
                    <div className="col-md-6">
                        <div class="mb-3">
                            <label for="formrow-address-input" class="form-label">Status</label>
                            <select id="formrow-role" className="form-select" name="grncart_isActive" onChange={this.handleChange}>
                                <option selected>Choose...</option>
                                <option>Pending</option>
                                <option>Partial</option>
                                <option>Ordered</option>
                                <option>Received</option>
                        </select>
                        </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-input-date" className="form-label">Date</label>
                          <input type="date" class="form-control" id="formrow-input-date" name="grncart_addedDate" onChange={this.handleChange}/>
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



{/* Update GRN cart modal */}

     <div id="myUpdateModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title" id="myModalLabel">Update GRN cart</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <h6>*All the fields are required</h6>

        <div className="card mt-3">
                
            <form onSubmit={this.handleUpdateGRNcart}>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-grnid-input" className="form-label">GRN ID</label>
                        <select id="formrow-grnid" className="form-select" name="grncart_grn_id" value={this.state.grncart_grn_id} onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          {this.state.grnlist.map((data) => <option key={data.grn_id}>{data.grn_id}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                        <label htmlFor="formrow-pid-input" className="form-label">Product ID</label>
                        <select id="formrow-pid" className="form-select" name="grncart_p_id" value={this.state.grncart_p_id} onChange={this.handleChange}>
                          <option selected>Choose...</option>
                          <option>1</option>
                          {/* {this.state.grnlist.map((data) => <option key={data.grn_id}>{data.grn_id}</option>)} */}
                        </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                      <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-price-input" className="form-label">Buy Price</label>
                          <input type="decimal" className="form-control" id="formrow-price-input" name="grncart_buyingPrice" value={this.state.grncart_buyingPrice} onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-qty-input" className="form-label">Quantity</label>
                          <input type="decimal" className="form-control" id="formrow-qty-input" name="grncart_qty" value={this.state.grncart_qty} onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-total-input" className="form-label">Unit</label>
                            <input type="decimal" className="form-control" id="formrow-total-input" name="grncart_unit" value={this.state.grncart_unit} onChange={this.handleChange}/>
                            </div>
                        </div>
                      </div>

                  <div className="row">  
                    <div className="col-md-6">
                        <div class="mb-3">
                            <label for="formrow-address-input" class="form-label">Status</label>
                            <select id="formrow-role" className="form-select" name="grncart_isActive" value={this.state.grncart_isActive} onChange={this.handleChange}>
                                <option selected>Choose...</option>
                                <option>Pending</option>
                                <option>Partial</option>
                                <option>Ordered</option>
                                <option>Received</option>
                        </select>
                        </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-input-date" className="form-label">Date</label>
                          <input type="date" class="form-control" id="formrow-input-date" name="grncart_addedDate" value={this.state.grncart_addedDate} onChange={this.handleChange}/>
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

export default GRNCart