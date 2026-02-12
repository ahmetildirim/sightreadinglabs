import type { ComponentProps } from "react";
import AboutPageFeature from "../../features/about/components/AboutPage";

export type AboutPageProps = ComponentProps<typeof AboutPageFeature>;

export default function AboutPage(props: AboutPageProps) {
  return <AboutPageFeature {...props} />;
}
