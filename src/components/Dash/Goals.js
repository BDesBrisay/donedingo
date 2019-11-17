import React from 'react';

import styles from './Goals.module.css';
import withContext from '../Context/withContext';

import InputModal from './InputModal';

class Goals extends React.Component {
  state = {
    loading: false,
    items: [],
    showModal: false
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const {
      user, 
      context: { 
        getPosts
      }
    } = this.props;

    this.user = user;

    const items = await getPosts({
      type: 'Goals',
      id: user.id
    });

    this.setState({
      items,
      loading: false
    });
  }

  add = (post) => {
    this.setState({
      items: [...this.state.items, post]
    });
  }
/*
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

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    const { history, context, user } = this.props;
    const { 
      items = [],
      loading,
      showModal
    } = this.state;

    return (
      <div className={styles.col}>
        <h1 className={styles.title}>Goals</h1>
        <button onClick={this.toggleModal}>
          +
        </button>
        <InputModal
          shown={showModal}
          add={this.add}
          close={this.toggleModal}
          type="Goal"
        />
        {loading
          ? <h4>Loading...</h4>
          : items.length
            ? items.map((item, i) => (
                <h4 key={i}>{item.title}</h4>
              ))
            : <h4>No items to show</h4>
        }
      </div>
    )
  }
}

export default withContext(Goals);