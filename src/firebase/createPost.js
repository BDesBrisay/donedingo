export default async function createPost({
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

      items.push(post);
      doc.set({ items });

      console.log(items)

      return items;
    }
    else {
      console.log(post)

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