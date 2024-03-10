interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}
export function Dialog({
  title,
  description,
  children
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        {description && <p className="text-gray-400 mb-4 text-center">{description}</p>}
        {children}
      </div>
    </div>
  );
}
