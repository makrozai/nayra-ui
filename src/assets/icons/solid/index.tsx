import React from 'react';
import type { SVGProps } from 'react';

export const ArrowPath = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903H14.25a.75.75 0 0 0 0 1.5h6.75a.75.75 0 0 0 .75-.75V2.598a.75.75 0 0 0-1.5 0v4.956l-1.903-1.903a9 9 0 0 0-15.065 4.035.75.75 0 0 0 1.473.373ZM19.245 13.941a7.5 7.5 0 0 1-12.548 3.364L4.794 15.402H9.75a.75.75 0 0 0 0-1.5H3a.75.75 0 0 0-.75.75v6.75a.75.75 0 0 0 1.5 0v-4.956l1.903 1.903a9 9 0 0 0 15.065-4.035.75.75 0 0 0-1.473-.373Z" clipRule="evenodd" />
  </svg>
);

export const Bolt = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.303H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.142Z" clipRule="evenodd" />
  </svg>
);

export const CustomStar = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" {...props}>
    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
  </svg>
);

export const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5Z" />
  </svg>
);

export const Minus = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5 11a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2H5Z" />
  </svg>
);
