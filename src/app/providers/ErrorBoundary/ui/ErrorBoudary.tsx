import React, { ErrorInfo, Suspense } from 'react';
import { PageError } from '@/widgets/PageError/ui/PageError';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  // static getDerivedStateFromError(_: Error) {
  //   return { hasError: true };
  // }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }
  render() {
    if (this.state.error) {
      console.log('Got boundary error');
      return (
        <Suspense>
          <PageError />
        </Suspense>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
