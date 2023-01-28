import React, { useState } from "react";
import axios from "axios";
import ModalImage from "react-modal-image";
import { useForm } from "react-hook-form";

const EditModal = ({ detail, id, status, remarks, feedback }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { uid, title, category, location, description, createdAt } = detail;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    axios({
      method: "post",
      url: "https://bmhtpvs2m2.execute-api.us-east-2.amazonaws.com/updateStatus",
      data: {
        uid: uid,
        complainId: id,
        status: data.status,
        remarks: data.remarks.trim(),
      },
    })
      .then((response) => {
        // console.log(response);
        setSuccess("Data updated successfully");
        reset();
      })
      .catch((error) => {
        // console.log(error);
        setError("Something went wrong");
      });
  };

  const onDeletePress = async () => {
    axios({
      method: "post",
      url: "https://bmhtpvs2m2.execute-api.us-east-2.amazonaws.com/deleteComplain",
      data: {
        uid: uid,
        complainId: id,
        imageName: detail.imageName,
      },
    })
      .then((response) => {
        // console.log(response);
        setSuccess("Data Deleted successfully");
      })
      .catch((error) => {
        // console.log(error);
        setError("Something went wrong");
      });
  };

  return (
    <>
      <label
        htmlFor={`my-modal-${id}`}
        className="btn btn-ghost p-2 border-none"
      >
        <ion-icon name="create" size="large"></ion-icon>
      </label>
      <div onClick={onDeletePress} className="btn btn-ghost p-2 border-none">
        <ion-icon name="trash" size="large"></ion-icon>
      </div>

      <input
        type="checkbox"
        id={`my-modal-${id}`}
        className="modal-toggle"
        onClick={() => {
          setSuccess(false);
          setError(false);
        }}
      />
      <div className="modal">
        <div
          className="modal-box flex flex-col items-center min-w-fit min-h-fit print:h-full print:overflow-visible scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-slate-300
        scrollbar-corner-transparent
        "
        >
          <label
            htmlFor={`my-modal-${id}`}
            className="btn btn-md btn-circle absolute z-50 right-5 top-5 print:hidden"
          >
            ✕
          </label>

          {status !== "Closed - Report Discarded" && (
            <label className="btn btn-md btn-circle absolute z-50 left-5 top-5 print:hidden">
              <ion-icon
                name="print"
                size="large"
                onClick={() => window.print()}
              />
            </label>
          )}

          {/*  */}
          <div className="card">
            <figure className="block max-w-md max-h-80 mx-auto rounded-2xl ">
              {detail.image && (
                <ModalImage
                  small={detail.image}
                  large={detail.image}
                  hideDownload
                  alt="Evidence"
                  className="cursor-pointer max-w-full max-h-full"
                />
              )}
            </figure>
            <div className="card-body self-start">
              <div className="self-center flex flex-col items-center gap-2 mb-4">
                <h2 className="card-title">Complaint ID</h2>
                <p>{id}</p>

                <h2 className="card-title">Submitted On</h2>
                <p>{createdAt.slice(0, 10)}</p>
              </div>

              <h2 className="card-title">Category</h2>
              <p>{category}</p>
              <h2 className="card-title">Location</h2>
              <p>{location}</p>
              <h2 className="card-title">Title</h2>
              <p className="whitespace-normal text-justify">{title}</p>
              <h2 className="card-title">Details</h2>
              <p className="box-border block whitespace-normal break-words max-w-3xl text-justify">
                {description}
              </p>
              <h2 className="card-title print:hidden">Status</h2>
              <p
                className={`
              ${status === "Submitted" && "bg-green-400"} 
              ${
                status === "Open - Case Under Investigation" && "bg-orange-400"
              } 
              ${status === "Closed - Case Solved" && "bg-green-600"} 
              ${status === "Closed - Report Discarded" && "bg-red-500"} 
              text-white text-center text-lg font-semibold px-2 py-2 rounded-md print:hidden`}
              >
                {status}
              </p>

              {remarks && (
                <>
                  <h2 className="card-title print:hidden">Remarks</h2>
                  <p className="box-border block whitespace-normal break-words max-w-3xl text-justify print:hidden">
                    {remarks}
                  </p>
                </>
              )}

              {feedback && (
                <>
                  <h2 className="card-title print:hidden">Feedback</h2>
                  <p
                    className={`box-border block text-center ${
                      feedback.satisfied ? "bg-green-300" : "bg-orange-600"
                    } w-fit mx-auto px-2 py-1 rounded-md
                print:hidden`}
                  >
                    {feedback.satisfied ? "Satisfied" : "Not Satisfied"}
                  </p>

                  <p className="box-border block whitespace-normal break-words max-w-3xl text-justify print:hidden">
                    {feedback.comment}
                  </p>
                </>
              )}
            </div>
          </div>
          {/*  */}

          {/* show form when status in submitted or under investigation */}
          {status === "Submitted" ||
          status === "Open - Case Under Investigation" ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="print:hidden"
            >
              <div className="flex flex-col gap-5">
                {/* select input for statuses */}
                <select
                  className="input input-bordered w-full max-w-xs"
                  {...register("status", {
                    required: "default empty status",
                  })}
                >
                  <option value="">Select Status Update</option>
                  <option value="Open - Case Under Investigation">
                    Open - Case Under Investigation
                  </option>
                  <option value="Closed - Case Solved">
                    Closed - Case Solved
                  </option>
                  <option value="Closed - Report Discarded">
                    Closed - Report Discarded
                  </option>
                </select>

                {/* remarks input */}
                <textarea
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Remarks"
                  {...register("remarks", {
                    required: false,
                  })}
                ></textarea>

                {errors.status && (
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
                      <span>Status Update is required.</span>
                    </div>
                  </div>
                )}
                {/* Name */}

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
                      <span>{error}</span>
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
                  Update
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default EditModal;
