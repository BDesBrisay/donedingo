import { setUser } from "../utils/userState";

async function userAuth({ users, user = {} }) {
  try {
    const body = {
      id: user.uid,
      name: user.displayName,
      profileImage: user.photoURL,
      email: user.email
    };
    const doc = users.doc(body.id);
    const get = await doc.get();

    if (get.exists) {
      const data = await get.data();
      setUser(data);
      return data;
    }
    else {
      await doc.set(body);
      return body;
    }
  }
  catch (e) {
    console.error(e);
  }
}

export default userAuth;