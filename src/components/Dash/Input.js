import React from 'react';

import { getUser } from '../../utils/userState';
import randomId from '../../utils/randomId';
import withContext from '../Context/withContext';
import styles from './Input.module.css';

class Input extends React.Component {
  state = {
    value: '',
    err: ''
  }

  user = getUser()

  componentDidMount() {
    this.input && this.input.focus();
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  onSubmit = async (e) => {
    try {
      e.preventDefault();

      const { 
        context,
        add,
        type,
        close,
        id
      } = this.props;
      const { createPost } = context;
      const { value } = this.state;

      if (!value) throw new Error('No Title');

      const createdAt = new Date().toUTCString();
      const post = {
        id: randomId(),
        title: value,
        createdBy: this.user.id,
        createdAt,
      };

      if (type === 'Task') post.checked = false;

      add && add(post);
      const res = await createPost({
        id,
        type, 
        post
      });

      if (res) {
        this.setState({ value: '' });
        close();
      }
      else {
        throw new Error(`Unable to Create ${type}`);
      }
    }
    catch (e) {
      this.setState({ err: e.message })
      console.error(e);
    }
  }

  render() {
    const { type = 'Post' } = this.props;
    const { value, err } = this.state;

    return (
      <form 
        onSubmit={this.onSubmit}
        className={styles.contain}
      >
        <input
          ref={(el) => this.input = el}
          value={value}
          placeholder={`${type} Title`}
          onChange={this.onChange}
          id={`input-${type}`}
          className={styles.input}
          autoFocus
        />
        {err && 
          <p className={styles.error}>
            {err}
          </p>
        }
        <button 
          type="submit"
          className={styles.submit}
        >
          Create&nbsp;&nbsp;&#xFF0B;
        </button>
      </form>
    )
  }
}

export default withContext(Input);