import { Component, type ReactNode } from "react";

/**
 * Wraps a section so a single rendering error degrades gracefully instead of
 * blanking the whole page. Keeps the project safe in front of the teacher.
 */
export class SectionBoundary extends Component<
  { children: ReactNode; name?: string },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Section error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-12 max-w-md border border-ink/20 bg-paper-100 p-6 text-center">
          <p className="font-mono text-[13px] text-ink-600">
            This section hit a snag loading. Try refreshing the page.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
