import { redirect } from "next/navigation";

export const metadata = { title: "스토어 | 조건식실험실" };

export default function StorePage() {
  redirect("/products");
}
