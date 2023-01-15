import React, { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "../components/EditModal";

import { useAuthContext } from "../hooks/useAuthContext";

const Inprogress = () => {
  const [reports, setReports] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    // Making a request
    axios
      .get("http://127.0.0.1:8090/api/collections/reports/records", {
        cancelToken: cancelToken.token,
      })
      .then(function (response) {
        // handle success
        console.log(response.data.items);
        setReports(response.data.items);
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
              {reports?.map((detail) => (
                <Details key={detail.id} detail={detail} />
              ))}
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

function Details({ detail }) {
  const { user } = useAuthContext();
  const { id, title, category, location, description, status, created } =
    detail;

  return (
    <tr>
      <th>1</th>
      <td>{category}</td>
      <td>{location}</td>
      <td>{status}</td>
      <td></td>
      <td>{created}</td>

      {user && (
        <td>
          <EditModal key={id} detail={detail} />
        </td>
      )}

      {/* <td>
        <button className="btn btn-active btn-ghost">Delete</button>
      </td> */}
    </tr>
  );
}

export default Inprogress;
