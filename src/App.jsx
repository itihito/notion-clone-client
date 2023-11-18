import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { blue } from "@mui/material/colors";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Memo from "./pages/Memo";
import { useEffect } from "react";

const RedirectToIndex = () => {
  // 404エラー時にリダイレクトする処理
  useEffect(() => {
    window.location.href = "/";
  }, []);

  // リダイレクトが行われた場合、実際にはこのコンポーネントが表示される前にページが切り替わる
  return null;
};

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="memo" element={<Home />} />
            <Route path="memo/:memoId" element={<Memo />} />
            {/* 404エラー時にリダイレクト */}
            <Route path="*" element={<RedirectToIndex />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
