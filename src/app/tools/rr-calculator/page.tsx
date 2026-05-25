import { ToolShell } from "@/components/site/ToolShell";
import { RiskRewardCalculator } from "@/components/tools/RiskRewardCalculator";

export const metadata = { title: "손익비 계산기 | 조건식실험실" };

export default function RRCalculatorPage() {
  return (
    <ToolShell title="손익비 계산기" description="진입가, 손절가, 익절가를 입력해 손실률, 수익률, 손익비를 확인합니다.">
      <RiskRewardCalculator />
    </ToolShell>
  );
}
