import { Component } from 'react';
import type { Movie, MovieResponse } from '../types';
import SearchInput from '../components/SearchInput';
import SearchButton from '../components/SearchButton';
import Results from '../components/Results';

interface State {
  query: string;
  results: Movie[];
}

class MainPage extends Component<Record<string, never>, State> {
  state = {
    query: '',
    results: [] as Movie[],
  };

  handleChange = (query: string) => {
    this.setState({ query: query });
  };

  handleSearch = async () => {
    const { query } = this.state;
    if (query.trim() === '') {
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=1`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      }
    );
    const data: MovieResponse = await res.json();

    this.setState({ results: data.results });
  };

  render() {
    return (
      <>
        <div>
          <SearchInput query={this.state.query} onChange={this.handleChange} />
          <SearchButton onSearch={this.handleSearch} />
        </div>
        <Results query={this.state.query} results={this.state.results} />
      </>
    );
  }
}

export default MainPage;
