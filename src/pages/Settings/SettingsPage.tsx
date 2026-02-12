import type { ComponentProps } from "react";
import SettingsPageFeature from "../../features/settings/components/SettingsPage";

export type SettingsPageProps = ComponentProps<typeof SettingsPageFeature>;

export default function SettingsPage(props: SettingsPageProps) {
  return <SettingsPageFeature {...props} />;
}
