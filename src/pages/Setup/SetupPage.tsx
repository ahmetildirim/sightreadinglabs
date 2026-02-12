import type { ComponentProps } from "react";
import GeneratorSetupPage from "../../features/setup/components/GeneratorSetupPage";

export type SetupPageProps = ComponentProps<typeof GeneratorSetupPage>;

export default function SetupPage(props: SetupPageProps) {
  return <GeneratorSetupPage {...props} />;
}
