import type { NavigationPageId } from "@/app/routing/navigation";

export type HomeStatementContent = {
  readonly text: string;
  readonly action: {
    readonly label: string;
    readonly pageId: Exclude<NavigationPageId, "home">;
  };
};