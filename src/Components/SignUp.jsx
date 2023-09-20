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
        const res = await axios.post("https://attendance-pro.onrender.com/api/v1/admin/registerAdmin", formData)
        if (res.data) {
            if (res.data.error) {
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
        <div className='form-container'>
            <form>
                <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter the email' />
                <div className='input-class' style={{ display: 'flex', alignItems: 'center', height: "60px", borderRadius: "10px", paddingTop: "none", marginTop: "1em", background: "rgb(245, 241, 241)" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter the password"
                        style={{ flex: 1, marginRight: '8px' }}
                    />
                    {showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} style={{ marginRight: "1em" }} /> : <AiFillEye style={{ marginRight: "1em" }} onClick={() => setShowPassword(true)} />
                    }
                </div>
                <LoadingButton
                    className='mui-button'
                    color="secondary"
                    onClick={handleSubmit}
                    loading={isLoading}
                    loadingPosition="start"
                    // startIcon={<SendIcon />}
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