import "./app.css"
import { Provider } from "react-redux";
import { createdStore } from "./store/store";
import Attendance from "./pages/Attendance";
import AddChurchMemberForm from "./Components/AddChurchMemberForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Help from "./pages/Help";
import Update from "./Components/Update";
import Report from "./pages/Report";
import PreviousReports from "./pages/PreviousReports";
import SIngleRecord from "./pages/SIngleRecord";
import Abarwayi from "./pages/Abarwayi";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
function App() {

  return (
    <Provider store={createdStore}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={ <SignUp/>} />
          <Route path="/users" element={<Homepage />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/formData" element={<AddChurchMemberForm />} />
          <Route path="/help" element={<Help />} />
          <Route path="/update" element={<Update />} />
          <Route path="/report" element={<Report />} />
          <Route path="/previousReports" element={<PreviousReports />} />
          <Route path="/singleRecord" element={<SIngleRecord />} />
          <Route path="/abarwayi" element={<Abarwayi />} />
        </Routes>
      </Router>
    </Provider>
  );

}

export default App;
