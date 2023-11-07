import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import LogoutOutLinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";
import { setFavoriteMemo } from "../../redux/features/favoriteMemoSlice";

const Sidebar = () => {
  const [activeMemoId, setActiveMemoId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);
  // const favoriteMemos = useSelector((state) => state.favoriteMemo.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        const favoriteMemos = res.filter((item) => item.favorite === true);
        dispatch(setMemo(res));
        dispatch(setFavoriteMemo(favoriteMemos));
      } catch (err) {
        if (err.status === 401) return alert(err.data);
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    setActiveMemoId(memoId);
  }, [navigate]);

  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      const newMemos = [...memos, res];
      dispatch(setMemo(newMemos));
      navigate(`memo/${res._id}`);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutLinedIcon></LogoutOutLinedIcon>
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ padding: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        {memos
          .filter((el) => el.favorite)
          .sort((a, b) => (a.favoritePosition > b.favoritePosition ? 1 : -1))
          .map((item) => (
            <ListItemButton
              sx={{ pl: "20px" }}
              component={Link}
              to={`/memo/${item._id}`}
              key={item._id}
              selected={item._id === activeMemoId}
            >
              <Typography>
                {item.icon}
                {item.title}
              </Typography>
            </ListItemButton>
          ))}
        <Box sx={{ padding: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              プライベート
            </Typography>
            <IconButton onClick={() => addMemo()}>
              <AddBoxOutlinedIcon fontSize="small"></AddBoxOutlinedIcon>
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((item) =>
          item.favorite ? (
            ""
          ) : (
            <ListItemButton
              sx={{ pl: "20px" }}
              component={Link}
              to={`/memo/${item._id}`}
              key={item._id}
              selected={item._id === activeMemoId}
            >
              <Typography>
                {item.icon}
                {item.title}
              </Typography>
            </ListItemButton>
          )
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
