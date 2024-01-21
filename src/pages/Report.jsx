import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../Components/Navbar";

const Report = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [userDatas, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [noData, setNoDATA] = useState(false);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://verygood-attendance-church.onrender.com/api/v1/reports/getReport",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.length === 0) {
        toast.error("No attendance Found");

        setTimeout(() => {
          navigate("/attendance");
        }, 2000);
      } else {
        console.log(res.data);
        setUserData(res.data.attendanceRecords);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const navigate = useNavigate();
  const handlePreviousReports = () => {
    navigate("/previousReports");
  };

  const handleAbarwayi = () => {
    navigate("/abarwayi");
  };

  return (
    <div className="report-container">
      {userDatas && (
        <div className="report-container">
          <Navbar />
          <table className="mt-[2%] mx-auto  m-b-[0.5rem]">
            <thead >
              <tr className="font-bold text-left sticky top-0 border-[1px]">
                <th className="border-[1px] p-4">Action</th>
                {userDatas.familyAttendance.map((family) => (
                  <th className="border-[1px] p-4" key={family._id}>{family.name}</th>
                ))}
                {userDatas.familyPercentages.map((family) => (
                  <th className="border-[1px] p-4" key={family._id}>{family.name} %</th>
                ))}
                <th className="border-[1px] p-4">Total</th>
                <th className="border-[1px] p-4">Total %</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-[1px] p-4">
                <td className=" border-[1px] p-4">Abaje</td>
                {userDatas.familyAttendance.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yaje}</td>
                ))}
                {userDatas.familyPercentages.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yaje}%</td>
                ))}
                <td className="border-[1px] p-4">{userDatas.GeneralPresenceRecords.yaje}</td>
                <td className="border-[1px] p-4">{userDatas.GeneralPercentageRecords.yaje} %</td>
              </tr>
             
              <tr>
                <td className="border-[1px] p-4 ">Abasibye</td>
                {userDatas.familyAttendance.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yaje}</td>
                ))}
                {userDatas.familyPercentages.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yaje}%</td>
                ))}
                <td className="border-[1px] p-4">{userDatas.GeneralPresenceRecords.yaje}</td>
                <td className="border-[1px] p-4">{userDatas.GeneralPercentageRecords.yaje} %</td>
              </tr>

              <tr>
                <td className="border-[1px] p-4">Abarwayi </td>
                {userDatas.familyAttendance.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.ararwaye}</td>
                ))}
                {userDatas.familyPercentages.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.ararwaye}%</td>
                ))}
                <td className="border-[1px] p-4">{userDatas.GeneralPresenceRecords.ararwaye}</td>
                <td className="border-[1px] p-4">{userDatas.GeneralPercentageRecords.ararwaye} %</td>
              </tr>

              <tr>
                <td className="border-[1px]  p-4">Abasuye</td>
                {userDatas.familyAttendance.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yarasuye}</td>
                ))}
                {userDatas.familyPercentages.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yarasuye}%</td>
                ))}
                <td className="border-[1px] p-4">{userDatas.GeneralPresenceRecords.yarasuye}</td>
                <td className="border-[1px] p-4">{userDatas.GeneralPercentageRecords.yarasuye} %</td>
              </tr>

              <tr>
                <td className="border-[1px] p-4 ">Abasuwe</td>
                {userDatas.familyAttendance.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yarasuwe}</td>
                ))}
                {userDatas.familyPercentages.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yarasuwe}%</td>
                ))}
                <td className="border-[1px] p-4">{userDatas.GeneralPresenceRecords.yarasuwe}</td>
                <td className="border-[1px] p-4">{userDatas.GeneralPercentageRecords.yarasuwe} %</td>
              </tr>

              <tr>
                <td className="border-[1px] p-4 ">Abafashije</td>
                {userDatas.familyAttendance.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yarafashije}</td>
                ))}
                {userDatas.familyPercentages.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yarafashije}%</td>
                ))}
                <td className="border-[1px] p-4">{userDatas.GeneralPresenceRecords.yarafashije}</td>
                <td className="border-[1px] p-4">{userDatas.GeneralPercentageRecords.yarafashije } %</td>
              </tr>

              <tr>
                <td className=" border-[1px] p-4">Abafashijwe</td>
                {userDatas.familyAttendance.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yarafashijwe}</td>
                ))}
                {userDatas.familyPercentages.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yarafashijwe}%</td>
                ))}
                <td className="border-[1px] p-4">{userDatas.GeneralPresenceRecords.yarafashijwe}</td>
                <td className="border-[1px] p-4">{userDatas.GeneralPercentageRecords.yarafashijwe} %</td>
              </tr>


             

              <tr>
                <td className="border-[1px]  p-4">Abize 7</td>
                {userDatas.familyAttendance.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yaje}</td>
                ))}
                {userDatas.familyPercentages.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yaje}%</td>
                ))}
                <td className="border-[1px] p-4">{userDatas.GeneralPresenceRecords.yaje}</td>
                <td className="border-[1px] p-4">{userDatas.GeneralPercentageRecords.yaje} %</td>
              </tr>

              <tr>
                <td className="border-[1px] p-4">Abatangiye isabato </td>
                {userDatas.familyAttendance.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yatangiyeIsabato}</td>
                ))}
                {userDatas.familyPercentages.map((family) => (
                  <td className="border-[1px] p-4" key={family._id}>{family.yatangiyeIsabato}%</td>
                ))}
                <td className="border-[1px] p-4">{userDatas.GeneralPresenceRecords.yatangiyeIsabato}</td>
                <td className="border-[1px] p-4">{userDatas.GeneralPercentageRecords.yatangiyeIsabato} %</td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center flex-row mb-[1em] mt-[1em] pl-[20%]">
           <div>
           <label className="text-[1.2em] mr-5" htmlFor="abashyitsi" >
              Visitors:
            </label>
           </div>
           <button className="h-[60px] mr-[3em] bg-black text-white px-8  rounded-lg">{userDatas.GeneralPresenceRecords.abashyitsi}</button>
          </div>

          <div className="flex flex-row justify-center  ">
            <div> 
            <button className="h-[60px] mr-[3em] bg-black text-white p-2 rounded-lg" onClick={handlePreviousReports}>
              Get previous reports
            </button>
            </div>
            <button className="h-[60px] bg-black text-white p-2 rounded-lg" onClick={handleAbarwayi}>Abarwayi</button>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default Report;
