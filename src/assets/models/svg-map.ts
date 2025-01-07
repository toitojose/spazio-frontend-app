export const svgMap = {
  bgPerson: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 542" preserveAspectRatio="xMidYMid meet">
      <path d="M 1.86 1.23 L 598.14 1.23 L 598.14 540.27 L 1.86 540.27 Z" />
    </svg>
  `,
} as const;

export type SvgMapKeys = keyof typeof svgMap;
