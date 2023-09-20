import React, { useState , useEffect} from 'react'
import Navbar from '../Components/Navbar'
import axios from "axios"
const Abarwayi = () => {
    const [abarwayi, setAbarwayi] = useState()
    const token = JSON.parse(localStorage.getItem("token"))
    const fetchData = async () => {
        const res = await axios.get("https://attendance-pro.onrender.com/api/v1/reports/getAbarwayi",
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }

        )
        if (res.data.length > 0) {
         setAbarwayi(res.data)
        } 

    }
    useEffect(() => {
        fetchData()
    }, [])

  return (
      <>
          <Navbar />
          <div className="abarwayi-title"><span>Abarwaye n'abafite impamvu </span></div>
          {abarwayi && abarwayi.map((data, index) => {
              return (
                  <div className='abarwayi'>
                      <span> { index+1}. { data}</span>
                  </div>    
              )
          }) 
          }

          {!abarwayi && <div className='abarwayi'>No Umurwayi found 😂😂😂🤣</div>}
          
          
      </>
  )
}

export default Abarwayi