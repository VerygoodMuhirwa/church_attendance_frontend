import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { addAttendance, updateAttendance } from "../slices/presentSlice";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Attendance = () => {
  const [abashyitsi, setAbashyitsi] = useState(0);
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.addAttendance);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://verygood-attendance-church.onrender.com/api/v1/members/getMembers",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data) {
          res.data.modifiedUserDocument.members.forEach((data) => {
            const initialStateValues = {
              ...data,
              yaje: false,
              yarasuye: false,
              yarasuwe: false,
              ararwaye: false,
              yarafashije: false,
              yarafashijwe: false,
              yatangiyeIsabato: false,
              afiteIndiMpamvu: false,
              yize7: false,
            };
            dispatch(addAttendance(initialStateValues));
          });
          setLoading(false); // Set loading to false when data is fetched
        }
      } catch (error) {
        console.log(error);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const allAttendance = useSelector((state) => state.addAttendance);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = {
      allAttendance,
      abashyitsi,
    };
    const res = await axios.post(
      "https://verygood-attendance-church.onrender.com/api/v1/attendance/addAttendance",
      formdata,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data) {
      res.data.newRecord.attendanceData.forEach((data) => {
        const formData = {
          id: data._id,
          username: data.username,
          email: data.email,
          Class: data.Class,
          family: data.family,
          yaje: false,
          yarasuye: false,
          yarasuwe: false,
          yarafashije: false,
          yarafashijwe: false,
          yatangiyeIsabato: false,
          afiteIndiMpamvu: false,
          ararwaye: false,
          yize7: false,
        };

        dispatch(updateAttendance(formData));
      });
      toast.success("Attendance added successfully");

      setTimeout(() => {
        navigate("/users");
      }, 2000);
    }
  };

  return (
    <>
      {loading ? ( // Conditional rendering based on loading state
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div>
          <Navbar />
          <form>
            <table className="mt-[0.5rem] mx-auto  m-b-[0.5rem]">
              <thead>
                <tr className="font-bold sticky top-0 bg-white ">
                  <td className="border-[1px] p-4">No</td>
                  <td className="border-[1px] p-4">Name</td>
                  <td className="border-[1px] p-4">Yaje</td>
                  <td className="border-[1px] p-4">Ararwaye</td>
                  <td className="border-[1px] p-4">Afite impamvu</td>
                  <td className="border-[1px] p-4">Yarasuye</td>
                  <td className="border-[1px] p-4">Yarasuwe</td>
                  <td className="border-[1px] p-4">Yarafashije</td>
                  <td className="border-[1px] p-4">Yarafashijwe</td>
                  <td className="border-[1px] p-4">Yize 7</td>
                  <td className="border-[1px] p-4">Yatangiye Isabato</td>
                </tr>
              </thead>
              <tbody>
                {allUsers
                  .slice()
                  .sort((a, b) => a.username.localeCompare(b.username))
                  .map((user, index) => {
                    const id = index + 1;
                    return (
                      <AttendanceRow
                        user={user}
                        index={index}
                        id={id}
                        dispatch={dispatch}
                      />
                    );
                  })}
              </tbody>
            </table>
            <div className="abashyitsi">
              <input
                type="number"
                value={abashyitsi}
                name="abashyitsi"
                className="border-[1px] indent-5 rounded-lg mt-[1em] mr-[12%] border-black h-[50px] "
                placeholder="Visitors"
                onChange={(e) => setAbashyitsi(e.target.value)}
              />
              <button
                type="submit"
                className="mt-[1em]  w-[180px] mr-[12%] text-white bg-black rounded-lg h-[50px] text-[1em] cursor-pointer "
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
          <Toaster />
        </div>
      )}
    </>
  );
};

