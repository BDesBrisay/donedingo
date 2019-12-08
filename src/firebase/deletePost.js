import getPosts from './getPosts';

async function deletePost({ 
  posts, 
  createdAt,
  id
}) {
  const items = await getPosts({ posts, id });
  const doc = posts.doc(id);

  console.log(items)

  const newItems = items.filter((item) => item.createdAt !== createdAt);

  console.log(newItems, createdAt)

  doc.set({ items: newItems });

  return true;
}

export default deletePost;