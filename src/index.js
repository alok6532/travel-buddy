import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './animations.css';
import App from './App';
// import App from './App.minimal';
// import SimpleTest from './App.test.simple';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Add error boundary to catch errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#fee', color: '#c00' }}>
          <h1>Something went wrong!</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.toString()}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);