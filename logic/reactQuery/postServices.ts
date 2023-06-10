import {useQuery, useMutation, useQueryClient} from 'react-query'
import {apiEndPoints} from '../../utilities/apiUrls'
import {axiosInstance} from '../../utilities/axiosInterceptor'
import {cacheKeys} from './cacheKeys'

//@ ALL CRUD Functionalities

// Get All the posts @ GET Request
// Please refer documentation for all available options

export interface I_getPostsFn {
  id: number
  title: string
  body: string
  userId: number
}

const getPostsFn = (signal: any) => {
  const url = apiEndPoints.getPosts
  return axiosInstance.get(url, {signal})
}

export const useGetPostsQuery = () => {
  return useQuery(cacheKeys.getPosts, ({signal}) => getPostsFn(signal), {
    // Available Options, please refer doc for more info
    // cacheTime,
    // enabled,
    // networkMode,
    // initialData,
    // initialDataUpdatedAt,
    // isDataEqual,
    // keepPreviousData,
    // meta,
    // notifyOnChangeProps,
    // onError,
    // onSettled,
    // onSuccess,
    // placeholderData,
    // queryKeyHashFn,
    // refetchInterval,
    // refetchIntervalInBackground,
    // refetchOnMount,
    // refetchOnReconnect,
    // refetchOnWindowFocus,
    // retry,
    // retryOnMount,
    // retryDelay,
    // select,
    // staleTime,
    // structuralSharing,
    // suspense,
    // useErrorBoundary,
  })
}

// Create a new post @ Post Request
// Please refer documentation for all available options

export interface I_createNewPostFn {
  title: string
  body: string
  userId: number
}

const createNewPostFn = (newPostData: I_createNewPostFn) => {
  const url = apiEndPoints.getPosts
  return axiosInstance.post(url, newPostData)
}

export const useCreateNewPostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(createNewPostFn, {
    mutationKey: cacheKeys.createNewPost,
    onSuccess: (data, variables, context) => {
      //After success Post creation you can call get function like this
      queryClient.invalidateQueries(cacheKeys.getPosts)
    },
    onError: (error, variables, context) => {
      //You can handle your Error message
      console.log(error)
    },
    // Available Options, please refer doc for more info
    // mutationKey,
    // onError,
    // onMutate,
    // onSettled,
    // onSuccess,
    // retry,
    // retryDelay,
    // useErrorBoundary,
    // meta,
  })
}

// Update post @ PUT Request
// Please refer documentation for all available options

const updatePostFn = (updatePostData: I_getPostsFn) => {
  const url = `${apiEndPoints.getPosts}/${updatePostData?.id}`
  return axiosInstance.put(url, updatePostData)
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(updatePostFn, {
    mutationKey: cacheKeys.updatePost,
    onSuccess: (data, variables, context) => {
      //After success Post creation you can call get function like this
      queryClient.invalidateQueries(cacheKeys.getPosts)
    },
    onError: (error, variables, context) => {
      //You can handle your Error message
      console.log(error)
    },
    // Available Options, please refer doc for more info
    // mutationKey,
    // onError,
    // onMutate,
    // onSettled,
    // onSuccess,
    // retry,
    // retryDelay,
    // useErrorBoundary,
    // meta,
  })
}

// Delete post @ Delete Request
// Please refer documentation for all available options

const deletePostFn = (id: number) => {
  const url = `${apiEndPoints.getPosts}/${id}`
  return axiosInstance.delete(url)
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(deletePostFn, {
    mutationKey: cacheKeys.deletePost,
    onSuccess: (data, variables, context) => {
      //After success Post creation you can call get function like this
      queryClient.invalidateQueries(cacheKeys.getPosts)
    },
    onError: (error, variables, context) => {
      //You can handle your Error message
      console.log(error)
    },
    // Available Options, please refer doc for more info
    // mutationKey,
    // onError,
    // onMutate,
    // onSettled,
    // onSuccess,
    // retry,
    // retryDelay,
    // useErrorBoundary,
    // meta,
  })
}
