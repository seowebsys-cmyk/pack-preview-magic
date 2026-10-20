import type { BlogBlock } from "@/lib/blog";

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground">
    {blocks.map((block, i) => {
      if (block.type === "table") {
        const [header, ...rows] = block.rows;
        return <div key={i} className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead className="bg-secondary"><tr>{header?.map((cell, j) => <th key={j} scope="col" className="px-4 py-3 align-top font-bold">{cell}</th>)}</tr></thead>
            <tbody>{rows.map((row, j) => <tr key={j} className="border-t border-border">{row.map((cell, k) => <td key={k} className="px-4 py-3 align-top">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>;
      }
      if (block.type === "h2") return <h2 key={i} className="pt-6 text-2xl font-bold sm:text-3xl">{block.text}</h2>;
      if (block.type === "h3") return <h3 key={i} className="pt-3 text-xl font-bold">{block.text}</h3>;
      return <p key={i}>{block.text}</p>;
    })}
  </div>;
}