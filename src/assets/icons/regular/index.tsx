import React from 'react';
import type { SVGProps } from 'react';

export const ArrowPath = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.93 10.243a7.25 7.25 0 0 1 12.378-3.16L19.5 9.274H14.25a.5.5 0 0 0 0 1h6.25a.5.5 0 0 0 .5-.5V3.524a.5.5 0 0 0-1 0v5.25l-2.192-2.191a8.25 8.25 0 0 0-14.073 3.597.5.5 0 1 0 .976.215l.22-.152ZM19.07 13.757a7.25 7.25 0 0 1-12.378 3.16L4.5 14.726H9.75a.5.5 0 0 0 0-1H3.5a.5.5 0 0 0-.5.5v6.25a.5.5 0 0 0 1 0v-5.25l2.192 2.191a8.25 8.25 0 0 0 14.073-3.597.5.5 0 0 0-.976-.215l-.22.152Z" clipRule="evenodd" />
  </svg>
);

export const Bolt = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3.75 13.5 14.25 2.25 12 10.5h8.25L10.5 21.75 12.75 13.5H3.75Z" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);

export const CustomStar = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" {...props}>
    <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6 68.6-141.3C270.3 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
  </svg>
);

export const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.75 5a.75.75 0 0 0-1.5 0v6.25H5a.75.75 0 0 0 0 1.5h6.25V19a.75.75 0 0 0 1.5 0v-6.25H19a.75.75 0 0 0 0-1.5h-6.25V5Z" />
  </svg>
);

export const Minus = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5 11.25a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5H5Z" />
  </svg>
);
