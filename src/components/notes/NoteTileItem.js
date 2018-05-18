import React from "react";
import { Card, Divider, Header, Label, Popup } from "semantic-ui-react";
import { getTagColor } from "../../util/tags.util";
import { limitLength } from "../../util/string.util";
import dateFormat from "dateformat";

const getTagsArray = tags => {
  if (!tags) return [];
  return tags.split(",");
};

const TagsToolbar = ({ tags }) => {
  const tagsArray = getTagsArray(tags).slice(0, 6);
  if (!tags || tags.length === 0) {
    return null;
  }
  return (
    <Card.Content style={{ paddingTop: 0, paddingBottom: 0 }}>
      {tagsArray.map(tag => (
        <Popup
          key={tag}
          position="top center"
          trigger={
            <Label size="tiny" name="" key={tag} color={getTagColor(tag)} />
          }
          content={tag}
        />
      ))}
    </Card.Content>
  );
};

export const NoteTileItem = ({
  title,
  isFav,
  tags,
  contentRaw,
  dateCreated,
  dateModified,
  id,
}) => (
  <Card
    key={id}
    className="bounce-in"
    href={`/notes/${id}`}
    link
    style={{ height: "230px" }}
    color={isFav ? "red" : null}
  >
    <Card.Content>
      <Header as="h4">{limitLength(title, 20)}</Header>
      <Divider />
      <Card.Meta>
        <strong>Created: </strong>
        {dateFormat(dateCreated, "mmmm dS 'yy")} <br />
        <strong>Modified: </strong>
        {dateFormat(dateModified, "mmmm dS 'yy")}
      </Card.Meta>
      <Card.Description>{limitLength(contentRaw, 40)}</Card.Description>
    </Card.Content>
    <TagsToolbar tags={tags} />
  </Card>
);
