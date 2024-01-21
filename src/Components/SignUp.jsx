import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye } from "react-icons/ai"
import { AiFillEyeInvisible } from "react-icons/ai"
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom'
const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            email,
            password
        }
        setIsLoading(true)
        const res = await axios.post("https://verygood-attendance-church.onrender.com/api/v1/admin/registerAdmin", formData)
        if (res.data) {
            if (res.data.error) {
                setEmail("")
                setPassword("")
                setError(res.data.error)
                toast.error(res.data.error )
                setIsLoading(false)
                
            } else {
                setEmail("")
                setPassword("")
                setError("")
                toast.success("User created successfully")
                navigate("/")
            }
        }
    }
    return (
        <div >
            <form className='pt-4 flex w-[80%] flex-col items-center justify-center ss:w-full mt-[13%] mx-auto sm:w-[30%]     '>
                <input type="email"  className='w-[80%]  bg-gray-200  h-[60px] indent-4 rounded-lg'  name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter the email' />
                <div className='bg-gray-200 w-[80%] first-letter:w-[80%] flex flex-row items-center h-[60px] mt-5  mb-5  rounded-lg '>
                    <input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className='  focus:border-none bg-gray-200  indent-4 focus:outline-none'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter the password"
                        style={{ flex: 1, marginRight: '8px' }}
                    />
                    {showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(false)}  /> : <AiFillEye  onClick={() => setShowPassword(true)} />
                    }
                </div>
                <LoadingButton
                    className='w-[70%] h-[60px]'
                    color="secondary"
                    onClick={handleSubmit}
                    loading={isLoading}
                    loadingPosition="start"
                    variant="contained" 
                >
                    <span>Register </span>
                </LoadingButton>
                <a href="/" style={{ textDecoration: "none", paddingTop: "1em" }}>Already have an account? Login</a>

            </form>
            <Toaster />
        </div>
    )
}

export default SignUp