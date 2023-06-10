import {NextPage} from 'next'
import {useEffect} from 'react'
import {useGetAllCommentsQuery} from '../logic/reactQuery/useInfiniteQuery'

const useInfiniteQuery: NextPage = () => {
  const {
    data,
    error,
    isFetching,
    status,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
  } = useGetAllCommentsQuery()
  useEffect(() => {
    let fetching = false
    const handleScroll = async (e: any) => {
      const {scrollHeight, scrollTop, clientHeight} = e.target.scrollingElement
      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true
        if (hasNextPage) await fetchNextPage()
        fetching = false
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage])

  return (
    <div>
      <div>
        {isLoading && <h1>isLoading...</h1>}
        <h3>Comments Info</h3>
        {data?.pages?.map((info: any) =>
          info?.data?.map((comment: any) => (
            <div key={comment?.id}>
              <p>ID: {comment?.id}</p>
              <p>PostID: {comment?.postId}</p>
              <p>Name: {comment?.name}</p>
              <p>Email: {comment?.email}</p>
              <p>Body: {comment?.body}</p>
            </div>
          ))
        )}
        <h1>{isFetchingNextPage ? 'Fetching...' : null}</h1>
      </div>
    </div>
  )
}

export default useInfiniteQuery
