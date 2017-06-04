// @flow

// Actions types are defined as string constants
export const ADD = 'TWEET_ADD';

// What makes a beautiful tweet ?
type Tweet = {
  id: number,
  user_id: number,
  message: string,
};

// f(x) => y;
const tweets = (state: Array<Tweet> = [], action: Object): Array<Tweet> => {
  switch (action.type) {
    case ADD:
      return [...state, { id: action.id, message: action.message, user_id: action.user_id }];
    default:
      return state;
  }
}

export default tweets;