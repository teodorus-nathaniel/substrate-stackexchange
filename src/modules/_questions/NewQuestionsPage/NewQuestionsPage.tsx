import PostOverview from '#/containers/PostOverview'
import { useGetAllQuestions } from '#/services/subsocial/queries'

export default function NewQuestionsPage() {
  const { data: posts, isLoading } = useGetAllQuestions()
  console.log(posts)
  // let isLoading = true

  return (
    <div>
      <div className='flex flex-col space-y-8'>
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <PostOverview isLoading key={idx} />
            ))
          : posts?.map((post) => <PostOverview key={post.id} post={post} />)}
      </div>
    </div>
  )
}
