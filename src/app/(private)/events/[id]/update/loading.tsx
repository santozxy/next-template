import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Cover Image Upload */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="bg-secondary flex h-32 w-full flex-col items-center justify-center rounded-lg border border-dashed p-4 shadow-sm">
          <Skeleton className="mx-auto h-24 w-24 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
      </div>

      {/* Name Input and Status*/}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Description Textarea */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>

      {/* First Grid: Price Type, Start Date, End Date */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Second Grid: Instagram, Facebook, Website */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Banner Image Upload */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="bg-secondary flex h-32 w-full flex-col items-center justify-center rounded-lg border border-dashed p-4 shadow-sm">
          <Skeleton className="mx-auto h-24 w-24 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-24" />
        <div className="bg-secondary h-64 rounded-lg border p-4 shadow-sm">
          <Skeleton className="mx-auto h-48 w-full rounded-lg" />
          <Skeleton className="mx-auto mt-2 h-4 w-32" />
        </div>
      </div>

      {/* Multi Select for Tags */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Images Upload (Multiple) */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <div className="flex items-center gap-2">
            <Skeleton className="inline-block h-4 w-12" />
          </div>
        </div>
        <div className="bg-secondary flex h-32 w-full flex-col items-center justify-center rounded-lg border border-dashed p-4 shadow-sm">
          <Skeleton className="mx-auto h-24 w-24 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>
    </div>
  );
}
