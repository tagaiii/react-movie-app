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
    query: '',
  };

  handleChange = (query: string) => {
    this.setState({ query: query });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <>
        <SearchInput query={this.state.query} onChange={this.handleChange} />
        <SearchButton onSearch={this.handleSearch} />
      </>
    );
  }
}

export default SearchControls;
