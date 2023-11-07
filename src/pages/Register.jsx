import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authAPI";

const Register = () => {
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [PasswordErrText, setPasswordErrText] = useState("");
  const [ConfirmErrText, setConfirmErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmErrText("確認用パスワードを入力してください");
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmErrText("パスワードと確認用パスワードが異なります");
    }

    if (error) return;

    setLoading(true);
    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("新規登録に成功しました");
      navigate("/");
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err) => {
        if (err.path === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.path === "password") {
          setPasswordErrText(err.msg);
        }
        if (err.path === "confirmPassword") {
          setConfirmErrText(err.msg);
        }
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={PasswordErrText}
          error={PasswordErrText !== ""}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={ConfirmErrText}
          error={ConfirmErrText !== ""}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
