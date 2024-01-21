import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const [userDatas, setUserData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    const res = await axios.get(
      "https://verygood-attendance-church.onrender.com/api/v1/members/getMembers",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.error) {
      setLoading(true);
      toast.error("No members found ... ");
      setLoading(false);
    } else {
      setLoading(true);
      setUserData(res.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/formData");
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(
      "https://verygood-attendance-church.onrender.com/api/v1/members/deleteMember/" + id,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data) {
      window.location.reload();
    }
  };

  const handleUpdate = async (data) => {
    localStorage.setItem("userToUpdate", JSON.stringify(data));
    navigate("/update");
  };
  return (
    <>
      {userDatas ? (
        <div>
          {loading && loading && (
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
            </div>
          )}
          <Navbar />
          <div className="pl-[25%]">
            <button
              className="mt-[1em] w-[180px] text-white bg-black rounded-lg h-[50px] text-[1em] cursor-pointer"
              onClick={handleClick}
            >
              Add New User
            </button>{" "}
          </div>
          <div>
            <table className="  border-[1px] mb-[0.5rem] mt-[0.5rem] w-[50%] mx-auto">
              <thead >
                <tr className="sticky top-0 bg-white  border-none">
                  <th className=" border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px]  w-fit h-[50px] text-[rgb(62, 61, 61)]">
                    No
                  </th>
                  <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                    Username
                  </th>
                  <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                    Email
                  </th>
                  <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                    Class
                  </th>
                  <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                    Family
                  </th>
                  <th
                    className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)] text-center"
                    style={{ textAlign: "center" }}
                  >
                    Delete
                  </th>
                  <th className="border-[1px] border-r-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)] text-center">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {userDatas.modifiedUserDocument.members
                  .slice()
                  .sort((a, b) => a.username.localeCompare(b.username))
                  .map((data, index) => {
                    const id = index + 1;
                    return (
                      <tr key={data._id}>
                        <td className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                          {id}
                        </td>
                        <td className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                          {data.username}
                        </td>
                        <td className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                          {data.email}
                        </td>
                        <td className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                          {data.Class}
                        </td>
                        <td className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                          {data.family}
                        </td>
                        <td className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                          <Button
                            style={{ textAlign: "center" }}
                            className="value"
                            onClick={() => handleDelete(data._id)}
                          >
                            Delete
                          </Button>
                        </td>
                        <td className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                          <Button
                            className="value"
                            onClick={() => {
                              handleUpdate(data);
                            }}
                          >
                            update
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div>
            <Navbar />
            <div className="pl-[30%]">
              <button
                className="mt-[1em]  w-[180px] text-white bg-black rounded-lg h-[50px] text-[1em] cursor-pointer "
                onClick={handleClick}
              >
                Add New User
              </button>
            </div>
            <div className="home-container">
              <table className="home-table">
                <thead>
                  <tr className="sticky top-0 bg-white ">
                    <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                      No
                    </th>
                    <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                      Username
                    </th>
                    <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                      Email
                    </th>
                    <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                      Class
                    </th>
                    <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                      Family
                    </th>
                    <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)] text-center">
                      Delete
                    </th>
                    <th className="border-[1px] cursor-pointer text-left p-[0.5rem] text-[16px] w-fit h-[50px] text-[rgb(62, 61, 61)]">
                      Update
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </>
      )}

      <Toaster />
    </>
  );
};

export default Homepage;
