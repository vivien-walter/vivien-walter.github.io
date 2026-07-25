import type { Icon } from '@phosphor-icons/react';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';

type OrcidIconProps = ComponentPropsWithoutRef<Icon>;

const OrcidIcon = forwardRef<SVGSVGElement, OrcidIconProps>(
  ({ className, color = 'currentColor', mirrored = false, size = '1em', weight = 'regular', ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      color={color}
      data-weight={weight}
      className={className}
      {...props}
    >
      <g transform={mirrored ? 'translate(32 0) scale(-1 1)' : undefined}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="
    M32 16
    c0 8.837-7.163 16-16 16
    C7.162 32 0 24.837 0 16
    C0 7.162 7.162 0 16 0
    c8.837 0 16 7.162 16 16
    Z

    M18.813 9.637
    h-5.45
    v13.9
    h5.474
    c4.555 0 7.35-3.378 7.35-6.95
    c0-1.635-.562-3.372-1.77-4.704
    c-1.215-1.336-3.065-2.246-5.605-2.246
    Z

    M18.6 21.3
    h-2.813
    v-9.425
    H18.5
    c1.823 0 3.12.552 3.96 1.4
    c.842.849 1.252 2.021 1.252 3.312
    c0 .784-.239 1.967-.993 2.948
    c-.745.969-2.01 1.765-4.119 1.765
    Z

    M8.363 9.675
    v13.887
    h2.425
    V9.675
    H8.363
    Z

    M9.575 8.65
    c.84 0 1.513-.689 1.513-1.513
    c0-.823-.673-1.512-1.513-1.512
    c-.838 0-1.512.674-1.512 1.513
    c0 .823.672 1.512 1.512 1.512
    Z
  "
        />
      </g>
    </svg>
  ),
) satisfies Icon;

OrcidIcon.displayName = 'OrcidIcon';

export { OrcidIcon, type OrcidIconProps };
