import getPosts from '../firebase/getPosts';
import createPost from '../firebase/createPost';
import deletePost from '../firebase/deletePost';

async function deletePostTest({ posts }) {
  try {
    let passed = 0;
    const id = 'TEST-DELETE-ID';
    const post = { 
      title: 'TEST POST',
      createdAt: new Date().toUTCString()
    };

    // create post
    const items = await createPost({
      posts,
      post,
      id
    });

    // test delete post
    const one = await deletePost({
      posts,
      createdAt: post.createdAt,
      id
    });

    // get posts to check if deleted
    const newItems = await getPosts({
      posts,
      id
    });

    console.log(items, newItems);

    if (newItems.length === items.length - 1 && one) passed++;

    console.log('Passed ', passed, ' out of 1 tests');
    if (passed === 1) return true;
    else return false;
  }
  catch (e) {
    console.log(e);
    return false;
  }
}

export default deletePostTest;