import { Component } from 'react';

interface Props {
  children: React.ReactNode;
}

export default class ErrorBoundary extends Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 text-red-700 p-4 rounded min-h-[800px] flex flex-col items-center justify-center">
          <h1 className="text-lg font-bold">Something went wrong.</h1>
          <p>Please try again later.</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => this.setState({ hasError: false })}
          >
            Back to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
