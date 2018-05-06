import React from "react";
import {Item, Rating} from "semantic-ui-react";
import { Link } from "react-router-dom";

export const SearchResult = ({ image, description, title, rating, id, isbn10 }) => {
  return (
    <Item key={id} as={Link} to={'/books/'+isbn10}>
      <Item.Image size='tiny' src={image}/>
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Meta>{rating}</Item.Meta>
        <Item.Description>
          <Rating disabled maxRating="5" rating={rating} /> {rating}
        </Item.Description>
        <Item.Extra>{description}</Item.Extra>
      </Item.Content>
    </Item>
  )
}