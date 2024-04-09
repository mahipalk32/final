import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function SignInPage() {
  const navigate = useNavigate();

  const { loginWithRedirect } = useAuth0();

  const handleUserSignIn = async () => {
    await loginWithRedirect();
  };

  const handleAdminSignIn = () => {
    navigate("/admin-signin");
  };

  return (
    <div
      style={{ margin: "80px 300px", backgroundColor: "#fff", padding: "30px" }}
    >
      <Typography style={{ marginTop: "20px", fontSize: "3rem" }} variant="h5">
        LOGIN
      </Typography>
      <Button
        style={{ margin: "30px" }}
        color="inherit"
        variant="contained"
        onClick={handleUserSignIn}
      >
        user SignIn
      </Button>{" "}
      <br />
      <Button
        style={{ margin: "30px" }}
        color="inherit"
        variant="contained"
        onClick={handleAdminSignIn}
      >
        admin SignIn
      </Button>
    </div>
  );
}

export default SignInPage;
