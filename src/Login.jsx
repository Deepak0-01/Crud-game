import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [userdetails, setUserdetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserdetails({
      ...userdetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    navigate("/create-game");
  };

  console.log(userdetails);
  return (
    <div className="login_page">
      <div className="login_container">
        <h2 className="login_title">Login to create Crud Simple Games 🚀</h2>
        <div className="login">
          <label className="input_label">
            <h4 className="input_title">Name</h4>
            <input
              className="login_input"
              type="text"
              name="name"
              value={userdetails.name}
              placeholder="Enter Your Name "
              onChange={handleInputChange}
            />
          </label>
          <label className="input_label">
            <h4 className="input_title">Email</h4>
            <input
              className="login_input"
              type="email"
              name="email"
              value={userdetails.email}
              placeholder="Enter Your Email "
              onChange={handleInputChange}
            />
          </label>

          <label className="input_label">
            <h4 className="input_title">Password</h4>
            <input
              className="login_input"
              type="password"
              name="password"
              value={userdetails.password}
              placeholder="Enter Your Password "
              onChange={handleInputChange}
            />
          </label>

          <button className="login_button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
