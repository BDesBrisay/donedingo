import React from 'react';

import styles from './Goals.module.css';
import withContext from '../Context/withContext';

import Input from './Input';

class Goals extends React.Component {
  state = {
    loading: false,
    items: [],
  }
/*
  async componentDidMount() {
    this.setState({ loading: true });

    const {
      user, 
      context: { 
        firebase, 
        getPosts,
        getProjects 
      }
    } = this.props;

    this.firebase = firebase;
    this.user = user;

    const items = await getPosts(user.id);
    const projects = await getProjects(user.groups);

    this.setState({
      items,
      projects,
      loading: false
    });
  }

  add = (post) => {
    this.setState({
      items: [...this.state.items, post]
    });
  }

  remove = async (post) => {
    const { items } = this.state;
    const { context } = this.props;
    const { deletePost = () => {} } = context;

    const newItems = items.filter((item) => item.value !== post.value);
    this.setState({ items: newItems });

    await deletePost(post.createdAt, this.user.id);
  }

  check = async (post, i) => {
    const { items } = this.state;
    const { context} = this.props;
    const { completePost = () => {} } = context;

    post.done = !post.done;
    items[i] = post;

    this.setState({ items });

    await completePost(i, this.user.id);
  }
*/
  render() {
    const { history, context, user } = this.props;
    const { 
      items = [],
      loading 
    } = this.state;

    return (
      <div className={styles.col}>
        <h1>Goals</h1>
        <Input 
          context={context}
          user={user}
        />
      </div>
    )
  }
}

export default withContext(Goals);