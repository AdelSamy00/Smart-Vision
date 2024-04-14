import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/shared/Loading";
import Table from "react-bootstrap/Table";
import getTodayDate from "../../utils/dates";
import { Link } from "react-router-dom";

function ProductOrderHistory() {
  const todayDate = getTodayDate();
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("orders");
  const [filteredData, setFilteredData] = useState([]);
  const [orderState, setOrderState] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true); 
    try {
      const res = await axios.get(`/employees/${dataType}`);
      setData(res?.data[dataType]);
    } catch (error) {
      console.error(`Error fetching ${dataType} history:`, error);
    } finally {
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    fetchData();
  }, [dataType]);

  useEffect(() => {
    if (data) {
      let filtered = data.filter((item) =>
        orderState === "All"
          ? true
          : item.state.toLowerCase() === orderState.toLowerCase()
      );

      if (startDate && endDate) {
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.createdAt.substring(0, 10));
          const start = new Date(startDate);
          const end = new Date(endDate);
          return itemDate >= start && itemDate <= end;
        });
      }

      // Sort filtered data by createdAt
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setFilteredData(filtered);
    }
  }, [data, orderState, startDate, endDate]);
  console.log(filteredData);

  return (
    <>
      {!isLoading ? (
        <main className="materialTransactionsMain">
          <h2 style={{ marginBottom: "2rem" }}>History</h2>
          <div className="materialTransactionsFilterNavbar">
            <div className="materialTransactionsFilterNavbarItem">
              <label htmlFor="HistoryType">History Type:</label>
              <select
                value={dataType}
                id="HistoryType"
                onChange={(e) => setDataType(e.target.value)}
              >
                <option value="orders">Orders</option>
                <option value="services">Services</option>
              </select>
            </div>
            <div className="materialTransactionsFilterNavbarItem">
              <label htmlFor="transactionType">State:</label>
              <select
                name="transactionType"
                id="transactionType"
                onChange={(e) => setOrderState(e.target.value)}
                value={orderState}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Canceled">Canceled</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>
            <div className="materialTransactionsFilterNavbarItem">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                className="materilaTransactionSelectTransactionType"
                max={todayDate}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="materialTransactionsFilterNavbarItem">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                max={todayDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="materialTransactionsFilterNavbarbuttons">
              <button
                type="submit"
                className="text-xl bg-slate-700 hover:bg-slate-800 text-white py-1 px-2 rounded-xl "
                onClick={() => {
                  setOrderState("All");
                  setEndDate(todayDate);
                  setStartDate(todayDate);
                }}
              >
                <span className="flex mb-1">Today</span>
              </button>
              <button
                type="submit"
                className="text-xl ml-3 bg-slate-700 hover:bg-slate-800 text-white py-1 px-2 rounded-xl "
                onClick={() => {
                  setOrderState("All");
                  setEndDate("");
                  setStartDate("");
                }}
              >
                <span className="flex mb-1">Clear</span>
              </button>
            </div>
          </div>
          <div className="materialTransactionsTableDiv">
            <Table striped bordered hover responsive>
              <thead className="materialTransactionsTableHead">
                <tr>
                  <th>Date</th>
                  <th className="text-nowrap w-52">
                    {dataType === "orders" ? "Order Number" : "Service Type"}
                  </th>
                  <th>State</th>
                  <th className="text-nowrap w-52">Customer</th>
                  <th className="text-nowrap w-52">
                    {dataType === "orders"
                      ? "Total Price"
                      : "Assigned Engineer"}
                  </th>
                  <th className="text-nowrap w-52">Details</th>
                </tr>
              </thead>
              <tbody className="materialTransactionsTableBody">
                {filteredData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-nowrap">
                      {item.createdAt?.substring(0, 10)}
                    </td>
                    <td>
                      {dataType === "orders" ? item.orderNumber : item.service}
                    </td>
                    <td>{item.state}</td>
                    <td>
                      {dataType === "orders"
                        ? item.customerData?.firstName +
                          " " +
                          item.customerData?.lastName
                        : item.customer?.username || "Unknown"}{" "}
                    </td>
                    <td>
                      {dataType === "orders"
                        ? item?.totalPrice
                        : item?.assignedEngineer?.username}
                    </td>
                    <td>
                      {dataType === "orders" ? (
                        <>
                          <Link to={`/operator/order-details/${item._id}`}>
                            <button style={{ textDecoration: "underline" }}>
                              Click Me
                            </button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to={`/operator/servise-details/${item._id}?from=Servishistory`}
                          >
                            <button style={{ textDecoration: "underline" }}>
                              Click Me
                            </button>
                          </Link>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {!filteredData.length && (
            <div className="materialTransactionsNotfound">
              <p className="m-auto">No {dataType} found.</p>
            </div>
          )}
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ProductOrderHistory;
