import { TradeJournalForm } from "@/components/forms/TradeJournalForm";
import { ToolShell } from "@/components/site/ToolShell";

export const metadata = { title: "모의투자 기록장 | 조건식실험실" };

export default function TradeJournalPage() {
  return (
    <ToolShell title="모의투자 기록장" description="종목명, 진입근거, 조건식, 손절기준, 익절기준, 결과, 복기를 남깁니다.">
      <TradeJournalForm />
    </ToolShell>
  );
}
