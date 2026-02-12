import type { ComponentProps } from "react";
import SessionResultPage from "../../features/results/components/SessionResultPage";

export type ResultsPageProps = ComponentProps<typeof SessionResultPage>;

export default function ResultsPage(props: ResultsPageProps) {
  return <SessionResultPage {...props} />;
}
