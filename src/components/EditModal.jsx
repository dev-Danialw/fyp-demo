import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EditModal = ({ detail }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const { id, name, cnic, model, imei } = detail;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      cnic: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    axios
      .patch(
        `http://127.0.0.1:8090/api/collections/ownership/records/${id}`,
        data
      )
      .then((response) => {
        console.log(response);
        setSuccess("Data updated successfully");
        reset();
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong");
      });
  };

  return (
    <div>
      <label
        htmlFor={`my-modal-${id}`}
        className="btn btn-ghost p-2 border-none"
      >
        <ion-icon name="create" size="large"></ion-icon>
      </label>
      <input type="checkbox" id={`my-modal-${id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-center">
          <label
            htmlFor={`my-modal-${id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <table className="table mb-4">
            <thead>
              <tr>
                <th>Current Owner</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th>CNIC</th>
                <td>{cnic}</td>
              </tr>
              <tr>
                <th>Model</th>
                <td>{model}</td>
              </tr>
              <tr>
                <th>IMEI</th>
                <td>{imei}</td>
              </tr>
            </thead>
          </table>

          {/* <div className="card p-4 bg-slate-200 text-slate-600 mb-4">
            <p className="font-extrabold text-lg mb-2 text-center">
              Current Owner
            </p>
            <p className="font-bold text-base mb-4">Owner: {name}</p>
            <p className="font-bold text-base mb-4">Cnic: {cnic}</p>
            <p className="font-bold text-base mb-4">Model: {model}</p>
            <p className="font-bold text-base">IMEI: {imei}</p>
          </div> */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-5">
              {/* Name */}
              <input
                type="text"
                placeholder="New Owner's Name"
                className="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: true,
                  pattern: /^[a-zA-Z]+$/,
                })}
              />

              {errors.name && (
                <div className="alert alert-error shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Name is required.</span>
                  </div>
                </div>
              )}
              {/* Name */}

              {/* Cnic */}
              <input
                type="number"
                placeholder="New Owner's Cnic"
                className="input input-bordered w-full max-w-xs"
                {...register("cnic", {
                  required: true,
                  minLength: 13,
                  maxLength: 13,
                })}
              />

              {errors.cnic && (
                <div className="alert alert-error shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Valid cnic is required.</span>
                  </div>
                </div>
              )}
              {/* Cnic */}

              {/* registration Error || Success */}
              {error && (
                <div className="alert alert-error shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Device already registered.
                      <br />
                      {error}
                    </span>
                  </div>
                </div>
              )}

              {success && (
                <div className="alert alert-success shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{success}</span>
                  </div>
                </div>
              )}

              {/* Reg Btn */}
              <button className="btn" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
