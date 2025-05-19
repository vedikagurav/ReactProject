import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUsers() {
  const [formData, setFormData] = useState({
    poDate: "",
    supplierName: "",
    itemNo: "",
    itemName: "",
    poQty: "",
    pendingQty: "",
    refPoNo: "",
    etaDate: "",
    partReceivingDate: "",
    remark: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.supplierName) {
      alert("Please fill in Supplier Name");
      return;
    }

    axios.post("http://localhost:3001/createPO", formData)
      .then(() => {
        alert("PO Record Created Successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to create PO record.");
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-4 shadow">
        <h2 className="mb-4">Create PO Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>PO Date</label>
              <input type="date" name="poDate" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Supplier Name <span className="text-danger">*</span></label>
              <input type="text" name="supplierName" className="form-control" onChange={handleChange} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Item No.</label>
              <input type="text" name="itemNo" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Item Name</label>
              <input type="text" name="itemName" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label>PO Qty</label>
              <input type="number" name="poQty" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label>Pending Qty</label>
              <input type="number" name="pendingQty" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Ref. PO No.</label>
              <input type="text" name="refPoNo" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>ETA Date</label>
              <input type="date" name="etaDate" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Part Receiving Date</label>
              <input type="date" name="partReceivingDate" className="form-control" onChange={handleChange} />
            </div>
            <div className="col-12 mb-3">
              <label>Remark</label>
              <textarea name="remark" className="form-control" rows="2" onChange={handleChange}></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100">Create Record</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUsers;
