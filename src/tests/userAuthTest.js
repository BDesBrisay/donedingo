import userAuth from '../firebase/userAuth';

async function userAuthTest({ users }) {
  try {
    let passed = 0;

    // test with valid user
    const one = await userAuth({
      users,
      user: {
        uid: 'TESTID',
        displayName: 'DISPLAY NAME',
        photoURL: 'photo.url',
        email: 'email@email.com'
      }
    });

    // test with invalid user
    const two = await userAuth({
      users,
      user: ['two']
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

export default userAuthTest;