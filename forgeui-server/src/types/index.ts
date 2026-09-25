export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  description: string;
  category: string;
  props: PropDoc[];
  accessibility: string[];
}

export interface PlaygroundConfig {
  id: string;
  component: string;
  variant: string;
  size: string;
  disabled: boolean;
  label: string;
  createdAt: string;
}

export type CreatePlaygroundConfigInput = Omit<PlaygroundConfig, "id" | "createdAt">;
