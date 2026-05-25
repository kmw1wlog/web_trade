import { redirect } from "next/navigation";

export const metadata = { title: "데이터/API 수요조사 | 조건식실험실" };

export default function ApiProductPage() {
  redirect("/waitlist?product=api");
}
