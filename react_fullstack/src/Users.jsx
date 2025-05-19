import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DownloadTableExcel } from "react-export-table-to-excel";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://react-project-api-three.vercel.app")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    axios
      .delete(`https://react-project-api-three.vercel.app/deletePO/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const filteredUsers = users.filter((user) =>
    user.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Supplier PO Management</h2>
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Supplier Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Excel Export Button */}
      <DownloadTableExcel
        filename="Supplier_PO_Records"
        sheet="PO Records"
        currentTableRef={tableRef.current}
      >
        <button className="btn btn-info mb-3">Export to Excel</button>
      </DownloadTableExcel>

      {/* Users Table */}
      <div className="table-responsive">
        <table
          ref={tableRef}
          className="table table-bordered table-striped table-hover text-center"
        >
          <thead className="table-dark">
            <tr>
              <th>PO Date</th>
              <th>Supplier Name</th>
              <th>Item No.</th>
              <th>Item Name</th>
              <th>PO Qty</th>
              <th>Pending Qty</th>
              <th>Ref. PO No.</th>
              <th>ETA Date</th>
              <th>Part Receiving Date</th>
              <th>Remark</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.poDate}</td>
                  <td>{user.supplierName}</td>
                  <td>{user.itemNo}</td>
                  <td>{user.itemName}</td>
                  <td>{user.poQty}</td>
                  <td>{user.pendingQty}</td>
                  <td>{user.refPoNo}</td>
                  <td>{user.etaDate}</td>
                  <td>{user.partReceivingDate}</td>
                  <td>{user.remark}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
