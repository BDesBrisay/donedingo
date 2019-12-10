import getPosts from '../firebase/getPosts';

async function getPostsTest({ posts }) {
  try {
    let passed = 0;

    // test with valid id
    const one = await getPosts({
      posts,
      id: '116974840912269369445' 
    });

    // test with invalid id
    const two = await getPosts({
      posts,
      id: ''
    });

    if (typeof one === 'object') passed++;
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

export default getPostsTest;