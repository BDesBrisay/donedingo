import getStats from '../firebase/getStats';

async function getStatsTest({ 
  goals,
  plans,
  tasks
}) {
  try {
    let passed = 0;
    const id = 'TEST-STATS-USER';

    // test with valid id
    const one = await getStats({
      goals,
      plans,
      tasks,
      id
    });

    // test with invalid id
    const two = await getStats({
      goals,
      plans,
      tasks,
      id: ''
    });

    if (typeof one === 'object' && one.goals === 2) passed++;
    if (typeof two === 'object' && two.goals === 0) passed++;

    console.log(one, two)

    console.log('Passed ', passed, ' out of 2 tests');
    if (passed === 2) return true;
    else return false;
  }
  catch (e) {
    console.log(e);
    return false;
  }
}

export default getStatsTest;