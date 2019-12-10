import getPosts from './getPosts';

async function checkTask({ 
  posts,
  id,
  index 
}) {
  try {
    const items = await getPosts({ posts, id });
    const doc = posts.doc(id)

    items[index].checked = !items[index].checked;
    doc.set({ items })

    return true;
  }
  catch (e) {
    console.error(e);
    return false;
  }
}

export default checkTask;