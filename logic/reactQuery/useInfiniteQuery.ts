import {useInfiniteQuery} from 'react-query'
import {apiEndPoints} from '../../utilities/apiUrls'
import {axiosInstance} from '../../utilities/axiosInterceptor'
import {generateQueryString} from '../../utilities/helpers'
import {cacheKeys} from './cacheKeys'

// InfiniteScroll with RQ
// Please refer documentation for all available options

interface I_commentsInfo {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const getAllCommentsFn = (pageParam: number) => {
  const filters = {
    _page: pageParam,
    _limit: 10,
  }
  const queryParams = generateQueryString(filters)
  const url = `${apiEndPoints.getComments}?${queryParams}`
  return axiosInstance.get(url)
}
// get all user nfts to explore
export const useGetAllCommentsQuery = () => {
  return useInfiniteQuery(
    cacheKeys.getAllComments,
    ({pageParam = 1}) => getAllCommentsFn(pageParam),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,

      getNextPageParam: (lastPage: any, allPages: any) => {
        const pageCount = allPages
          ?.map((info: any) => info?.data?.length)
          .reduce(
            (previousValue: any, currentValue: any) =>
              previousValue + currentValue,
            0
          )
        if (pageCount < 500) {
          //500 is the total length or count of the comments data, In real time scenarios we ned ask backend dev to add tha total number of item field
          return allPages?.length + 1
        } else {
          return undefined
        }
      },
    }
  )
}
