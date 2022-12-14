import React, { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "../components/EditModal";

import { useAuthContext } from "../hooks/useAuthContext";

const Ownership = () => {
  const [owners, setOwners] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    // Making a request
    axios
      .get("http://127.0.0.1:8090/api/collections/ownership/records", {
        cancelToken: cancelToken.token,
      })
      .then(function (response) {
        // handle success
        console.log(response.data.items);
        setOwners(response.data.items);
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
    <div className="flex flex-row justify-center items-center pt-2 pb-20 w-full">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>CNIC</th>
              <th>Model</th>
              <th>IMEI</th>
              <th>Registeration Date</th>
              {user && <th></th>}
            </tr>
          </thead>
          <tbody>
            {owners?.map((detail) => (
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
  );
};

function Details({ detail }) {
  const { user } = useAuthContext();
  const { id, name, cnic, model, imei, created } = detail;

  return (
    <tr>
      <th>1</th>
      <td>{name}</td>
      <td>{cnic}</td>
      <td>{model}</td>
      <td>{imei}</td>
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

export default Ownership;
