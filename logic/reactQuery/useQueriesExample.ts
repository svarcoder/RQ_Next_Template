import {useQueries} from 'react-query'
import {apiEndPoints} from '../../utilities/apiUrls'
import {axiosInstance} from '../../utilities/axiosInterceptor'
import {cacheKeys} from './cacheKeys'

// You can fetch multipleAPI Calls With
// Please refer documentation for all available options

export interface I_getPostsFn {
  id: number
  title: string
  body: string
  userId: number
}

const getPostsFn = ({signal}: any) => {
  const url = apiEndPoints.getPosts
  return axiosInstance.get(url, {signal})
}

const getCommentsFn = ({signal}: any) => {
  const url = apiEndPoints.getComments
  return axiosInstance.get(url, {signal})
}

export const useGetPostsAndCommentsQuery = () => {
  const results = useQueries([
    {queryKey: cacheKeys.getAllPosts, queryFn: getPostsFn},
    {queryKey: cacheKeys.getAllComments, queryFn: getCommentsFn},
  ])
  const postsData = results[0]
  const commentsData = results[1]
  return {postsData, commentsData}
}
