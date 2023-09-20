

import React,{useState , useEffect} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
const Report = () => {

    const token= JSON.parse(localStorage.getItem("token"))
    const [userDatas, setUserData] = useState()
    const [loading,setLoading] = useState(true)
    const fetchData = async () => {
        const res = await axios.get("https://attendance-pro.onrender.com/api/v1/reports/getReport", {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if (Array.isArray(res.data)) {
            setLoading(false)
return
        } else {
            setUserData(res.data)
            setLoading(false)
      }
       

    }
    useEffect(() => {
setTimeout(() => {
    fetchData();
}, 1000);
    }, [])

    const navigate = useNavigate()  
    const handlePreviousReports = () => {
        navigate("/previousReports")
    }

    const handleAbarwayi = () => {
        navigate("/abarwayi")
    }
    return (
        <div className="report-container">
           {userDatas ? (
                <div className='report-container'>
                    <Navbar />
                    <h3> General records</h3 >
                    <table className="home-table">
                        <thead>
                            <th>Icyiciro</th>
                            <th>Abaje</th>
                            <th>Abasuye</th>
                            <th>Abasuwe</th>
                            <th>Abarwayi</th>
                            <th>Abafite Impamvu</th>
                            <th>Abafashije</th>
                            <th>Abafashijwe</th>
                            <th>Abatangiye isabato</th>
                            <th>Abize 7</th>    

                        </thead>
                        <tbody>

                            <tr >
                                <td>Total values</td>
                                <td>{userDatas.data[0].GeneralPresenceRecords.yaje}</td>
                                <td>{userDatas.data[0].GeneralPresenceRecords.yarasuye}</td>
                                <td>{userDatas.data[0].GeneralPresenceRecords.yarasuwe}</td>
                                <td>{userDatas.data[0].GeneralPresenceRecords.ararwaye}</td>
                                <td>{userDatas.data[0].GeneralPresenceRecords.afiteIndiMpamvu}</td>
                                <td>{userDatas.data[0].GeneralPresenceRecords.yarafashije}</td>
                                <td>{userDatas.data[0].GeneralPresenceRecords.yarafashijwe}</td>
                                <td>{userDatas.data[0].GeneralPresenceRecords.yatangiyeIsabato}</td>
                                <td>{userDatas.data[0].GeneralPresenceRecords.yize7}</td>
                            </tr>






                            <tr >
                                <td>Total Percentages</td>
                                <td>{userDatas.data[0].GeneralPercentageRecords.yaje}%</td>
                                <td>{userDatas.data[0].GeneralPercentageRecords.yarasuye}%</td>
                                <td>{userDatas.data[0].GeneralPercentageRecords.yarasuwe}%</td>
                                <td>{userDatas.data[0].GeneralPercentageRecords.ararwaye}%</td>
                                <td>{userDatas.data[0].GeneralPercentageRecords.afiteIndiMpamvu}%</td>
                                <td>{userDatas.data[0].GeneralPercentageRecords.yarafashije}%</td>
                                <td>{userDatas.data[0].GeneralPercentageRecords.yarafashijwe}%</td>
                                <td>{userDatas.data[0].GeneralPercentageRecords.yatangiyeIsabato}%</td>
                                <td>{userDatas.data[0].GeneralPercentageRecords.yize7}%</td>
                            </tr>

                        </tbody>

                    </table>

                    <h3>Family presences</h3>
                    <table className='home-table'>
                        <thead>
                            <th>Family</th>
                            <th>Abaje</th>
                            <th>Abasuye</th>
                            <th>Abasuwe</th>
                            <th>Abarwayi</th>
                            <th>Abafite Impamvu</th>
                            <th>Abafashije</th>
                            <th>Abafashijwe</th>
                            <th>Abatangiye isabato</th>
                            <th>Abize 7</th>

                        </thead>
                        <tbody>
                            {userDatas.familyAttendance.map(data => {
                                return (
                                    <tr key={data._id}>
                                        <td>{data.name}</td>
                                        <td>{data.yaje}</td>
                                        <td>{data.yarasuye}</td>
                                        <td>{data.yarasuwe}</td>
                                        <td>{data.ararwaye}</td>
                                        <td>{data.afiteIndiMpamvu}</td>
                                        <td>{data.yarafashije}</td>
                                        <td>{data.yarafashijwe}</td>
                                        <td>{data.yatangiyeIsabato}</td>
                                        <td>{data.yize7}</td>

                                    </tr>

                                )
                            })}

                            {userDatas.familyPercentages.map(data => {
                                return (
                                    <>
                                        <tr key={data._id}>
                                            <td>{data.name} Percentages</td>
                                            <td>{data.yaje}%</td>
                                            <td>{data.yarasuye}%</td>
                                            <td>{data.yarasuwe}%</td>
                                            <td>{data.ararwaye}%</td>
                                            <td>{data.afiteIndiMpamvu}%</td>
                                            <td>{data.yarafashije}%</td>
                                            <td>{data.yarafashijwe}%</td>
                                            <td>{data.yatangiyeIsabato}%</td>
                                            <td>{data.yize7}%</td>

                                        </tr>
                                    </>                                                                                                                                                                                                                                                                                                                                                                                                                         
                                )
                            })}              
              </tbody>
                    </table>
                    <div className='abashyitsi-report-div'>
                        <label htmlFor="abashyitsi" className='abashyitsi'>Abashyitsi:</label>
                        <button>{userDatas.data[0].GeneralPresenceRecords.abashyitsi}</button>
                    </div>

                    <div className='report-end'>
                        <button onClick={handlePreviousReports}>Get previous reports</button>
                        <button onClick={handleAbarwayi}>Abarwayi</button>
                    </div>
        </div>
            ) : (
                    <>
                        <Navbar />
                        <div className="loading-spinner-container">
                            <div className="loading-spinner"></div>
                        </div>
                    
                    </>
            )}
            

        </div>
    )
}

    export default Report







     