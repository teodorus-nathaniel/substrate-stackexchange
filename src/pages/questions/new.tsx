import Post from '#/containers/Post'

export default function NewQuestionsPage() {
  return (
    <div>
      <div className='flex flex-col space-y-8'>
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}
