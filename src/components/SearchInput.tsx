import { Component } from 'react';

interface Props {
  query: string;
  onChange: (query: string) => void;
}

class SearchInput extends Component<Props> {
  state = {
    query: this.props.query,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <input
        type="text"
        value={this.state.query}
        onChange={this.handleChange}
        placeholder="Search for a movie..."
        className="border rounded p-2 flex-grow"
      />
    );
  }
}

export default SearchInput;
