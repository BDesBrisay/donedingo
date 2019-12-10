import getPosts from '../firebase/getPosts';
import checkTask from '../firebase/checkTask';

async function checkTaskTest({ posts }) {
  try {
    let passed = 0;
    const id = 'TEST-TASK-ID';
    const index = 0;

    // get current tasks
    const oldTasks = await getPosts({ posts, id });

    // test check post
    const one = await checkTask({
      posts,
      id,
      index
    });

    // get new tasks
    const tasks = await getPosts({ posts, id });

    // compare checked field of old and new tasks
    if (tasks[index].checked !== oldTasks[index].checked && one) passed++;

    console.log('Passed ', passed, ' out of 1 tests');
    if (passed === 1) return true;
    else return false;
  }
  catch (e) {
    console.log(e);
    return false;
  }
}

export default checkTaskTest;