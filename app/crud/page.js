import AddPost from '../components/AddPost';
import PostList from '../components/PostList';
async function getData() {
  const res = await fetch('http://localhost:3001/api/posts', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to Fetch data');
  }
  return res.json();
}
const page = async () => {
  const posts = await getData();

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="my-5 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Todo List App</h1>
        <AddPost />
      </div>

      <PostList posts={posts} />
    </div>
  );
};

export default page;