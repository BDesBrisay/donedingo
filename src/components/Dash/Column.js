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

  toggleModal = (type) => {
    const newShow = !this.state.showModal;
    if (newShow) {
      // this.refs.modal.input.field.focus();
      const input = document.getElementById(`input-${type}`);
      if (input) input.click();
      console.log('FOCUSED', input, type);
    }
    this.setState({ showModal: newShow });
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
            onClick={() => this.toggleModal(type)}
            className={styles.createButton}
            disabled={disabled}
          >
            &#xFF0B;
          </button>
        </div>
        <InputModal
          shown={showModal}
          add={this.add}
          close={() => this.toggleModal(type)}
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
                />
              ))
        }
      </div>
    )
  }
}

export default withContext(Column);