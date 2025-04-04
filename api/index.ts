import type { Post } from '~/types/post';

export const registerUser = (params: {
  username: string;
  password: string;
}): Promise<any> =>
  useApiFetch('/api/auth/register', {
    method: 'POST',
    body: params,
  });

export const loginUser = (params: {
  username: string;
  password: string;
}): Promise<any> =>
  useApiFetch('/api/auth/login', {
    method: 'POST',
    body: params,
  });

export const loginGoogleUser = (params: { token: string }): Promise<any> =>
  useApiFetch('/api/auth/login-google', {
    method: 'POST',
    body: params,
  });

export const verifyToken = (params: { token: string }) =>
  useApiFetch('/api/auth/verifyToken', {
    method: 'POST',
    body: params,
  });

export const getMeUser = (params: { userId: string; token: string }) =>
  useApiFetch('/api/me', {
    method: 'POST',
    body: params,
  });

export const getAllPosts = (params = { page: 1, pageSize: 10 }): Promise<any> =>
  useApiFetch('/api/posts', {
    method: 'GET',
    query: params,
  });

export const createPost = (params: Partial<Post>) =>
  useApiFetch('/api/posts', {
    method: 'POST',
    body: params,
  });
