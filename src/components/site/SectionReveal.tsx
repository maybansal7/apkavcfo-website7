import { useEffect, useRef, useState, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SectionRevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
};

const SectionReveal = ({ className, delay = 0, children, ...props }: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default SectionReveal;