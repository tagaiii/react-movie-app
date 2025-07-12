import { Component } from 'react';
import type { Movie, MovieResponse } from '../types';
import SearchControls from '../components/SearchControls';
import Results from '../components/Results';
import { config } from '../config';

interface State {
  query: string;
  isLoading: boolean;
  results: Movie[];
  error: unknown;
}

class MainPage extends Component<Record<string, never>, State> {
  state = {
    query: '',
    isLoading: false,
    results: [] as Movie[],
    error: null,
  };

  handleSearch = async (query: string) => {
    if (query.trim() === '') {
      return;
    }
    this.setState({ query: query, isLoading: true, error: null });

    try {
      const res = await fetch(
        `${config.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.API_KEY}`,
          },
        }
      );

      const data: MovieResponse = await res.json();
      this.setState({ results: data.results });
    } catch (error) {
      this.setState({ error: error, results: [] });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  triggerError = () => {
    this.setState({ error: new Error() });
  };

  render() {
    return (
      <div className="container flex flex-col gap-2 items-center">
        <div>
          <SearchControls onSearch={this.handleSearch} />
        </div>
        {this.state.isLoading ? (
          <div className="bg-gray-100 flex min-h-100 items-center justify-center w-full">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 self-stretch">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-end"
              onClick={this.triggerError}
            >
              Trigger error
            </button>
            <Results query={this.state.query} results={this.state.results} />
          </div>
        )}
      </div>
    );
  }
}

export default MainPage;
