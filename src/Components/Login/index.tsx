import "./login.css";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Paper, Typography, useTheme } from "@mui/material";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import Logo from "../common/Logo";
import axios from "../../utils/axios";
import GoogleIcon from "@mui/icons-material/Google";
import { isLoggedIn, setRefreshToken, setToken } from "../../utils";
import {
  GOOGLE_CLIENT_ID,
  LOGIN_SUBTITLE,
  LOGIN_TITLE,
} from "../../utils/constants";
import { SIZES } from "../common/Logo/type";

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();

  const googleButtonStyles = {
    backgroundColor: theme.palette.secondary.dark,
    p: 3,
  };

  const bookIconStyles = {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
  };

  const loginContainerStyles = {
    backgroundColor: theme.palette.primary.main,
  };

  const loginFormStyles = {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.secondary.main,
  };

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (!("tokenObj" in response)) {
      return;
    }

    const token = response.tokenObj.id_token;

    if (!token) {
      return;
    }

    const authData = await axios.post("user/sessions", { token });

    setToken(authData.data.response.token);
    setRefreshToken(authData.data.response.refreshToken);

    navigate("/books");
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/books");
    }
  }, []);

  return (
    <div className="login-container" style={loginContainerStyles}>
      <Paper className="login-form" elevation={8} sx={loginFormStyles}>
        <IconButton
          className="login-big-icon-wrapper"
          size="large"
          sx={bookIconStyles}
        >
          <Logo size={SIZES.LARGE} />
        </IconButton>

        <div>
          <h2>{LOGIN_TITLE}</h2>
          <span>{LOGIN_SUBTITLE}</span>
        </div>

        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={(props) => (
            <Button
              className="login-button"
              startIcon={<GoogleIcon />}
              sx={googleButtonStyles}
              {...props}
            >
              <Typography>Sign in with google</Typography>
            </Button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </Paper>
    </div>
  );
}

export default Login;
