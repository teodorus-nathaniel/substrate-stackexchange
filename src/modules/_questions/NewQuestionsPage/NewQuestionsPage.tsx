import { useIntegratedSkeleton } from '#/components/SkeletonFallback'
import PostOverview from '#/containers/PostOverview'
import { useGetAllQuestions } from '#/services/subsocial/queries'

export default function NewQuestionsPage() {
  const { data: posts, isLoading, isFetched } = useGetAllQuestions()
  const { loadingChecker } = useIntegratedSkeleton(isLoading, isFetched)

  return (
    <div>
      <div className='flex flex-col space-y-8'>
        {loadingChecker(posts)
          ? Array.from({ length: 3 }).map((_, idx) => (
              <PostOverview isLoading key={idx} />
            ))
          : posts?.map((post) => <PostOverview key={post.id} post={post} />)}
      </div>
    </div>
  )
}
