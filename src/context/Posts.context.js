import { createContext, useReducer } from "react";

// create context
export const PostsContext = createContext();

// state = previous station
// action = the argument passed into the dispatch function
export const postReducer = (state, action) => {
  // check action
  switch (action.type) {
    // return all posts
    case "GET_POSTS":
      return {
        posts: action.payload,
      };
    case "ADD_POST":
      // return a new array with the newly added post and append (spread) the previous post state (the existing posts)
      return {
        posts: [action.payload, ...state.posts],
      };
    // filter the previous state by the post that was deleted and rerender
    case "DELETE_POST":
      return {
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// create component to provide context throughout the application
// children are the components wrapped by the context provider
export const PostsContextProvider = ({ children }) => {
  // use reducer provides a state value and a dispatcher function to update the state
  // the dispatch funtion can be used to update the state throughout the application dispatch(state-that-will-change, payload: data that will be used to make the change)
  const [state, dispatch] = useReducer(postReducer, {
    Posts: null,
  });
  // provide context to entire application
  return (
    <PostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
