import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import axios from "axios"
import { addAttendance, updateAttendance } from '../slices/presentSlice'
import { useNavigate } from 'react-router-dom'
const Update = () => {
    const user = JSON.parse(localStorage.getItem("userToUpdate"))
    const token= JSON.parse(localStorage.getItem("token"))
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [Class, setClass] = useState(user.Class)
    const [family, setFamily] = useState(user.family)
    const id = user._id
    const dispatch = useDispatch()

    const navigate= useNavigate()
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            username,
            email,
            Class,
            family
        }
        const res = await axios.put(`https://verygood-attendance-church.onrender.com/api/v1/members/updateMember/` + id, formData, {
            headers: {
                authorization:`Bearer ${token}`
            }
        })
        const yaje = false
        const yarasuye = false
        const yarasuwe = false
        const yarafashije = false
        const yarafashijwe = false
        const yatangiyeIsabato = false
        const ararwaye = false
        const afiteIndiMpamvu = false
        dispatch(updateAttendance({id, username, email, username, yaje, ararwaye, yarasuye, yarasuwe, yarafashije, yarafashijwe, yatangiyeIsabato, afiteIndiMpamvu }))
        setUsername("")
        setClass("")
        setEmail("")
        setFamily("")
        navigate("/users")
    }
    return (

        <div className="register-form-container">
            <h2>Welcome on this form page</h2>
            <form action="" className="register-form">
                <input type="text" name="username" value={username} placeholder="Enter a username" onChange={(e) => setUsername(e.target.value)} />
                <input type="email" name="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                <select name="userclass" id="userclass" value={Class} onChange={(e) => setClass(e.target.value)}>
                    <option value="Y1">Y1</option>
                    <option value="Y2">Y2</option>
                    <option value="Y3">Y3</option>
                </select>
                <select name="userclass" id="userclass" value={family} onChange={(e) => setFamily(e.target.value)}>
                    <option value="Family 1">Family 1</option>
                    <option value="Family 2">Family 2</option>
                    <option value="Family 3">Family 3</option>
                </select>
                <button type="button" onClick={handleFormSubmit}> Update</button>
            </form>
        </div>
    )
}

export default Update