import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Button } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
const PreviousReports = () => {
  const [userDatas, setUserData] = useState();
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const fetchData = async () => {
    const res = await axios.get(
      "https://verygood-attendance-church.onrender.com/api/v1/reports/getPreviousReports",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data) {
      console.log(res.data);
      setUserData(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAttendanceDelete = async (id) => {
    const response = await axios.delete(
      "https://verygood-attendance-church.onrender.com/api/v1/attendance/deleteAttendance/" + id,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    console.log();
    if (response.data) {
      toast.success("Attendance deleted successfully");
      window.location.reload();
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-[1em] pl-[2em] ">
        {userDatas ? (
          userDatas.map((data) => {
            return (
              <div className="pt-[1em]">
                <span
                  onClick={async () => {
                    const formData = {
                      date: data.date,
                      month: data.month,
                    };

                    const res = await axios.get(
                      "https://verygood-attendance-church.onrender.com/api/v1/reports/getSingleReport/" +
                        data.id,
                      {
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    if (res.data) {
                      console.log(res.data);
                      localStorage.setItem(
                        "prevReportDatas",
                        JSON.stringify(res.data)
                      );
                      navigate("/singleRecord");
                    }
                  }}
                >
                  {" "}
                  Kuwa {data.date}/{data.month}/2023
                </span>
                <Button
                  style={{ marginLeft: "1em" }}
                  onClick={() => handleAttendanceDelete(data.id)}
                >
                  Delete
                </Button>
                <Toaster />
              </div>
            );
          })
        ) : (
          <>
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PreviousReports;
