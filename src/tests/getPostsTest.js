import getPosts from '../firebase/getPosts';

async function getPostsTest({ posts }) {
  try {
    let passed = 0;

    // test with valid user
    const one = await getPosts({
      posts,
      user: {
        uid: 'TESTID',
        displayName: 'DISPLAY NAME',
        photoURL: 'photo.url',
        email: 'email@email.com'
      }
    });

    if (typeof one === 'object') passed++;

    console.log('ONE', typeof one)

    // test with invalid user
    const two = await getPosts({
      users,
      user: ['two']
    });

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