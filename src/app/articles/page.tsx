import { redirect } from "next/navigation";

export const metadata = { title: "게시글 | 조건식실험실" };

export default function ArticlesPage() {
  redirect("/blog");
}
