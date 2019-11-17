export default async function getPosts({ 
  posts, 
  id 
}) {
  try {
    const doc = posts.doc(id)
    const get = await doc.get();

    if (get.exists) {
      const data = await get.data();
      const { items = [] } = data;

      return items;
    }
    else {
      await doc.set({ items: [] });
      return [];
    }
  }
  catch (e) {
    console.error(e);
    return [];
  }
}