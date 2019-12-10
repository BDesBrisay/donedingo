import createPost from '../firebase/createPost';

async function createPostTest({ posts }) {
  try {
    let passed = 0;
    const post = { title: 'TEST POST' };

    // test with valid id
    const one = await createPost({
      posts,
      post,
      id: 'TEST-CREATE-ID' 
    });

    // test with invalid id
    const two = await createPost({
      posts,
      post,
      id: ''
    });

    if (typeof one === 'object' && one.length) passed++;
    if (typeof two === 'boolean') passed++;

    console.log('Passed ', passed, ' out of 2 tests');
    if (passed === 2) return true;
    else return false;
  }
  catch (e) {
    console.log(e);
    return false;
  }
}

export default createPostTest;