import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Login.css"; // Import the CSS file
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const userType = new URLSearchParams(location.search).get("user");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  // Check if user is already logged in (if "Remember Me" is checked and credentials are saved)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to dashboard based on userType
      switch (userType) {
        case "Admin":
          navigate("/admindashboard");
          break;
        case "User":
          navigate("/dashboard");
          break;
        case "Host":
          navigate("/hostdashboard");
          break;
        default:
          navigate("/welogin");
          break;
      }
    }
  }, [userType, navigate]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if(token){
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const loginEndpoint =
      userType === "Admin" ? "/admin/login" : "/user/login";
    try {
      const response = await axios.post(
        `http://localhost:5555${loginEndpoint}`,
        {
          username: formData.username,
          password: formData.password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(response));

      switch (userType) {
        case "Admin":
          navigate("/admindashboard");
          break;
        case "User":
          navigate("/dashboard");
          break;
        case "Host":
          navigate("/hostdashboard");
          break;
        default:
          navigate("/welogin");
          break;
      }
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <div className="container-login">
      <div className="card-container-login">
        <div className="card-body-login">
          <h1 className="title-login">{userType} Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group-login my-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control mt-2"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group my-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control mt-2"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input my-3"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label my-2" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn mt-3">
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
