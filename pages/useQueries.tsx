import {NextPage} from 'next'
import {I_getPostsFn} from '../logic/reactQuery/postServices'
import {useGetPostsAndCommentsQuery} from '../logic/reactQuery/useQueriesExample'

interface I_commentsInfo {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const useQueries: NextPage = () => {
  const {postsData, commentsData} = useGetPostsAndCommentsQuery()

  return (
    <>
      <div>
        <h3>PostInfo</h3>
        <div>
          {postsData &&
            postsData?.data?.data
              ?.slice()
              ?.reverse()
              ?.map((post: I_getPostsFn) => (
                <div>
                  <p>ID: {post?.id}</p>
                  <p>UserID: {post?.userId}</p>
                  <p>Title: {post?.title}</p>
                  <p>Body: {post?.body}</p>
                </div>
              ))}
        </div>
      </div>
      <div>
        <h3>Comments Info</h3>
        <div>
          {commentsData &&
            commentsData?.data?.data
              ?.slice()
              ?.reverse()
              ?.map((post: I_commentsInfo) => (
                <div>
                  <p>ID: {post?.id}</p>
                  <p>PostID: {post?.postId}</p>
                  <p>Name: {post?.name}</p>
                  <p>Email: {post?.email}</p>
                  <p>Body: {post?.body}</p>
                </div>
              ))}
        </div>
      </div>
    </>
  )
}

export default useQueries
