import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center p-10 min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-3xl font-bold">Unauthorized Access</h1>
      <p className="text-red-500">
        You do not have permission to view this page.
      </p>
      <Link 
        href="/" 
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
      >
        Go back to home
      </Link>
    </div>
  );
}
