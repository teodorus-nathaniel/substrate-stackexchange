import PostOverview from '#/containers/Post'
import { useGetAllQuestions } from '#/services/subsocial/queries'

export default function NewQuestionsPage() {
  const { data: posts } = useGetAllQuestions()
  console.log(posts)

  return (
    <div>
      <div className='flex flex-col space-y-8'>
        {posts?.map((post) => (
          <PostOverview key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
