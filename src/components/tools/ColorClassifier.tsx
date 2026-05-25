"use client";

import { useEffect, useState } from "react";

type Bucket = "red" | "blue" | "gray";
type Item = { name: string; bucket: Bucket };

const labels: Record<Bucket, { title: string; description: string; className: string }> = {
  red: { title: "빨강", description: "급등/강한 관심", className: "bg-red-100 border-red-200" },
  blue: { title: "파랑", description: "눌림/관찰", className: "bg-blue-100 border-blue-200" },
  gray: { title: "회색", description: "제외/복기", className: "bg-gray-100 border-gray-200" }
};

export function ColorClassifier() {
  const [name, setName] = useState("");
  const [bucket, setBucket] = useState<Bucket>("red");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("condition_lab_colors");
    if (saved) setItems(JSON.parse(saved) as Item[]);
  }, []);

  useEffect(() => {
    localStorage.setItem("condition_lab_colors", JSON.stringify(items));
  }, [items]);

  function addItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    setItems((current) => [...current, { name: name.trim(), bucket }]);
    setName("");
  }

  return (
    <div className="grid gap-5">
      <form onSubmit={addItem} className="grid gap-3 rounded-3xl border border-ink/10 bg-white/75 p-5 md:grid-cols-[1fr_auto_auto]">
        <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="관심종목 이름" />
        <select value={bucket} onChange={(event) => setBucket(event.target.value as Bucket)} className="rounded-2xl border border-ink/15 px-4 py-3 text-sm">
          <option value="red">빨강: 급등/강한 관심</option>
          <option value="blue">파랑: 눌림/관찰</option>
          <option value="gray">회색: 제외/복기</option>
        </select>
        <button className="rounded-2xl bg-ink px-5 py-3 text-sm font-bold text-paper" type="submit">
          추가
        </button>
      </form>
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(labels) as Bucket[]).map((key) => (
          <section key={key} className={`rounded-3xl border p-5 ${labels[key].className}`}>
            <h3 className="font-display text-2xl font-bold text-ink">{labels[key].title}</h3>
            <p className="text-sm text-ink/65">{labels[key].description}</p>
            <div className="mt-4 grid gap-2">
              {items.map((item, index) => ({ item, index })).filter(({ item }) => item.bucket === key).map(({ item, index }) => (
                <button key={`${item.name}-${index}`} onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="rounded-2xl bg-white/70 px-4 py-3 text-left text-sm">
                  {item.name}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
