import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      cnic: "",
      model: "",
      imei: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    // Send a POST request
    axios({
      method: "post",
      url: "http://127.0.0.1:8090/api/collections/stolen/records",
      data,
    })
      .then((response) => {
        console.log(response.status);
        setSuccess("Device Reported successfully.");
        setError(null);
        reset("", {
          keepValues: false,
        });
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data.data.imei.message);
          setSuccess(null);
        }
      });
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center gap-20 h-screen w-screen">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-5">
            {/* Name */}
            <input
              type="text"
              placeholder="NAME"
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
              placeholder="CNIC"
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

            {/* Model */}
            <input
              type="text"
              placeholder="MODEL"
              className="input input-bordered w-full max-w-xs"
              {...register("model", {
                required: true,
              })}
            />

            {errors.model && (
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
                  <span>Model is required.</span>
                </div>
              </div>
            )}
            {/* Model */}

            {/* Imei */}
            <input
              type="number"
              placeholder="IMEI"
              className="input input-bordered w-full max-w-xs"
              {...register("imei", {
                required: true,
                minLength: 15,
                maxLength: 15,
              })}
            />

            {errors.imei && (
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
                  <span>Valid IMEI is required.</span>
                </div>
              </div>
            )}
            {/* Imei */}

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
                    Device already reported.
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
              Report
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
