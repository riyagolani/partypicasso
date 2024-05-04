import React from "react";
import { Link } from "react-router-dom";

const SignOutPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "300px" , height: "100vh"  }}>
      <h2>You've logged out. Bye!</h2>
      <Link to="/weLogin">Go back to login page</Link>
    </div>
  );
};

export default SignOutPage;
