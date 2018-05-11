import React from "react";
import {COLORS} from "../../const/colors-const";
import {generateHash} from "../../util/string.util";

const defaultStyles = {
  width: "100%",
  marginBottom: "3px",
  height: "8px",
  borderRadius: "3px",
  border: '1px solid #D1D1D1',
}

const getTagColor = (tag) => COLORS[generateHash(tag) % COLORS.length];

export const TagStrip = ({tag, style}) => (
  <div style={{...defaultStyles, ...style, backgroundColor: getTagColor(tag)}} />
);
