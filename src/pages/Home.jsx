import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import memoApi from "../api/memoApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const memos = useSelector((state) => state.memo.value);

  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      navigate(`/memo/${res._id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {memos.length === 0 && (
        <LoadingButton
          variant="outlined"
          onClick={() => createMemo()}
          loading={loading}
        >
          最初のメモを作成
        </LoadingButton>
      )}
    </Box>
  );
};

export default Home;
