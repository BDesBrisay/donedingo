import React from 'react';

class Input extends React.Component {
  state = {
    value: ''
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    
    const { context, user } = this.props;
    const { createPost } = context;

    const res = await createPost(
      'Goal', 
      { title: this.state.value }, 
      user.id
    );

    if (res) {
      this.setState({ value: '' });
    }
  }

  render() {
    const { type = 'New Post' } = this.props;
    const { value } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            value={value}
            placeholder={type}
            onChange={this.onChange}
          />
          <button type="submit">
            +
          </button>
        </form>
      </div>
    )
  }
}

export default Input;