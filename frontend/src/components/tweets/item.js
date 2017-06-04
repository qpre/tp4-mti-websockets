import React from 'react';

const TweetItem = ({ data }) => (
  <li>
    <span>{data.message}</span>
  </li>
);

export default TweetItem;