const AttendanceRow = ({ user, id, dispatch, index }) => {
  const username = user.username;
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const [attendanceData, setAttendanceData] = useState({
    id: user._id,
    username: user.username,
    yaje: user.yaje,
    yarasuwe: user.yarasuwe,
    yarasuye: user.yarasuye,
    yarafashije: user.yarafashije,
    yarafashijwe: user.yarafashijwe,
    ararwaye: user.ararwaye,
    yatangiyeIsabato: user.yatangiyeIsabato,
    afiteIndiMpamvu: user.afiteIndiMpamvu,
    yize7: user.yize7,
  });

  return (
    <>
      {attendanceData && (
        <tr key={id} style={{}}>
          <td className="border-[1px] p-4">{id}</td>
          <td className="border-[1px] p-4">{username}</td>
          <td
            className="border-[1px] p-4"
            onClick={() => {
              setAttendanceData((prevData) => ({
                ...prevData,
                yaje: !prevData.yaje,
              }));
              const handleUserData1 = (prevData) => {
                const updatedValue = { ...prevData, yaje: !prevData.yaje };
                dispatch(updateAttendance(updatedValue));
              };
              handleUserData1(attendanceData);
            }}
          >
            <input
              type="checkbox"
              name="yaje"
              checked={attendanceData.yaje}
              value={attendanceData.yaje}
            />
          </td>
          <td
            className="border-[1px] p-4"
            onClick={() => {
              setAttendanceData((prevData) => ({
                ...prevData,
                ararwaye: !prevData.ararwaye,
              }));
              const handleUserData1 = (prevData) => {
                const updatedValue = {
                  ...prevData,
                  ararwaye: !prevData.ararwaye,
                };
                dispatch(updateAttendance(updatedValue));
              };
              handleUserData1(attendanceData);
            }}
          >
            <input
              type="checkbox"
              name="ararwaye"
              checked={attendanceData.ararwaye}
            />
          </td>
          <td
            className="border-[1px] p-4"
            onClick={() => {
              setAttendanceData((prevData) => ({
                ...prevData,
                afiteIndiMpamvu: !prevData.afiteIndiMpamvu,
              }));
              const handleUserData1 = (prevData) => {
                const updatedValue = {
                  ...prevData,
                  afiteIndiMpamvu: !prevData.afiteIndiMpamvu,
                };
                dispatch(updateAttendance(updatedValue));
              };
              handleUserData1(attendanceData);
            }}
          >
            <input
              type="checkbox"
              name="afiteIndiMpamvu"
              checked={attendanceData.afiteIndiMpamvu}
            />
          </td>

          <td
            className="border-[1px] p-4"
            onClick={() => {
              setAttendanceData((prevData) => ({
                ...prevData,
                yarasuye: !prevData.yarasuye,
              }));
              const handleUserData1 = (prevData) => {
                const updatedValue = {
                  ...prevData,
                  yarasuye: !prevData.yarasuye,
                };
                dispatch(updateAttendance(updatedValue));
              };
              handleUserData1(attendanceData);
            }}
          >
            <input
              checked={attendanceData.yarasuye}
              type="checkbox"
              name="yarasuye"
            />
          </td>
          <td
            className="border-[1px] p-4"
            onClick={() => {
              setAttendanceData((prevData) => ({
                ...prevData,
                yarasuwe: !prevData.yarasuwe,
              }));
              const handleUserData1 = (prevData) => {
                const updatedValue = {
                  ...prevData,
                  yarasuwe: !prevData.yarasuwe,
                };
                dispatch(updateAttendance(updatedValue));
              };
              handleUserData1(attendanceData);
            }}
          >
            <input
              checked={attendanceData.yarasuwe}
              type="checkbox"
              name="yarasuwe"
            />
          </td>

          <td
            className="border-[1px] p-4"
            onClick={() => {
              setAttendanceData((prevData) => ({
                ...prevData,
                yarafashije: !prevData.yarafashije,
              }));
              const handleUserData1 = (prevData) => {
                const updatedValue = {
                  ...prevData,
                  yarafashije: !prevData.yarafashije,
                };
                dispatch(updateAttendance(updatedValue));
              };
              handleUserData1(attendanceData);
            }}
          >
            <input
              type="checkbox"
              name="yarafashije"
              checked={attendanceData.yarafashije}
            />
          </td>
          <td
            className="border-[1px] p-4"
            onClick={() => {
              setAttendanceData((prevData) => ({
                ...prevData,
                yarafashijwe: !prevData.yarafashijwe,
              }));
              const handleUserData1 = (prevData) => {
                const updatedValue = {
                  ...prevData,
                  yarafashijwe: !prevData.yarafashijwe,
                };
                dispatch(updateAttendance(updatedValue));
              };
              handleUserData1(attendanceData);
            }}
          >
            <input
              type="checkbox"
              name="yarafashijwe"
              checked={attendanceData.yarafashijwe}
            />
          </td>

          <td
            className="border-[1px] p-4"
            onClick={() => {
              setAttendanceData((prevData) => ({
                ...prevData,
                yize7: !prevData.yize7,
              }));
              const handleUserData1 = (prevData) => {
                const updatedValue = {
                  ...prevData,
                  yize7: !prevData.yize7,
                };
                dispatch(updateAttendance(updatedValue));
              };
              handleUserData1(attendanceData);
            }}
          >
            <input
              type="checkbox"
              name="afiteIndiMpamvu"
              checked={attendanceData.yize7}
            />
          </td>

          <td
            className="border-[1px] p-4"
            onClick={() => {
              setAttendanceData((prevData) => ({
                ...prevData,
                yatangiyeIsabato: !prevData.yatangiyeIsabato,
              }));
              const handleUserData1 = (prevData) => {
                const updatedValue = {
                  ...prevData,
                  yatangiyeIsabato: !prevData.yatangiyeIsabato,
                };
                dispatch(updateAttendance(updatedValue));
              };
              handleUserData1(attendanceData);
            }}
          >
            <input
              type="checkbox"
              name="yatangiyeIsabato"
              checked={attendanceData.yatangiyeIsabato}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default Attendance;
