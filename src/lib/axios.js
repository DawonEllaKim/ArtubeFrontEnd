import axios from "axios";
const cookies = new Cookies();

const instance = axios.create({
  baseURL: "http://3.34.90.85",
  // headers: {
  //   "content-type": "application/json;charset=UTF-8",
  //   accept: "application/json",
  // },
});

const USER_TOKEN = cookies.get("refresh_token");
instance.defaults.headers.common["Authorization"] = USER_TOKEN;

export const apis = {
  // 게시물 호출
  getPost: () => instance.get("/api"),
  // 게시물 작성
  addPost: contents => instance.post("/api/myPage", contents),
  // 게시물 수정
  editPost: (id, content) => instance.put(`/api/myPage/${id}`, content),
  // 게시물 삭제
  delPost: id => instance.delete(`/posts/${id}`),

  //로그인 관련
  signup: user => instance.post("/user/signUp", user),
  login: (id, pwd) => instance.post("/user/signIn", { id, pwd }),
  logout: () => instance.get("/user/logout"),
};

// import axios from "axios";

// const accessToken = document.cookie.split("=")[1];

// export const api = axios.create({
//   baseURL: "http://3.34.90.85",
//   headers: {
//     "content-type": "application/json;charset=UTF-8",
//     accept: "application/json,",
//     authorization: `${accessToken}`,
//   },
// });

// export const api_token = axios.create({
//   baseURL: "http://3.36.91.31/user/token",
//   headers: {
//     "content-type": "application/json;charset=UTF-8",
//     accept: "application/json,",
//     authorization: `${accessToken}`,
//   },
// });
