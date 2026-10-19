import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { Size } from '@/types';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: Size;
  fullWidth?: boolean;
  iconOnly?: boolean;
}

interface ButtonBaseProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    Omit<ButtonStyleOptions, 'iconOnly'> {
  isLoading?: boolean;
}

/** Labelled button with optional leading/trailing icons. */
interface TextButtonProps {
  iconOnly?: false;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  icon?: never;
}

/** Square icon button — an accessible label is mandatory. */
interface IconButtonProps {
  iconOnly: true;
  icon: ReactNode;
  'aria-label': string;
  children?: never;
  leftIcon?: never;
  rightIcon?: never;
}

export type ButtonProps = ButtonBaseProps & (TextButtonProps | IconButtonProps);
