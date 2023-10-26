import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function useDynamicUrl() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const removeQueryParam = (param) => {
    const params = new URLSearchParams(searchParams);
    params.delete(param);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const setRouter = (key, value) => {
    router.push(`${pathName}?${createQueryString(key, value)}`, {
      scroll: false,
    });
  };

  return { searchParams, setRouter, removeQueryParam };
}

export default useDynamicUrl;
