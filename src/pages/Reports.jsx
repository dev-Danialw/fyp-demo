import React, { useEffect, useState } from "react";
import EditModal from "../components/EditModal";

import { db } from "../firebase/config";
import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const ref = collectionGroup(db, "complain");
    const q = query(
      ref,
      where("status", "==", "Open - Complaint Received"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          console.log("No reports to load...");
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setReports(results);
        }
      },
      (err) => {
        console.log(err.message);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center pt-4 pb-4 w-full">
        <h1 className="text-xl text-white font-bold bg-green-500 px-4 py-4 rounded-full">
          Submitted - {reports?.length}
        </h1>
      </div>
      <div className="flex justify-center pt-2 pb-20 w-full">
        <div className="overflow-x-auto overflow-y-auto w-screen mx-24">
          <table className="table w-full">
            <thead>
              <tr>
                <th>id</th>
                <th>Category</th>
                <th>Location</th>
                <th>Complaint Date</th>
                <th>Complaint ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reports &&
                reports.map((doc, index) =>
                  doc.complain.map((detail) => (
                    <Details
                      key={doc.id}
                      detail={detail}
                      id={doc.id}
                      status={doc.status}
                      remarks={doc.remarks}
                      no={index}
                    />
                  ))
                )}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

function Details({ detail, id, status, remarks, no }) {
  const { category, location, createdAt } = detail;

  return (
    <tr>
      <th>{no}</th>
      <td>{category}</td>
      <td>{location}</td>
      <td>{createdAt.slice(0, 10)}</td>
      <td>{id}</td>
      <td>
        <EditModal
          key={id}
          id={id}
          detail={detail}
          status={status}
          remarks={remarks}
        />
      </td>
    </tr>
  );
}

export default Reports;
