import { useRouter, useSearchParams } from "next/navigation";

export const usePagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { setPage };
};
