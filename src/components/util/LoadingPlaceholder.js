import {Icon, Message} from "semantic-ui-react";
import * as React from "react";

export const LoadingPlaceholder = () => (
  <Message icon>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      Loading Book
    </Message.Content>
  </Message>
)