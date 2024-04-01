import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/shared/Loading';
import Table from 'react-bootstrap/Table';
import './styleSheets/InventoryMaterialTransactions.css';
import getTodayDate from '../../utils/dates';

function InventoryMaterialTransactions() {
  const todayDate = getTodayDate();
  const [allTransactions, setallTransactions] = useState(null);
  const [filteredTransactions, setfilteredTransactions] = useState(null);
  const [transactionType, settransactionType] = useState('All');
  const [startDate, setstartDate] = useState('');
  const [endtDate, setendDate] = useState('');
  const [foundTransactions, setfoundTransactions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //console.log(allTransactions);
  async function fetchOrderHistory() {
    try {
      await axios
        .get(`/employees/material-transactions`)
        .then((res) => {
          setallTransactions(res?.data?.transactions);
          setfilteredTransactions(res?.data?.transactions);
          res?.data?.transactions?.length > 0 && setfoundTransactions(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    const filtered = allTransactions?.filter((transaction) => {
      const isTransactionTypeMatch =
        transactionType === 'All' ||
        transaction.transaction === transactionType;

      if (startDate && endtDate) {
        const isDateRangeMatch =
          transaction?.createdAt?.substring(0, 10) >= startDate &&
          transaction?.createdAt?.substring(0, 10) <= endtDate;
        return isTransactionTypeMatch && isDateRangeMatch;
      }
      return isTransactionTypeMatch;
    });
    filtered?.length > 0
      ? setfoundTransactions(true)
      : setfoundTransactions(false);
    setfilteredTransactions(filtered);
  }, [transactionType, startDate, endtDate]);

  console.log(foundTransactions);

  return (
    <>
      {!isLoading ? (
        <main className="materialTransactionsMain">
          <h2>Material Transactions</h2>
          <div className="materialTransactionsFilterNavbar">
            <div className="materialTransactionsFilterNavbarItem">
              <label htmlFor="transactionType">Transaction Type:</label>
              <select
                name="transactionType"
                id="transactionType"
                onChange={(e) => settransactionType(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Export">Export</option>
                <option value="Import">Import</option>
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
                onChange={(e) => setstartDate(e.target.value)}
              />
            </div>
            <div className="materialTransactionsFilterNavbarItem">
              <label htmlFor="endtDate">End Date:</label>
              <input
                type="date"
                id="endtDate"
                value={endtDate}
                max={todayDate}
                onChange={(e) => setendDate(e.target.value)}
              />
            </div>
            <div className="materialTransactionsFilterNavbarbuttons">
              <button
                type="submit"
                className="text-xl bg-slate-700 hover:bg-slate-800 text-white py-1 px-2 rounded-xl "
                onClick={() => {
                  settransactionType('All');
                  setendDate(todayDate);
                  setstartDate(todayDate);
                }}
              >
                <span className="flex mb-1">Today</span>
              </button>
              <button
                type="submit"
                className="text-xl ml-3 bg-slate-700 hover:bg-slate-800 text-white py-1 px-2 rounded-xl "
                onClick={() => {
                  settransactionType('All');
                  setendDate('');
                  setstartDate('');
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
                  <th>Name</th>
                  <th>Export</th>
                  <th>Import</th>
                  <th className="text-nowrap w-52">Remain Quantities</th>
                </tr>
              </thead>
              <tbody className="materialTransactionsTableBody">
                {filteredTransactions?.map((transaction) => {
                  console.log(filteredTransactions.length > 0);
                  const materials = transaction?.materials;
                  const isExport = transaction?.transaction === 'Export';
                  return materials?.map((element, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="text-nowrap">
                          {transaction?.createdAt?.substring(0, 10)}
                        </td>
                        <td>{element?.material?.name}</td>
                        <td>{isExport ? element?.quantity : ''}</td>
                        <td>{!isExport ? element?.quantity : ''}</td>
                        <td>{element?.material?.quantity}</td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </Table>
          </div>
          {!foundTransactions && (
            <div className="materialTransactionsNotfound">
              <p className="m-auto">No transaction found.</p>
            </div>
          )}
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default InventoryMaterialTransactions;
