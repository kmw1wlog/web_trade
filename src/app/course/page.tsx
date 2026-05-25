import { redirect } from "next/navigation";

export const metadata = { title: "강의 사전수요 | 조건식실험실" };

export default function CoursePage() {
  redirect("/products/course");
}
