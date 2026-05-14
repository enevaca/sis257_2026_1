import Axios, { type AxiosInstance } from 'axios'

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc3ODgwMjM1OSwiZXhwIjoxNzc4ODAyNDE5fQ.CBq-xfMtC7KVCn2JR6Hs_QYFbukzqXOlW45mZLHx5WY',
  },
})

export default axios
