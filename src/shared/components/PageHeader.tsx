interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="w-full bg-white shadow-sm rounded-lg flex items-center justify-between py-2 px-4 mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}