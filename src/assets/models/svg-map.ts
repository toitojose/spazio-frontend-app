export const svgMap = {
  bgPerson: () => import('@/assets/svg/bg-person.svg?raw'),
} as const;
export type SvgMapKeys = keyof typeof svgMap;
