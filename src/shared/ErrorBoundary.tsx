import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  title?: string
  description?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: undefined
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[DocRender] Render error', error, info)
  }

  private handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    if (this.props.fallback) {
      return this.props.fallback
    }

    const title = this.props.title ?? 'Something went wrong'
    const description =
      this.props.description ?? 'Please reload the extension view and try again.'

    return (
      <div className="min-h-screen theme-bg px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm">
          <h1 className="text-xl font-semibold theme-text-strong">{title}</h1>
          <p className="mt-2 text-sm theme-text-muted">{description}</p>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-4 inline-flex items-center rounded-lg theme-accent-bg px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:shadow-md"
          >
            Reload
          </button>
        </div>
      </div>
    )
  }
}
