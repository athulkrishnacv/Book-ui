import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/screens/MainPage";
import SubPage from "./components/screens/SubPage";
import NoMatch from "./components/screens/NoMatch";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import React, { useState, useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";

export const UserContext = React.createContext();

function App() {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const updateUserData = (action) => {
        switch (action.type) {
            case "LOGOUT":
                setUserData(null);
                localStorage.clear();
                break;
            case "LOGIN":
                setUserData(action.payload);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("user_data")));
        setLoading(false);
    }, []);
    return loading ? (
        <h1>Loading</h1>
    ) : (
        <>
            <UserContext.Provider value={{ userData, updateUserData }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/" element={<PrivateRoute />}>
                            <Route path="/subpage/:id" element={<SubPage />} />
                        </Route>
                        <Route path="*" element={<NoMatch />} />
                        <Route path="/auth/login/" element={<Login />} />
                        <Route path="/auth/create/" element={<Signup />} />
                    </Routes>
                </Router>
            </UserContext.Provider>
        </>
    );
}

export default App;
