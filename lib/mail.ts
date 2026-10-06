import type { MouseEvent } from "react";

import { SOCIAL_LINKS } from "@/lib/site";

export function handleMailClick(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();

  let handedOff = false;
  const markHandedOff = () => {
    handedOff = true;
  };
  window.addEventListener("blur", markHandedOff, { once: true });
  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) markHandedOff();
    },
    { once: true }
  );

  window.location.href = `mailto:${SOCIAL_LINKS.email}`;

  setTimeout(() => {
    window.removeEventListener("blur", markHandedOff);
    if (!handedOff) {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }, 1200);
}
