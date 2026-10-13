import { Component, type ReactNode } from "react";

/**
 * The 3D studio loads as a separate chunk; if that chunk fails to load
 * (e.g. a flaky network during preview), show a calm fallback instead of
 * blanking the whole page.
 */
export class StudioBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("3D studio failed to load", error);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="flex h-[560px] flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-card text-center">
          <p className="text-sm font-semibold">
            The 3D studio couldn't load right now.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-primary px-5 py-2 text-xs font-bold tracking-wide text-primary-foreground uppercase"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
