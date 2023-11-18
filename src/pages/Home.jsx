import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import memoApi from "../api/memoApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // useEffectで初回取得するまで「最初のメモを作成」が一瞬表示されてしまうため、lengthが1以上になるよう初期化
  const [memosLength, setMemoLength] = useState([1]);

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

  useEffect(() => {
    const getMemos = async () => {
      try {
        const memos = await memoApi.getAll();
        setMemoLength(memos.length);
      } catch (err) {
        if (err.status === 401) return alert(err.data);
        alert(err);
      }
    };
    getMemos();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {memosLength === 0 ? (
        <LoadingButton
          variant="outlined"
          onClick={() => createMemo()}
          loading={loading}
        >
          最初のメモを作成
        </LoadingButton>
      ) : (
        <Box sx={{ fontWeight: 600, fontSize: "22px" }}>
          メモを選択してください
        </Box>
      )}
    </Box>
  );
};

export default Home;
