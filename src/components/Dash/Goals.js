import React from 'react';

import styles from './Goals.module.css';
import withContext from '../Context/withContext';

import InputModal from './InputModal';
import GoalCard from './GoalCard'

class Goals extends React.Component {
  state = {
    active: -1,
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

  selectGoal = (id) => {
    const active = this.state.active === id ? -1 : id;
    this.setState({ active });
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
    // const { history, context, user } = this.props;
    const { 
      items = [],
      loading,
      showModal,
      active
    } = this.state;

    console.log(active, items)

    return (
      <div 
        className={active === -1
          ? styles.col
          : styles.activeCol
        }
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Goals</h1>
          <button 
            onClick={this.toggleModal}
            className={styles.createButton}
          >
            &#xFF0B;
          </button>
        </div>
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
                <GoalCard 
                  key={i}
                  goal={item}
                  select={() => this.selectGoal(i)}
                  active={this.state.active === i}
                />
              ))
            : <h4>No items to show</h4>
        }
      </div>
    )
  }
}

export default withContext(Goals);