import { Component } from 'react';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

interface Props {
  onSearch: (query: string) => void;
}

interface State {
  query: string;
}

class SearchControls extends Component<Props, State> {
  state = {
    query: localStorage.getItem('query') || '',
  };

  handleChange = (query: string) => {
    this.setState({ query: query });
  };

  handleSearch = () => {
    localStorage.setItem('query', this.state.query);
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <div className="flex gap-2 items-center">
        <SearchInput query={this.state.query} onChange={this.handleChange} />
        <SearchButton onSearch={this.handleSearch} />
      </div>
    );
  }
}

export default SearchControls;
