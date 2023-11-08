import { Box, Divider, IconButton, TextField } from "@mui/material";
import StarBorderOutLineIcon from "@mui/icons-material/StarBorderOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import memoApi from "../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
// import { setFavoriteMemo } from "../redux/features/favoriteMemoSlice";
import EmojiPicker from "../components/common/EmojiPicker";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import assets from "../assets/";
import "./Memo.css";

const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memos = useSelector((state) => state.memo.value);

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
        setFavorite(res.favorite);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = { ...temp[index], title: e.target.value };

    timer = setTimeout(async () => {
      dispatch(setMemo(temp));
      try {
        await memoApi.update(memoId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deleteMemo = await memoApi.delete(memoId);

      const newMemos = memos.filter((e) => e._id !== memoId);
      dispatch(setMemo(newMemos));
      if (newMemos.length === 0) {
        navigate(`/memo`);
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const onIconChange = async (newIcon) => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemo(temp));
    try {
      await memoApi.update(memoId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

  const changeFavorite = async () => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    const maxFavoritePositionMemo = memos.reduce((maxMemo, currentMemo) => {
      return currentMemo.favoritePosition > maxMemo.favoritePosition
        ? currentMemo
        : maxMemo;
    }, memos[0]);
    const maxFavoritePosition = maxFavoritePositionMemo
      ? maxFavoritePositionMemo.favoritePosition + 1
      : 0;
    temp[index] = {
      ...temp[index],
      favorite: !favorite,
      favoritePosition: maxFavoritePosition,
    };
    setFavorite(!favorite);
    dispatch(setMemo(temp));
    try {
      await memoApi.favorite(memoId, { favorite: !favorite });
    } catch (err) {
      alert(err);
    }
  };

  const showInputOnly = () => {
    setIsInputVisible(true);
    setIsPreviewVisible(false);
  };

  const showInputAndPreview = () => {
    setIsInputVisible(true);
    setIsPreviewVisible(true);
  };

  const showPreviewOnly = () => {
    setIsInputVisible(false);
    setIsPreviewVisible(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "5vh",
          paddingBottom: "10px",
        }}
      >
        <IconButton onClick={changeFavorite}>
          {favorite ? (
            <StarRateIcon sx={{ color: "#2196f3" }}></StarRateIcon>
          ) : (
            <StarBorderOutLineIcon />
          )}
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon></DeleteOutlinedIcon>
        </IconButton>
        <IconButton variant="outlined" onClick={showInputOnly}>
          <EditIcon></EditIcon>
        </IconButton>
        <IconButton variant="outlined" onClick={showInputAndPreview}>
          <VerticalSplitIcon></VerticalSplitIcon>
        </IconButton>
        <IconButton variant="outlined" onClick={showPreviewOnly}>
          <VisibilityIcon></VisibilityIcon>
        </IconButton>
      </Box>
      <Divider />

      <Box
        sx={{
          padding: "0 50px",
          height: "12vh",
          "@media (max-height: 700px)": { height: "20vh" },
          "@media (max-height: 450px)": { height: "25vh" },
        }}
      >
        <EmojiPicker icon={icon} onChange={onIconChange} isChangeable={true} />
        <TextField
          onChange={(e) => updateTitle(e)}
          value={title}
          placeholder="無題"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiInputBase-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "1.7rem", fontWeight: 700 },
            // display: "none",
          }}
        />
      </Box>

      <Box
        sx={{ display: "flex", border: "solid 1px #ccc9c9" }}
        // sx={{ padding: "10px 50px", display: "flex", flexDirection: "column" }}
      >
        {isInputVisible && (
          <Box
            sx={{ width: "50%" }}
            // sx={{
            //   width: "100%",
            //   height: "47vh",
            //   overflowY: "scroll",
            //   "&::-webkit-scrollbar": {
            //     width: "10px",
            //   },
            //   "&::-webkit-scrollbar-thumb": {
            //     background: "gray",
            //     borderRadius: "5px",
            //   },
            //   "&::-webkit-scrollbar-track": {
            //     background: "#dcdcdc",
            //   },
            // }}
          >
            <TextField
              onChange={(e) => updateDescription(e)}
              value={description}
              placeholder="追加"
              variant="outlined"
              fullWidth
              multiline
              className="app-main-note-input"
              sx={{
                ".MuiInputBase-input": { padding: 0 },
                ".MuiOutlinedInput-notchedOutline": { border: "none" },
                ".MuiOutlinedInput-root": { fontSize: "1rem" },
                overflowY: "scroll",
                height: "75vh",
                "&::-webkit-scrollbar": {
                  width: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "gray",
                  borderRadius: "5px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#dcdcdc",
                },
              }}
            />
          </Box>
        )}
        {/* <Divider /> */}

        {isPreviewVisible && (
          <Box
            sx={{ width: "50%" }}
            // sx={{
            //   width: "100%",
            //   height: "47vh",
            //   overflowY: "scroll", // スクロール可能にする
            //   backgroundColor: assets.colors.secondary,
            //   "&::-webkit-scrollbar": {
            //     width: "10px",
            //   },
            //   "&::-webkit-scrollbar-thumb": {
            //     background: "gray",
            //     borderRadius: "5px",
            //   },
            //   "&::-webkit-scrollbar-track": {
            //     background: "#dcdcdc",
            //   },
            // }}
          >
            <Box
              className="app-main-note-preview"
              sx={{
                backgroundColor: "#e6e6e6",
                overflowY: "scroll",
                height: "75vh",
                "&::-webkit-scrollbar": {
                  width: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "gray",
                  borderRadius: "5px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#dcdcdc",
                },
                whiteSpaceCollapse: "preserve",
                padding: "16.5px 14px",
                overflowWrap: "break-word",
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {description}
              </ReactMarkdown>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Memo;
