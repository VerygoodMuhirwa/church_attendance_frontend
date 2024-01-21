import React, { useState , useEffect} from 'react'
import Navbar from '../Components/Navbar'
import axios from "axios"
const Abarwayi = () => {
    const [abarwayi, setAbarwayi] = useState()
    const token = JSON.parse(localStorage.getItem("token"))
    const fetchData = async () => {
        const res = await axios.get("https://verygood-attendance-church.onrender.com/api/v1/reports/getAbarwayi",
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
          <div  className='md:pl-[40%] ss:pl-[20%]  pt-[1%]'>
            <span className='font-bold underline '>Abarwaye n'abafite impamvu </span></div>
         <div  className='pl-[40%]'>
         {abarwayi && abarwayi.map((data, index) => {
              return (
                  <div className=" flex pt-[2%] flex-col  mx-auto justify-center">
                      <p className='mb-[1em]'> { index+1}. { data}</p>
                  </div>    
              )
          }) 
          }
         </div>

          {!abarwayi && <div className='mx-auto'>No Umurwayi found 😂😂😂🤣</div>}
          
          
      </>
  )
}

export default Abarwayi