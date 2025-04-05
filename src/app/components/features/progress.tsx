

interface ProgressProps {
    value: number;
    className?: string;
  }

export function Progress({ value, className }: ProgressProps) {
  return (
    <div
      className={`relative h-2 overflow-hidden rounded-full bg-gray-100 ${className}`}
    >
      <div
        className="h-full w-full flex-1 bg-blue-500 transition-all"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  );
}