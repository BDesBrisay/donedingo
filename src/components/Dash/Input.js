import React from 'react';

import { getUser } from '../../utils/userState';
import withContext from '../Context/withContext';

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
      // this.setState({ err: e.message })
      console.error(e);
    }
  }

  render() {
    const { type = 'Post' } = this.props;
    const { value, err } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            value={value}
            placeholder={`${type} Title`}
            onChange={this.onChange}
            autoFocus={true}
            id={`input-${type}`}
          />
          <button type="submit">
            +
          </button>
        </form>
        {err && 
          <p style={{ color: 'red' }}>
            {err}
          </p>
        }
      </div>
    )
  }
}

export default withContext(Input);