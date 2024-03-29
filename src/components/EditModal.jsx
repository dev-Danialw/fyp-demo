import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import ModalImage from "react-modal-image";
import { useForm } from "react-hook-form";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const EditModal = ({ detail, id, status, remarks, feedback }) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { uid, title, category, location, description, createdAt, audio } =
    detail;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    if (data.status === "In Progress") {
      axios({
        method: "post",
        url: import.meta.env.VITE_REACT_DELETE_FEEDBACK,
        data: {
          uid: uid,
          complainId: id,
        },
      }).catch((error) => {
        setError("Something went wrong");
      });
    }

    axios({
      method: "post",
      url: import.meta.env.VITE_REACT_UPDATE_COMPLAINT_STATUS,
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
      url: import.meta.env.VITE_REACT_DELETE_COMPLAINT,
      data: {
        uid: uid,
        complainId: id,
        imageName: detail.imageName,
        audioName: detail.audioName,
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

      {user.uid === import.meta.env.VITE_REACT_ADMIN &&
        (status === "Closed - Complaint Resolved" ||
        status === "Closed - Complaint Dismissed" ? (
          <div
            onClick={onDeletePress}
            className="btn btn-ghost p-2 border-none"
          >
            <ion-icon name="trash" size="large"></ion-icon>
          </div>
        ) : null)}

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

          {status !== "Closed - Report Dismissed" && (
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
                <h2 className="card-title font-bold text-gray-700">
                  Complaint ID
                </h2>
                <p className="font-medium text-slate-700 text-lg">{id}</p>

                <h2 className="card-title">Submitted On</h2>
                <p className="font-medium text-slate-700 text-lg">
                  {createdAt.slice(0, 10)}
                </p>
              </div>

              <h2 className="card-title font-bold text-gray-700 ">Category</h2>
              <p className="font-medium text-slate-700 text-lg">{category}</p>
              <h2 className="card-title font-bold text-gray-700">Location</h2>
              <p className="font-medium text-slate-700 text-lg">{location}</p>
              <h2 className="card-title font-bold text-gray-700">Title</h2>
              <p className="whitespace-normal text-justify font-medium text-slate-700 text-lg">
                {title}
              </p>
              <h2 className="card-title font-bold text-gray-700">Details</h2>
              <p className="box-border block whitespace-normal break-words max-w-3xl text-justify font-medium text-slate-700 text-base">
                {description}
              </p>

              {audio && (
                <div className="mx-auto my-2 w-96">
                  <AudioPlayer src={detail.audio} />
                </div>
              )}

              <h2 className="card-title font-bold text-gray-700 print:hidden">
                Status
              </h2>
              <p
                className={`
              ${status === "Open - Complaint Received" && "bg-green-400"} 
              ${status === "In Progress" && "bg-orange-400"} 
              ${status === "Closed - Complaint Resolved" && "bg-green-600"} 
              ${status === "Closed - Complaint Dismissed" && "bg-red-500"} 
              text-white text-center text-lg font-bold px-2 py-2 rounded-md print:hidden`}
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
                    } w-fit mx-auto px-2 py-1 rounded-md text-white font-bold
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
          {status === "Open - Complaint Received" ||
          status === "In Progress" ||
          (feedback && feedback.satisfied === false) ? (
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
                  <option value="In Progress">In Progress</option>
                  <option value="Closed - Complaint Resolved">
                    Closed - Complaint Resolved
                  </option>
                  <option value="Closed - Complaint Dismissed">
                    Closed - Complaint Dismissed
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
