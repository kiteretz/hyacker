import { extendTailwindMerge } from 'tailwind-merge';

type CustomIds = 'clamp--h';

export const twMerge = extendTailwindMerge<CustomIds>({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            (v: string) => /^(clamp-)?\d+$/.test(v),
          ],
        },
      ],
      'clamp--h': [{ 'clamp--h': [(v: string) => /^\d+$/.test(v)] }],
    },
  },
});
