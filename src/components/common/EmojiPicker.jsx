import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Picker from "@emoji-mart/react";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState();

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const selectEmoji = (e) => {
    const emojiCodes = e.unified.split("-");
    let codesArray = [];
    emojiCodes.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  const showPicker = () => {
    if (props.isChangeable) {
      setIsShowPicker(!isShowPicker);
    }
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        width="0"
        sx={{ cursor: props.isChangeable ? "pointer" : "default" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: 100,
        }}
      >
        {props.isChangeable && (
          <Picker onEmojiSelect={selectEmoji} locale="ja" />
        )}
      </Box>
    </Box>
  );
};

EmojiPicker.propTypes = {
  icon: PropTypes.string,
  onChange: PropTypes.func,
  isChangeable: PropTypes.bool, // 新たに追加
};

export default EmojiPicker;
