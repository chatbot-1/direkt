// Animated SVG icons per category. SMIL animateTransform / animate are used
// for SVG-internal motion (rotation around a precise center, radius pulse)
// because CSS transform-origin on SVG <g> is browser-flaky.

type Props = { slug: string };

export function CategoryIcon({ slug }: Props) {
  switch (slug) {
    case "shoes":
      return <ShoesIcon />;
    case "shirts":
      return <ShirtIcon />;
    case "watches":
      return <WatchIcon />;
    case "jackets":
      return <JacketIcon />;
    case "bags":
      return <BagIcon />;
    case "electronics":
      return <ElectronicsIcon />;
    default:
      return <DotIcon />;
  }
}

function ShoesIcon() {
  return (
    <svg
      viewBox="0 0 100 70"
      className="w-full h-full drop-shadow-2xl"
      fill="currentColor"
    >
      <g>
        <path d="M5 50 Q5 38 18 36 L32 30 Q42 22 55 22 L72 24 Q85 26 90 38 L94 48 Q97 50 97 54 L97 60 Q97 64 93 64 L9 64 Q5 64 5 60 Z" />
        <g
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        >
          <line x1="34" y1="38" x2="48" y2="34" />
          <line x1="38" y1="44" x2="52" y2="40" />
          <line x1="42" y1="50" x2="56" y2="46" />
        </g>
        <circle cx="20" cy="58" r="3" fill="rgba(0,0,0,0.25)" />
        <circle cx="82" cy="58" r="3" fill="rgba(0,0,0,0.25)" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-4 50 64; 4 50 64; -4 50 64"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

function ShirtIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full drop-shadow-2xl"
      fill="currentColor"
    >
      <g>
        <path d="M30 18 L18 26 L8 38 L18 50 L26 44 L26 86 Q26 92 32 92 L68 92 Q74 92 74 86 L74 44 L82 50 L92 38 L82 26 L70 18 Q60 32 50 32 Q40 32 30 18 Z" />
        <line
          x1="50"
          y1="33"
          x2="50"
          y2="46"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="2"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-3 50 18; 3 50 18; -3 50 18"
          dur="3.2s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

function WatchIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full drop-shadow-2xl"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* straps */}
      <path d="M38 5 L62 5 L60 25 L40 25 Z" fill="currentColor" />
      <path d="M40 75 L60 75 L62 95 L38 95 Z" fill="currentColor" />
      {/* face */}
      <circle cx="50" cy="50" r="26" fill="rgba(0,0,0,0.25)" />
      <circle cx="50" cy="50" r="26" />
      {/* hour ticks */}
      <line x1="50" y1="29" x2="50" y2="33" />
      <line x1="71" y1="50" x2="67" y2="50" />
      <line x1="50" y1="71" x2="50" y2="67" />
      <line x1="29" y1="50" x2="33" y2="50" />
      {/* hour + minute hands (static) */}
      <line x1="50" y1="50" x2="50" y2="38" strokeWidth="3.5" />
      <line x1="50" y1="50" x2="63" y2="50" strokeWidth="2.5" />
      {/* second hand — spins */}
      <g>
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="32"
          stroke="#f472b6"
          strokeWidth="1.6"
        />
        <circle cx="50" cy="50" r="2.5" fill="#f472b6" stroke="none" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

function JacketIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full drop-shadow-2xl"
      fill="currentColor"
    >
      <g>
        {/* hood */}
        <ellipse cx="50" cy="22" rx="20" ry="14" />
        {/* body */}
        <path d="M22 32 L16 42 L8 52 L20 64 L26 58 L26 92 Q26 96 30 96 L70 96 Q74 96 74 92 L74 58 L80 64 L92 52 L84 42 L78 32 L66 30 Q58 40 50 40 Q42 40 34 30 Z" />
        {/* zipper */}
        <line
          x1="50"
          y1="42"
          x2="50"
          y2="94"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="1.5"
        />
        <circle cx="50" cy="44" r="2" fill="rgba(255,255,255,0.7)" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-2 50 22; 2 50 22; -2 50 22"
          dur="3.6s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full drop-shadow-2xl"
      fill="currentColor"
    >
      <g>
        {/* top loop */}
        <path
          d="M38 14 Q50 4 62 14"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* body */}
        <rect x="18" y="20" width="64" height="68" rx="12" />
        {/* front pocket */}
        <rect
          x="30"
          y="46"
          width="40"
          height="32"
          rx="6"
          fill="rgba(0,0,0,0.22)"
        />
        {/* zipper */}
        <line
          x1="32"
          y1="38"
          x2="68"
          y2="38"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -6; 0 0"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

function ElectronicsIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full drop-shadow-2xl"
      fill="currentColor"
    >
      {/* pulse rings */}
      <circle
        cx="50"
        cy="55"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
      >
        <animate
          attributeName="r"
          from="24"
          to="44"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.7"
          to="0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="50"
        cy="55"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
      >
        <animate
          attributeName="r"
          from="24"
          to="44"
          dur="2s"
          begin="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.7"
          to="0"
          dur="2s"
          begin="1s"
          repeatCount="indefinite"
        />
      </circle>
      {/* headphones */}
      <path
        d="M26 55 Q26 25 50 25 Q74 25 74 55"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="18" y="52" width="18" height="30" rx="6" />
      <rect x="64" y="52" width="18" height="30" rx="6" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
      <circle cx="50" cy="50" r="20" />
    </svg>
  );
}
