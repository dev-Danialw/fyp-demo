import React, { useState } from "react";

const Ownership = () => {
  const [stolen, setStolen] = useState([
    {
      id: 1,
      name: "Adan Ali",
      cnic: "1310298765432",
      model: "Samsung A7",
      imei: "123456789987654",
    },
    {
      id: 2,
      name: "Jawad Khan",
      cnic: "1310298765432",
      model: "iPhone 12",
      imei: "123456789987652",
    },
    {
      id: 3,
      name: "Mukhtaara",
      cnic: "1310298765432",
      model: "Motrolla G3",
      imei: "123456789987651",
    },
    {
      id: 4,
      name: "Hammad",
      cnic: "1310298765432",
      model: "RealMe Note 5",
      imei: "123456789987664",
    },
  ]);

  return (
    <div className="flex flex-row justify-center items-center gap-20 h-screen w-screen">
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>CNIC</th>
              <th>Model</th>
              <th>IMEI</th>
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
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

function Details({ detail }) {
  const { name, cnic, model, imei } = detail;

  return (
    <tr>
      <th>1</th>
      <td>{name}</td>
      <td>{cnic}</td>
      <td>{model}</td>
      <td>{imei}</td>
      <td>
        <button className="btn btn-active btn-ghost">Edit</button>
      </td>

      <td>
        <button className="btn btn-active btn-ghost">Delete</button>
      </td>
    </tr>
  );
}

export default Ownership;
