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
          "https://attendance-pro.onrender.com/api/v1/members/getMembers",
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
      fetchData()
},1000)
  }, []);

  const allAttendance = useSelector((state) => state.addAttendance);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = {
      allAttendance,
      abashyitsi,
    };
    const res = await axios.post(
      "https://attendance-pro.onrender.com/api/v1/attendance/addAttendance",
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
      toast.success("Attendance added successfully")

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
        <div className="attendance-container">
          <Navbar />
          <form action="" className="attendanceform">
            <table className="home-table">
              <thead>
                <tr className="table-head-row">
                  <td>No</td>
                  <td>Name</td>
                  <td>Yaje</td>
                  <td>Ararwaye</td>
                  <td>Afite impamvu</td>
                  <td>Yarasuye</td>
                  <td>Yarasuwe</td>
                  <td>Yarafashije</td>
                  <td>Yarafashijwe</td>
                  <td>Yize 7</td>
                  <td>Yatangiye Isabato</td>
                </tr>
              </thead>
              <tbody>
                {allUsers
                  .slice()
                  .sort((a, b) => a.username.localeCompare(b.username))
                  .map((user, index) => {
                    const id = index + 1;
                    return <AttendanceRow user={user} index= {index} id={id} dispatch={dispatch} />;
                  })}
              </tbody>
            </table>
            <div className="abashyitsi">
              <input
                type="number"
                value={abashyitsi}
                name="abashyitsi"
                onChange={(e) => setAbashyitsi(e.target.value)}
                />
                <button type="submit" className="value-1" onClick={handleSubmit}>
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

const AttendanceRow = ({ user,id, dispatch , index }) => {
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
    yarafashijwe:user.yarafashijwe,
    ararwaye: user.ararwaye,
    yatangiyeIsabato: user.yatangiyeIsabato,
    afiteIndiMpamvu: user.afiteIndiMpamvu,
    yize7:user.yize7
  })


 

  
  return (
    <>
      {attendanceData &&
        <tr key={id} style={{
        }}>
          <td >{id}</td>
          <td>{username}</td>
          <td
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
              className={attendanceData.yaje ? "checked-checkbox" : ""}
            />
          </td>
          <td
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
              className={attendanceData.ararwaye ? "checked-checkbox" : ""}
            />
          </td>
          <td onClick={() => {
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
          }}>
            <input
              type="checkbox"
              name="afiteIndiMpamvu"
              checked={attendanceData.afiteIndiMpamvu}
              className={
                attendanceData.afiteIndiMpamvu ? "checked-checkbox" : ""
              }
            />
          </td>

          <td
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
              className={attendanceData.yarasuye ? "checked-checkbox" : ""}
              name="yarasuye"
            />
          </td>
          <td
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
              className={attendanceData.yarasuwe ? "checked-checkbox" : ""}
            />
          </td>

          <td
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
              className={attendanceData.ararwaye ? "checked-checkbox" : ""}
              checked={attendanceData.yarafashije}
            />
          </td>
          <td
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
              className={attendanceData.yarafashijwe ? "checked-checkbox" : ""}
            />
          </td>


          <td onClick={() => {
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
          }}>
            <input
              type="checkbox"
              name="afiteIndiMpamvu"
              checked={attendanceData.yize7}
              className={
                attendanceData.yize7 ? "checked-checkbox" : ""
              }
            />
          </td>

          <td
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
              className={
                attendanceData.yatangiyeIsabato ? "checked-checkbox" : ""
              }
            />
          </td>
        </tr>
}
    </>
    );
    
}


export default Attendance



