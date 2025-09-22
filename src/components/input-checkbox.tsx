import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import CheckIcon from "../assets/icons/check.svg?react";
import Icon from "./icon";
import Skeleton from "./skeleton";

export const inputCheckboxWeapperVariants = cva(`
  inline-flex items-center justify-center 
  relative group
`);

export const inputCheckboxVariants = cva(`
  appearance-none peer flex items-center justify-center
  transition overflow-hidden
   cursor-pointer
 `,
 {
  variants: {
    variant: {
      none: "",
      default: `
        border-2 border-solid border-green-base hover:border-green-dark hover:bg-green-dark/20
        checked:border-green-base checked:bg-green-base
        group-hover:checked:border-green-dark group-hover:checked:bg-green-dark
      `
    },
    size: {
      md: "w-5 h-5 rounded-sm"
    },
    disabled: {
      true: "pointer-events-none"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false
  }
 }
);

export const inputCheckboxIconVariants = cva(
  `
    absolute top-1/2 left-1 -translate-y-1/2
    hidden peer-checked:block fill-white
  `,
  {
    variants: {
      size: {
        md: "w-3 h-3"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

interface inputCheckboxProps extends 
VariantProps<typeof inputCheckboxVariants>,
Omit<React.ComponentProps<'input'>, 'size' | 'disabled'> {
  loading?: boolean
}

export default function InputChecbox({
  variant,
  size, 
  disabled, 
  loading,
  className,
  ...props
}: inputCheckboxProps) {
  if (loading) {
    return (
      <Skeleton
        rounded="sm" 
        className={inputCheckboxVariants({ variant: 'none',size})}
      />
    )
  }

  return (
    <label className={inputCheckboxWeapperVariants({className})}>
      <input 
        type="checkbox" 
        className={inputCheckboxVariants({variant, size, disabled})}
        {...props} 
      />
      <Icon className={inputCheckboxIconVariants({size})} svg={CheckIcon} />
    </label>
  )
}