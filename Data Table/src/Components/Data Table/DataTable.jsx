import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [cityFilter, setCityFilter] = useState("All");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const cities = ["All", ...new Set(data.map((user) => user.address.city))];

    const filteredData = data.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesCity = cityFilter === "All" || user.address.city === cityFilter;
        return matchesSearch && matchesCity;
    });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const valA =
            sortConfig.key === "city"
                ? a.address.city.toLowerCase()
                : a[sortConfig.key].toLowerCase();
        const valB =
            sortConfig.key === "city"
                ? b.address.city.toLowerCase()
                : b[sortConfig.key].toLowerCase();

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return "⇅";
        return sortConfig.direction === "asc" ? "↑" : "↓";
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 fw-bold text-primary">User Data Table</h2>

            <div className="row mb-3">
                <div className="col-md-8 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Search by name, username or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-4 mb-2">
                    <select
                        className="form-select"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                    >
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center mt-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive shadow-sm">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-primary">
                            <tr>
                                <th>#</th>
                                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                                    Name {getSortIcon("name")}
                                </th>
                                <th onClick={() => handleSort("username")} style={{ cursor: "pointer" }}>
                                    Username {getSortIcon("username")}
                                </th>
                                <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                                    Email {getSortIcon("email")}
                                </th>
                                <th onClick={() => handleSort("city")} style={{ cursor: "pointer" }}>
                                    City {getSortIcon("city")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.length > 0 ? (
                                sortedData.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>@{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address.city}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                        No matching users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <style>{`
        th {
          text-align: center;
          user-select: none;
        }
        td {
          text-align: center;
        }
        th:hover {
          background-color: #e9ecef;
        }
      `}</style>
        </div>
    );
};

export default DataTable;
