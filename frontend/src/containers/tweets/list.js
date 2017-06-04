import React from 'react';
import { connect } from 'react-redux';
import TweetItem from '../../components/tweets/item';

// pick useful properties from application state
const mapStateToProps = (state, ownProps) => ({
  tweets: state.tweets,
});

const TweetsList = ({ tweets }) => (
  <ul
    style={{ listStyle: 'none', padding: 0 }}
  >
    {
      tweets.map(p => <TweetItem key={p.id} data={p} />)
    }
  </ul>
);


// "enhance" layout with properties inherited from application state
export default connect(mapStateToProps)(TweetsList);