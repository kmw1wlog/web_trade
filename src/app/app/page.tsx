import { redirect } from "next/navigation";

export const metadata = { title: "앱 베타 사전예약 | 조건식실험실" };

export default function AppWaitlistPage() {
  redirect("/products/app");
}
