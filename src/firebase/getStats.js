import getPosts from './getPosts';

async function getStats({ 
  goals, 
  plans, 
  tasks, 
  id 
}) {
  let gcount = 0,
    pcount = 0,
    tcount = 0;

  const goals = await getPosts({ goals, id });

  for (goal of goals) {
    console.log(goal)
    gcount++;
  }

  console.log(gcount);
}

export default getStats;