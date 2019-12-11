import React from 'react';

import styles from './Column.module.css';
import withContext from '../Context/withContext';

import InputModal from './InputModal';

class Column extends React.Component {
  state = {
    active: -1,
    loading: false,
    items: [],
    showModal: false
  }

  componentDidMount() {
    const { disabled } = this.props;
    if (!disabled) this.updateItems();
  }

  componentDidUpdate(oldProps) {
    const { disabled, id } = this.props;
    const newId = id !== oldProps.id;
    if (!disabled && (disabled !== oldProps.disabled || newId)) {
      this.updateItems();
    }
  }

  updateItems = async () => {
    this.setState({ 
      loading: true, 
      active: -1 
    });

    const {
      id,
      user,
      type,
      context: { getPosts }
    } = this.props;

    this.user = user;

    const items = await getPosts({
      id,
      type
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

    const { setId = () => {} } = this.props;
    setId(active);
  }

  remove = async (post) => {
    const { items } = this.state;
    const { context, type, id } = this.props;
    const { deletePost = () => {} } = context;

    const newItems = items.filter((item) => item.createdAt !== post.createdAt);
    this.setState({ items: newItems });

    await deletePost({ 
      createdAt: post.createdAt,
      id,
      type
    });
  }

  check = async (post, index) => {
    const { items } = this.state;
    const { context, id } = this.props;
    const { checkTask = () => {} } = context;

    post.checked = !post.checked;
    items[index] = post;

    this.setState({ items });

    await checkTask({ index, id });
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const {
      type,
      title,
      CardComponent,
      disabled,
      id
    } = this.props;
    const { 
      items = [],
      loading,
      showModal,
      active,
    } = this.state;

    return (
      <div 
        className={(active === -1 || disabled)
          ? styles.col
          : styles.activeCol
        }
      >
        <div className={styles.header}>
          <h1 className={styles.title}>
            {title}
          </h1>
          <button 
            onClick={this.toggleModal}
            className={styles.createButton}
            disabled={disabled}
          >
            &#xFF0B;
          </button>
        </div>
        <InputModal
          shown={showModal}
          add={this.add}
          close={this.toggleModal}
          type={type}
          id={id}
        />
        {loading
          ? <h4>Loading...</h4>
          : (disabled || !items.length)
            ? <h4>No items to show</h4>
            : items.map((item, i) => (
                <CardComponent
                  key={i}
                  goal={item}
                  select={() => this.selectGoal(item.id)}
                  active={this.state.active === item.id}
                  del={() => this.remove(item, id)}
                  check={() => this.check(item, i)}
                />
              ))
        }
      </div>
    )
  }
}

export default withContext(Column);