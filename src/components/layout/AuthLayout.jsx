// import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import notionLogo from "../../assets/imgs/notion-logo.png";
import { useEffect } from "react";
import authUtils from "../../utils/authUtils";

const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // JWTを持っているのかを確認する
    const checkAuth = async () => {
      // 認証チェック
      const isAuth = await authUtils.isAuthenticated();
      console.log("isAuth", isAuth);
      if (isAuth) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={notionLogo}
            alt=""
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notionクローン開発
        </Box>
        <Outlet />
      </Container>
    </div>
  );
};

export default AuthLayout;
