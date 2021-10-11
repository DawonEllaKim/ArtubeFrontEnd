import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "./redux/modules/post";
import Post from "./Post";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.list);
  console.log(posts);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");

  const TextInput = (e, setState) => {
    setState(e.target.value);
  };

  const addPost = () => {
    const post = {
      title,
      url,
      desc,
    };
    dispatch(postActions.addPostMiddleware(post));
  };

  useEffect(() => {
    dispatch(postActions.getPostMiddleware());
  }, []);

  return (
    <div className="App">
      <h1>작성하기</h1>
      {posts &&
        posts.map(post => {
          return <Post {...post} />;
        })}
      <div>
        <div>Title</div>
        <input type="text" onChange={e => TextInput(e, setTitle)} />
        <div>Url</div>
        <input type="text" onChange={e => TextInput(e, setUrl)} />
        <div>Description</div>
        <input type="text" onChange={e => TextInput(e, setDesc)} />
        <br />
        <button onClick={addPost}>등록하기</button>
      </div>
    </div>
  );
}

export default App;
