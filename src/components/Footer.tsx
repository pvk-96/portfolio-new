export default function Footer({ data }: { data: any }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border-main)] py-[1.8rem] px-[clamp(1.5rem,6vw,6rem)] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--color-bg)]">
      <span className="font-mono text-[0.65rem] text-[var(--color-text-dim)] text-center sm:text-left">
        © {currentYear} {data.name}. All rights reserved.
      </span>
      <span className="font-mono text-[0.65rem] text-[var(--color-cyan)] text-center sm:text-right">
        Crafted with precision & cyan.
      </span>
    </footer>
  );
}
