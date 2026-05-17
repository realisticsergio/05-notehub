import axios from "axios";
import type { Note } from '../types/note';

interface NOTEHUBResponse {
  notes: Note[];
  totalPages: number;
}

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
  Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  accept: 'application/json',
},
});



export const fetchNotes = async (query: string, page?: number): Promise<NOTEHUBResponse> => {
  const response = await instance.get<NOTEHUBResponse>('/notes', {
    params: { search: query, page },
  });
  return response.data;
};

export const createNote = async (newPost: Omit<Note, 'id'>): Promise<Note> => {
  const response = await instance.post<Note>('/notes', newPost);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete<Note>(`/notes/${id}`);
  return response.data;
}


  
    




















// import axios from "axios";
// import type { Post, PostFormValues } from "../types/post";

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

// interface FetchPostsParams {
//   searchText: string;
//   page: number;
// }

// export interface FetchPostsResponse {
//   posts: Post[];
//   totalCount: number;
// }

// export const fetchPosts = async ({
//   searchText,
//   page,
// }: FetchPostsParams): Promise<FetchPostsResponse> => {
//   const params = {
//     _page: page,
//     _limit: 8,
//     ...(searchText.trim() !== "" && { q: searchText.trim() }),
//   };

//   const response = await axios.get<Post[]>("/posts", { params });
//   const totalCount = Number(response.headers["x-total-count"] ?? response.data.length);

//   return {
//     posts: response.data,
//     totalCount,
//   };
// };

// export const createPost = async (newPost: PostFormValues): Promise<Post> => {
//   const response = await axios.post<Post>("/posts", {
//     ...newPost,
//     userId: 1,
//   });


//   return response.data;
// };

// export const editPost = async (post: Post): Promise<Post> => {
//   const response = await axios.put<Post>(`/posts/${post.id}`, post);

//   return response.data;
// };

// export const deletePost = async (postId: number): Promise<void> => {
//   await axios.delete(`/posts/${postId}`);
// };
