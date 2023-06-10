import React, {useState} from 'react'
import {
  I_createNewPostFn,
  I_getPostsFn,
  useCreateNewPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from '../logic/reactQuery/postServices'

interface I_initialState {
  id?: number
  title: string
  body: string
  userId: number
}

const Posts = () => {
  //Hooks should be called or invoked at top of teh component
  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isLoading,
    isLoadingError,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    refetch,
    remove,
    status,
  } = useGetPostsQuery()
  const {
    data: createPostData,
    error: createPostError,
    isError: createPostIsError,
    isIdle: createPostIsIdle,
    isLoading: createPostIsLoading,
    isPaused: createPostIsPaused,
    isSuccess: createPostIsSuccess,
    // mutate: createPostMutate,
    mutateAsync: createPostMutateAsync,
    reset: createPostReset,
    status: createPostStatus,
  } = useCreateNewPostMutation()
  const {
    data: updatePostData,
    error: updatePostError,
    isError: updatePostIsError,
    isIdle: updatePostIsIdle,
    isLoading: updatePostIsLoading,
    isPaused: updatePostIsPaused,
    isSuccess: updatePostIsSuccess,
    // mutate: updatePostMutate,
    mutateAsync: updatePostMutateAsync,
    reset: updatePostReset,
    status: updatePostStatus,
  } = useUpdatePostMutation()
  const {
    data: deletePostData,
    error: deletePostError,
    isError: deletePostIsError,
    isIdle: deletePostIsIdle,
    isLoading: deletePostIsLoading,
    isPaused: deletePostIsPaused,
    isSuccess: deletePostIsSuccess,
    // mutate: deletePostMutate,
    mutateAsync: deletePostMutateAsync,
    reset: deletePostReset,
    status: deletePostStatus,
  } = useDeletePostMutation()

  const [todoInfo, setTodoInfo] = useState<any>({
    userId: 0,
    title: ' ',
    body: '',
  })
  const [isEditButtonEnabled, setIsEditButtonEnabled] = useState<boolean>(false)

  const handleInputChange = (e: any) => {
    setTodoInfo((prev: I_createNewPostFn) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmitPostForm = async (e: any) => {
    try {
      e.preventDefault()
      if (!isEditButtonEnabled) {
        const response = await createPostMutateAsync(todoInfo)
        if (response?.status === 201) {
          setTodoInfo({
            userId: 0,
            title: ' ',
            body: '',
          })
        }
      } else {
        const response = await updatePostMutateAsync(todoInfo)
        if (response?.status === 200) {
          setTodoInfo({
            userId: 0,
            title: ' ',
            body: '',
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeletePostForm = async (id: number, e: any) => {
    try {
      const response = await deletePostMutateAsync(id)
      if (response?.status === 201) {
        setTodoInfo({
          userId: 0,
          title: ' ',
          body: '',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmitPostForm}>
        <input
          type='number'
          name='userId'
          value={todoInfo?.userId}
          onChange={handleInputChange}
          placeholder='UserId'
          required={true}
        />
        <input
          type='text'
          name='title'
          value={todoInfo?.title}
          onChange={handleInputChange}
          placeholder='Title'
          required={true}
        />
        <input
          type='text'
          name='body'
          value={todoInfo?.body}
          onChange={handleInputChange}
          placeholder='Body'
          required={true}
        />
        <button type='submit' disabled={createPostIsLoading}>
          {createPostIsLoading ? 'Submitting' : 'Submit'}
        </button>
      </form>
      <h3>Get ALL Posts Data</h3>
      {isLoading && <h5>Loading..</h5>}
      {data &&
        data?.data
          ?.slice()
          ?.reverse()
          ?.map((post: I_getPostsFn) => (
            <div>
              <p>ID: {post?.id}</p>
              <p>UserID: {post?.userId}</p>
              <p>Title: {post?.title}</p>
              <p>Body: {post?.body}</p>
              <button
                onClick={() => {
                  setTodoInfo(post)
                  setIsEditButtonEnabled(true)
                }}
              >
                Edit
              </button>
              <button onClick={(e: any) => handleDeletePostForm(post?.id, e)}>
                Delete
              </button>
            </div>
          ))}
    </div>
  )
}

export default Posts
