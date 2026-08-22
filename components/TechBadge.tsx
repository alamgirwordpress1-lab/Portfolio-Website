import { techIcons } from "@/lib/icons";

export default function TechBadge({
  name,
  size = 18,
  colored = true,
  className = "",
}: {
  name: string;
  size?: number;
  colored?: boolean;
  className?: string;
}) {
  const icon = techIcons[name];
  if (!icon) return null;
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={colored ? `#${icon.hex}` : "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}
