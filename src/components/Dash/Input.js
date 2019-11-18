import React from 'react';

import { getUser } from '../../utils/userState';
import withContext from '../Context/withContext';
import styles from './Input.module.css';

class Input extends React.Component {
  state = {
    value: '',
    err: ''
  }

  user = getUser()

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
        close
      } = this.props;
      const { createPost } = context;
      const { value } = this.state;

      console.log(value, !!value)
      if (!value) throw new Error('No Title');

      const post = {
        title: value,
        createdAt: new Date().toUTCString(),
        createdBy: this.user.id
      };
      add && add(post);

      const res = await createPost({
        id: this.user.id,
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
          value={value}
          placeholder={`${type} Title`}
          onChange={this.onChange}
          autoFocus={true}
          id={`input-${type}`}
          className={styles.input}
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