export default async function userAuth({ users, user = {} }) {
  try {
    // User structure
    const body = {
      id: user.uid,
      name: user.displayName,
      profileImage: user.photoURL,
      email: user.email
    };

    // Check if user exists
    await users.where('id', '==', body.id)
      .get()
      .then(async (snapshot) => {
        if (snapshot.empty) {
          // Create User
          await users.doc(body.id).set(body);
          console.log('ADDED USER', body)
          return body;
        }
        else {
          // Exisiting User
          console.log('RETURNING USER', body)
          return snapshot;
        }
      });
  }
  catch (e) {
    console.error(e);
  }
}