import Image from "next/image";

import { LOGO_DARK, LOGO_LIGHT } from "@/lib/site";

export function Logo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const common = {
    width: 0,
    height: 0,
    sizes: "160px",
    style: { height: size, width: "auto" },
  } as const;

  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-lg ${className}`}
    >
      <Image src={LOGO_LIGHT} alt="Kavin logo" {...common} className="dark:hidden" />
      <Image src={LOGO_DARK} alt="Kavin logo" {...common} className="hidden dark:block" />
    </span>
  );
}
