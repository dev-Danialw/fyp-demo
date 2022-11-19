import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ownership = () => {
  const [stolen, setStolen] = useState();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    // Making a request
    axios
      .get("http://127.0.0.1:8090/api/collections/stolen/records", {
        cancelToken: cancelToken.token,
      })
      .then(function (response) {
        // handle success
        console.log(response.data.items);
        setStolen(response.data.items);
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
      <div className="flex flex-row justify-center items-center py-20 w-full">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>CNIC</th>
                <th>Model</th>
                <th>IMEI</th>
                <th>Reported On</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stolen?.map((detail) => (
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
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

function Details({ detail }) {
  const { id, name, cnic, model, imei, created } = detail;
  const navigate = useNavigate();

  // Delete Data
  const removeRecord = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8090/api/collections/stolen/records/${id}`
      );
      console.log("Item successfully deleted.");
      navigate(0);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <tr>
      <th>1</th>
      <td>{name}</td>
      <td>{cnic}</td>
      <td>{model}</td>
      <td>{imei}</td>
      <td>{created}</td>
      <td>
        <button className="btn btn-ghost p-2 border-none">
          <ion-icon name="create" size="large"></ion-icon>
        </button>
      </td>

      <td>
        <button className="btn btn-ghost p-2" onClick={() => removeRecord(id)}>
          <ion-icon name="close-circle" size="large"></ion-icon>
        </button>
      </td>
    </tr>
  );
}

export default Ownership;
