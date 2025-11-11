import React from "react";

export default function FullWidthSection({ children, className = "" }) {
  return <section className={`w-full ${className}`}>{children}</section>;
}
