import { HouseIcon } from "@phosphor-icons/react";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { defaultLanguage } from "@/lib/content/localization";

import i18n from "../i18n";
import {
  getLanguageFromPathname,
  getPageRoute,
} from "../routing/navigation";

type ApplicationErrorBoundaryProps = {
  readonly children: ReactNode;
};

type ApplicationErrorBoundaryState = {
  readonly error: Error | null;
};

class ApplicationErrorBoundary extends Component<
  ApplicationErrorBoundaryProps,
  ApplicationErrorBoundaryState
> {
  public state: ApplicationErrorBoundaryState = {
    error: null,
  };

  public static getDerivedStateFromError(
    error: Error,
  ): ApplicationErrorBoundaryState {
    return {
      error,
    };
  }

  public componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo,
  ): void {
    console.error(
      "Application rendering error",
      error,
      errorInfo,
    );
  }

  public render(): ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    const pathname =
      typeof window === "undefined"
        ? getPageRoute(
            "home",
            defaultLanguage,
          )
        : window.location.pathname;

    const language =
      getLanguageFromPathname(pathname);

    return (
      <main
        id="main-content"
        className="relative isolate min-h-screen min-h-svh overflow-hidden bg-background text-foreground"
      >
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-0 top-0 -z-10",
            "h-[clamp(18rem,42vw,32rem)]",
            "bg-[linear-gradient(135deg,rgb(32_84_147_/_0.07),transparent_55%),linear-gradient(45deg,transparent_58%,rgb(173_89_55_/_0.06))]",
          ].join(" ")}
        />

        <div className="mx-auto flex min-h-screen min-h-svh w-full max-w-readable items-center px-page py-12">
          <Card className="w-full border-border-strong shadow-elevated">
            <CardHeader className="gap-4">
              <p className="!m-0 font-mono text-xs font-semibold tracking-[0.08em] text-copper-strong uppercase">
                {i18n.t(
                  "errors.eyebrow",
                  {
                    lng: language,
                  },
                )}
              </p>

              <CardTitle>
                <h1
                  id="page-title"
                  className="!m-0 text-xl leading-heading tracking-[-0.025em] text-heading sm:text-2xl"
                >
                  {i18n.t(
                    "errors.title",
                    {
                      lng: language,
                    },
                  )}
                </h1>
              </CardTitle>

              <CardDescription className="text-base leading-body">
                {i18n.t(
                  "errors.message",
                  {
                    lng: language,
                  },
                )}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                asChild
                size="lg"
                className="min-h-11"
              >
                <a
                  href={getPageRoute(
                    "home",
                    language,
                  )}
                >
                  <HouseIcon
                    aria-hidden="true"
                    weight="bold"
                  />

                  {i18n.t(
                    "errors.homeLink",
                    {
                      lng: language,
                    },
                  )}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }
}

export default ApplicationErrorBoundary;