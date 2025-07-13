import { Component } from 'react';
import type { Movie, Paginated } from '../types';
import SearchControls from '../components/SearchControls';
import Results from '../components/Results';
import { moviesApi } from '@src/services/movies/movies-api';

interface State {
  query: string;
  isLoading: boolean;
  results: Movie[];
  error: unknown;
  simulateError: boolean;
}

const initialState: State = {
  query: '',
  isLoading: false,
  results: [],
  error: null,
  simulateError: false,
};

class MainPage extends Component<Record<string, never>, State> {
  state = initialState;

  handleSearch = async (query: string) => {
    if (query.trim() === '') {
      return;
    }
    this.setState({ query: query, isLoading: true, error: null });

    try {
      const data: Paginated<Movie> = await moviesApi.searchMovies(query);
      this.setState({ results: data.results });
    } catch (error) {
      this.setState({ ...initialState, error: error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  triggerError = () => {
    this.setState({ simulateError: true });
  };

  async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true, error: null });

    const savedQuery = localStorage.getItem('query');
    if (savedQuery) {
      this.handleSearch(savedQuery);
    } else {
      try {
        const data: Paginated<Movie> = await moviesApi.fetchMovies();
        this.setState({ results: data.results });
      } catch (error) {
        this.setState({ error: error, results: [], isLoading: false });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    if (this.state.simulateError) {
      throw new Error('Simulated error for testing ErrorBoundary');
    }

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
            {this.state.error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded min-h-[400px] flex flex-col items-center justify-center">
                <h1 className="text-lg font-bold">Failed to fetch</h1>
                <p className="text-sm">Please try again later.</p>
              </div>
            ) : (
              <Results query={this.state.query} results={this.state.results} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MainPage;
