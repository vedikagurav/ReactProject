import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUsers() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
  axios
    .get(`http://localhost:3001/getPO/${id}`)
    .then((res) => {
      const data = res.data;
      setFormData({
        poDate: data.poDate || "",
        supplierName: data.supplierName || "",
        itemNo: data.itemNo || "",
        itemName: data.itemName || "",
        poQty: data.poQty || "",
        pendingQty: data.pendingQty || "",
        refPoNo: data.refPoNo || "", // Match this key with frontend
        etaDate: data.etaDate || "",
        partReceivingDate: data.partReceivingDate || "",
        remark: data.remark || "",
      });
    })
    .catch((err) => {
      console.log("Error fetching data:", err);
      alert("Failed to load record.");
    });
}, [id]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleUpdate = (e) => {
  e.preventDefault();

  axios
    .put(`http://localhost:3001/updatePO/${id}`, formData)
    .then(() => {
      alert("Record updated successfully!");
      navigate("/");
    })
    .catch((err) => {
      console.log("Update failed:", err);
      alert("Failed to update record.");
    });
};

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-4 shadow">
        <h2 className="mb-4">Update PO Record</h2>
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>PO Date</label>
              <input type="date" name="poDate" className="form-control" value={formData.poDate} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Supplier Name</label>
              <input type="text" name="supplierName" className="form-control" value={formData.supplierName} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Item No.</label>
              <input type="text" name="itemNo" className="form-control" value={formData.itemNo} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label>Item Name</label>
              <input type="text" name="itemName" className="form-control" value={formData.itemName} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label>PO Qty</label>
              <input type="number" name="poQty" className="form-control" value={formData.poQty} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label>Pending Qty</label>
              <input type="number" name="pendingQty" className="form-control" value={formData.pendingQty} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Ref. PO No.</label>
              <input type="text" name="refPoNo" className="form-control" value={formData.refPoNo} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>ETA Date</label>
              <input type="date" name="etaDate" className="form-control" value={formData.etaDate} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Part Receiving Date</label>
              <input type="date" name="partReceivingDate" className="form-control" value={formData.partReceivingDate} onChange={handleChange} />
            </div>
            <div className="col-12 mb-3">
              <label>Remark</label>
              <textarea name="remark" className="form-control" value={formData.remark} rows="2" onChange={handleChange}></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100">Update Record</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUsers;
