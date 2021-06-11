import React from 'react'
import { API_ROOT, HEADERS } from '../../constants';

class NewRoomForm extends React.Component {
  state = {
    name: ''
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault()
    fetch(`${API_ROOT}/rooms`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ name: '' })
  };

  render = () => {
    return (
      <div>
        <form name='newRoomForm' onSubmit={event => this.handleSubmit(event)}>
          <label>Create A New Room (3-15) characters-long:</label>
          <br />
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button value='submit'>submit</button>
        </form>
      </div>
    );
  };
}

export default NewRoomForm;
