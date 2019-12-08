async function createPost({
  posts, 
  post = {},
  id
}) {
  try {
    const doc = posts.doc(id);
    const get = await doc.get();

    if (get.exists) {
      const data = await get.data();
      const { items = [] } = data;

      // add post to existing posts
      items.push(post);
      doc.set({ items });

      return items;
    }
    else {
      const emptyDoc = { items: [ post ] };
      await doc.set(emptyDoc);
      
      return [ post ];
    }
  }
  catch (e) {
    console.error(e);
    return false;
  }
}

export default createPost;