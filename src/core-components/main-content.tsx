import { cx } from "class-variance-authority";
import type React from "react";

interface MainContentProps extends React.ComponentProps<'main'> {
  children: React.ReactNode
}

export default function MainContent({
  children,
  className,
  ...props
}: MainContentProps) {
  return (
    <main className={cx("mt-4 md:mt-8", className)} {...props}>
      {children}
    </main>
  )
}