import React from "react";
import {Label} from "semantic-ui-react";
import {COLORS} from "../../const/colors-const";
import {generateHash} from "../../util/string.util";

const defaultStyles = {
  border: '1px dashed gray',
  cursor: 'move',
  marginLeft: "4px",
  marginRight: "4px",
  marginTop: "4px"
}

const getTagColor = (tag) => COLORS[generateHash(tag) % COLORS.length];

export const TagBubble = ({tag, style}) => (
  <div>
    <Label color={getTagColor(tag)} style={{ ...defaultStyles, ...style }}>{tag}</Label>
  </div>
);