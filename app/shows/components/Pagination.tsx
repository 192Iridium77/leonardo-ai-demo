"use client";

import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Flex py={12} justifyContent="space-between">
      <PaginationLink
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <Flex>
        <Text>{currentPage} /</Text>
        <Link href={createPageURL(totalPages)}>{totalPages}</Link>
      </Flex>

      <PaginationLink
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </Flex>
  );
}

function PaginationLink({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const text = direction === "left" ? "Previous" : "Next";

  return isDisabled ? <div>{text}</div> : <Link href={href}>{text}</Link>;
}
