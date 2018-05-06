import React from "react";
import {Item, Rating} from "semantic-ui-react";

export const SearchResult = ({ image, description, title, rating, id }) => {
  return (
    <Item key={id}>
      <Item.Image size='tiny' src={image}/>
      <Item.Content>
        <Item.Header as='a'>{title}</Item.Header>
        <Item.Meta>{rating}</Item.Meta>
        <Item.Description>
          <Rating disabled maxRating="5" rating={rating} /> {rating}
        </Item.Description>
        <Item.Extra>{description}</Item.Extra>
      </Item.Content>
    </Item>
  )
}