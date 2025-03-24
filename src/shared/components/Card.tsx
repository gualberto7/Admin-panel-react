export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="w-full bg-white shadow-sm rounded-lg p-4">{children}</div>;
}
