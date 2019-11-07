export default async function userAuth({ users, user = {} }) {
  try {
    const body = {
      id: user.uid,
      name: user.displayName,
      profileImage: user.photoURL,
      email: user.email
    };

    console.log(users)

    await users.where('id', '==', body.id)
      .get()
      .then(async (snapshot) => {
        console.log(snapshot)
        if (snapshot.empty) {
          await users.add(body);
          console.log('ADDED USER', body)
          return body;
        }
        else {
          console.log('RETURN USER', body)
          return snapshot;
        }
      });
  }
  catch (e) {
    console.error(e);
  }
}