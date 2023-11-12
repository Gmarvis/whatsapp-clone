import React, { useState } from "react";
import Picker from "emoji-picker-react";
import "rsuite/dist/rsuite.min.css";
import { Button, Popover, Whisper } from "rsuite";
import { FaRegLaugh } from "react-icons/fa";
// import "./EmojiPickerReact.css";
import { PlacementType } from "rsuite/esm/toaster/ToastContainer";

type Placement =
  | "top"
  | "bottom"
  | "right"
  | "left"
  | "bottomStart"
  | "bottomEnd"
  | "topStart"
  | "topEnd"
  | "leftStart"
  | "leftEnd"
  | "rightStart"
  | "rightEnd"
  | "auto"
  | "autoVerticalStart"
  | "autoVerticalEnd"
  | "autoHorizontalStart"
  | "autoHorizontalEnd";

type Props = {
  getShosenEmojie: (shosenEmojie: any) => void;
  placement: Placement;
};

const EmojiePicker = ({ getShosenEmojie, placement }: Props) => {
  const onEmojiClick = (event: any, emojiObject: any) => {
    getShosenEmojie(emojiObject);
  };

  if (placement === undefined) return;

  return (
    <>
      <div className="p-0 m-0 w-full">
        <Whisper
          trigger="click"
          speaker={
            <Popover arrow={true}>
              <Picker onEmojiClick={onEmojiClick} />
            </Popover>
          }
          placement={placement}
          enterable
          controlId="control-id-hover-enterable"
        >
          <button>
            <FaRegLaugh size={23} />
          </button>
        </Whisper>
      </div>
    </>
  );
};

export default EmojiePicker;