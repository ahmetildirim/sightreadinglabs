import type { ComponentProps } from "react";
import PracticePlayerPage from "../../features/practice/components/PracticePlayerPage";

export type PracticePageProps = ComponentProps<typeof PracticePlayerPage>;

export default function PracticePage(props: PracticePageProps) {
  return <PracticePlayerPage {...props} />;
}
