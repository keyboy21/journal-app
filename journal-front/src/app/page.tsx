import { Skeleton } from "@/components/skeleton";
import { Suspense } from "react";
import { CreateClass } from "./_components/CreateClass";
import { CreateStudent } from "./_components/CreateStudent";
import { Table } from "./_components/Table";

export default async function Home() {

  return (
    <section className="mx-auto px-11">
      <div className="pt-10 flex gap-5">
        <CreateStudent />
        <CreateClass />
      </div>
      <Suspense fallback={<Skeleton className="mt-10 bg-gray-300 w-full h-[343px]" />}>
        <Table />
      </Suspense>
    </section>
  );
}
