import Loading from "./components/ui/loader/loading";
export default function LoadingPage() {
  return (
    <div className="flex h-screen items-center justify-center absolute top-0 w-full left-0 right-0">
      <Loading className="w-12 stroke-gray-300" />
    </div>
  );
}
