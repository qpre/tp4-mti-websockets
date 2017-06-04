# Twitt

Let's build a simple Twitter-like App. It will allow users to send messages displayed as as a list on the client side.

## Getting started

Checkout the base project for this exercise and run yarn in both `backend` and `frontend` subfolders.

### Creating a channel (server side)

Websockets allow us to communicate over one network connection, but handling every message at the same level can become increasingly messy.
To tackle this issue in advance, and ensure separation of concerns, let's create subtopics over our websocket connection.

In the backend folder, you'll find an object called `Channel` in `lib/websocket/channel`.
Using this object you can define new channels in the `channels` folder.

This channel object has a few usefull methods for our job:

**on**: `MyChannel.on(event, handler)`, any time `event` is sent, the second argument is called (with `client` and `data` as arguments).
**off**: `MyChannel.off(event, handler)`, will stop listening for `event` with this handler.
**send**: `MyChannel.send(client, event, data)`, will send `event` to the specific `client` along with `data`.
**broadcast**: `MyChannel.broadcast(event, data)`, will send `event` to every active client on this channel, along with `data`.

#### Create a tweet channel 

Create a new Channel for your tweets, named `entities:tweets`.

#### Join

Use `on` and `send` to notify new clients with `joined` when they send the `join` message.

#### List contents

When someone sends the message `index` over this channel, you must return an `index` message to this client along with all the data from the tweet model. (as a JSON and under the `tweets` field)

#### Add content

When someone sends the message `add` over this channel, you must add the new tweet (maybe validate it ?) to the model and then `broadcast` the adding to all the connected clients (so that everybody knows there is a new tweet).

#### **Bonus**  remove content

When someone sends the message `remove` over this channel, you must remove the tweet with the `id` sent with `data` from the model and then `broadcast` the removal to all the connected clients (so that everybody knows they should remove the tweet).

### Communicate on client side

In the `frontend` directory you'll find a very basic react-redux application.
Just as in the `backend` directory you'll find a Channel implementation in `lib/websocket/channel`

#### Connect to the channel

Let's create a `tweets.js` file in the `services` directory
In it, create a new channel instance for your tweets.
export it and then, from `src/index.js` import it and use its `join` method right after the rendering of our React tree.

#### React to join

In `services/tweets.js`, use `on` and `send` to request all the current tweets to the server after it sends `joined`.

#### Bind with Application state 

When you receive `index`, insert the data you got in your redux store. (be careful not to insert a message twice !)

**Bonus**: when you receive a huge array of entities to insert in your redux store, inserting them one by one will trigger a redraw everytime. To avoid this, implement a way to batch insert your Tweets in the store.

#### Add a tweet

Fix the `create` action in `actions/tweets/index.js`. It must send the data to the server through our channel.
Adding to store should only happen if the server has confirmed it.

**bonus**: Implement a draft list in your store to handle state for tweets that are not yet validated by the server.

#### Remove a Tweet

You'll need the bonus from the server side part first. and you should be able to guess what you are asked to do in this part :)

## New tweets counter

When scaling up, having tweets showing automatically can make it hard for the reader to keep track of what he is reading.
To avoid this issue, modify your app, and add a button.
This button must show the number of new tweets available, those tweets must not be displayed until the user has clicked this button.

## **Bonus** Users

There is a `user_id` field on every tweet you've been sending since the beginning, only it's never used. Enhance your tweets with user informations.

