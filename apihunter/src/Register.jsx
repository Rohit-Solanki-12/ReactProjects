import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Users from API
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  // Load users on page load
  useEffect(() => {
    getUsers();
  }, []);

  // Submit form
  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/users", data);

      getUsers(); // refresh table after register
      reset(); // clear inputs
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Loading UI
  if (loading) {
    return <h3 style={{ marginTop: "20px" }}>Loading users...</h3>;
  }

  return (
    <>
      <h1>Register</h1>

      <form
        className="row g-3 needs-validation"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="col-md-4">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            {...register("firstName")}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            {...register("lastName")}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email")}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            {...register("phone")}
            required
          />
        </div>

        <div className="col-12 mt-3">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>

      {/* TABLE */}
      <h2 className="mt-4">Registered Users</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Register;
