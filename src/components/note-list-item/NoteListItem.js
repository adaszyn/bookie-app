import React from "react";
import { Card } from "semantic-ui-react";
import { getTagColor } from "../../util/tags.util";
import Image from "semantic-ui-react/dist/es/elements/Image/Image";
import dateFormat from "dateformat";
import Icon from "semantic-ui-react/dist/es/elements/Icon/Icon";
import { limitLength } from "../../util/string.util";
import { TagBubble } from "../tags/TagBubble";

const getTagsArray = tags => {
  if (!tags) return [];
  return tags.split(",");
};

export const NoteListItem = ({
  title,
  isFav,
  tags,
  content,
  book,
  dateCreated,
  dateModified,
  id,
}) => (
  <Card
    key={id}
    link
    href={`/notes/${id}`}
    style={{ width: "100%" }}
    color={isFav ? "red" : null}
  >
    <Card.Content>
      {book && <Image floated="right" size="mini" src={book.image} />}
      <Card.Header>
        <Icon
          name="heart"
          color={isFav ? "red" : "grey"}
          style={{ marginRight: "10px" }}
        />
        {limitLength(title, 20)}
      </Card.Header>
      <Card.Meta>
        <strong>Created: </strong>
        {dateFormat(dateCreated, "mmmm dS 'yy")}
        <strong> Modified: </strong>
        {dateFormat(dateModified, "mmmm dS 'yy")}
      </Card.Meta>
      <Card.Description>{limitLength(content, 40)}</Card.Description>
    </Card.Content>
    <Card.Content extra style={{ display: "flex" }}>
      {getTagsArray(tags).map(tag => (
        <TagBubble tag={tag} key={tag} color={getTagColor(tag)} />
      ))}
    </Card.Content>
  </Card>
);
