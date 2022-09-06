import { useContext } from "react";
import { PostsContext } from "../context/Posts.context";

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw Error("Context error");
  }
  return context;
};
