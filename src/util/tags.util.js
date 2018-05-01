import {generateHash} from "./string.util";
import {COLORS} from "../const/colors-const";

export const getTagColor = (tag) => COLORS[generateHash(tag) % COLORS.length];
