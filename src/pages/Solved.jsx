import React, { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "../components/EditModal";

import { useAuthContext } from "../hooks/useAuthContext";

const Solved = () => {
  const [reports, setReports] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    // Making a request
    axios({
      method: "post",
      url: "https://bmhtpvs2m2.execute-api.us-east-2.amazonaws.com/tabsrender",
      cancelToken: cancelToken.token,
      data: { tab: "Closed - Case Solved" },
    })
      .then(function (response) {
        // handle success
        setReports(response.data);
      })
      .catch(function (error) {
        // handle error
        if (axios.isCancel(error)) {
          console.log("Request cancelled", error.message);
        }
      });

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-4 pb-4 w-full">
        <h1 className="text-xl text-white font-bold bg-orange-400 px-4 py-4 rounded-full">
          Under Investigation
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center pt-2 pb-20 w-full">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>id</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                {/* <th>Title</th>
              <th>Details</th> */}
                <th></th>
                <th>Complaint Date</th>
                {user && <th></th>}
              </tr>
            </thead>
            <tbody>
              {reports?.map((doc, index) =>
                doc.data.complain.map((detail) => (
                  <Details
                    key={doc.id}
                    detail={detail}
                    id={doc.id}
                    remarks={doc.data.remarks}
                    status={doc.data.status}
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
                {user && <th></th>}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

function Details({ detail, id, status, remarks, no }) {
  const { user } = useAuthContext();

  const { category, location, createdAt } = detail;

  return (
    <tr>
      <th>{no}</th>
      <td>{category}</td>
      <td>{location}</td>
      <td>{status}</td>
      <td></td>
      <td>{createdAt.slice(0, 10)}</td>

      {user && (
        <td>
          <EditModal
            key={id}
            id={id}
            detail={detail}
            status={status}
            remarks={remarks}
          />
        </td>
      )}

      {/* <td>
        <button className="btn btn-active btn-ghost">Delete</button>
      </td> */}
    </tr>
  );
}

export default Solved;
