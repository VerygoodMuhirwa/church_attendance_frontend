import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'
import { addAttendance, updateAttendance } from "../slices/presentSlice";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
const Attendance = () => {
  const [abashyitsi, setAbashyitsi] = useState(0)
const token= JSON.parse(localStorage.getItem("token"))
  const dispatch  = useDispatch()
  const allUsers = useSelector((state) => state.addAttendance)
  const navigate= useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://church-attendance.onrender.com/api/v1/members/getMembers", {
          headers: {
              authorization: `Bearer ${token}`    
          }
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
              yize7:false
            };
            dispatch(addAttendance(initialStateValues));
          });
        } 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); 
  }, []);

  const allAttendance = useSelector((state) => state.addAttendance);
  
  const handleSubmit =async (e) => {
    e.preventDefault()
    const formdata = {
allAttendance,
      abashyitsi
    }
    const res = await axios.post("https://church-attendance.onrender.com/api/v1/attendance/addAttendance", formdata, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    if (res.data) {
      res.data.newRecord.attendanceData.forEach(data => {
        const formData = {
          id: data._id,
          username: data.username,
          email: data.email,
          Class: data.Class,
          family:data.family,
          yaje: false,
          yarasuye: false,
          yarasuwe: false,
          yarafashije: false,
          yarafashijwe: false,
          yatangiyeIsabato: false,
          afiteIndiMpamvu: false,
          ararwaye: false,
          yize7:false
        }

        dispatch(updateAttendance(formData))
      })
      navigate("/users")
}
  }
  return (
    <>
      {allUsers &&
        <div className="attendance-container">
        < Navbar />
        <form action="">
          <table className="home-table">
            <thead>
              <tr className="table-head-row">
                <td>No</td>
                <td>Username</td>
                <td>Yaje</td>
                <td>Ararwaye</td>
                <td>Afite Impamvu</td>
                <td>Yarasuye</td>
                <td>Yarasuwe</td>
                <td>Yarafashije</td>
                <td>Yarafashijwe</td>
                <td>Yize 7</td>
                <td>Yatangiye Isabato</td>
              </tr>
            </thead>
            <tbody>
              {allUsers.slice().sort((a, b) => a.username.localeCompare(b.username)).map((user, index) => {
                const id = index + 1
                return (
                  <AttendanceRow user={user} id={id} dispatch={dispatch} />
                );
              })}
            </tbody>
          </table>
          <div className="abashyitsi">
            <label htmlFor="abashyitsi"> Abashyitsi: </label>
            <input type="number" value={abashyitsi} name="abashyitsi" onChange={(e) => setAbashyitsi(e.target.value)} />
          </div>
          <button type="submit" className="value-1" onClick={handleSubmit}>Submit</button>
        </form>
      </div>}
    </>
  );
  
}


const AttendanceRow = ({ user,id, dispatch }) => {
  const username= user.username;  
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
        <tr key={id}>
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



