import { ToolShell } from "@/components/site/ToolShell";
import { ColorClassifier } from "@/components/tools/ColorClassifier";

export const metadata = { title: "관심종목 색상 분류 | 조건식실험실" };

export default function ColorClassifierPage() {
  return (
    <ToolShell title="관심종목 색상 분류" description="관심종목을 빨강, 파랑, 회색으로 나눠 관찰 목적을 정리합니다. localStorage에 저장됩니다.">
      <ColorClassifier />
    </ToolShell>
  );
}
