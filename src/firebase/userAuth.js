import { setUser } from "../utils/userState";

async function userAuth({ users, user = {} }) {
  try {
    // setup user structure
    let body = {
      id: user.uid,
      name: user.displayName,
      profileImage: user.photoURL,
      email: user.email
    };

    // get doc reference
    const doc = users.doc(body.id);
    const get = await doc.get();

    // check if user exists
    if (get.exists) {
      const data = await get.data();
      // set user into local storage
      setUser(data);
      return data;
    }
    else {
      // create new user
      body.createdAt = new Date();
      await doc.set(body);
      return body;
    }
  }
  catch (e) {
    console.error(e);
  }
}

export default userAuth;