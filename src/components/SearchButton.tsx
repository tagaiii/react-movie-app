import { Component } from 'react';

interface Props {
  onSearch: () => void;
}

class SearchButton extends Component<Props> {
  handleClick = () => {
    this.props.onSearch();
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    );
  }
}

export default SearchButton;
