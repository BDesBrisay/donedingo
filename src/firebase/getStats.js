import getPosts from './getPosts';

async function getStats({ 
  goals, 
  plans, 
  tasks, 
  id 
}) {
  const counts = {
    goals: 0,
    plans: 0,
    tasks: 0
  };
  
  try {
    const gs = await getPosts({ 
      posts: goals, 
      id 
    });

    for (let goal of gs) {
      counts.goals++;
      
      const ps = await getPosts({ 
        posts: plans, 
        id: goal.id
      })

      for (let plan of ps) {
        counts.plans++;

        const ts = await getPosts({
          posts: tasks,
          id: plan.id
        });
        
        // eslint-disable-next-line
        for (let task of ts) {
          counts.tasks++;
        }
      }
    }

    return counts;
  }
  catch (e) {
    console.error(e);
    return counts;
  }
}

export default getStats;