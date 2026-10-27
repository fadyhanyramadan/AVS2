"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon, MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}) {
  return (
    (<AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props} />)
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Header className="flex ">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4  p-4 text-left capitalize text-lg font-bold transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg.minus-icon]:block [&[data-state=open]>svg.plus-icon]:hidden [&[data-state=closed]>svg.minus-icon]:hidden [&[data-state=closed]>svg.plus-icon]:block  rounded-2xl text-main bg-light-black border border-main ",
          className
        )}
        {...props}>
        {children}
        {/* Plus Icon */}
        <PlusIcon className="plus-icon text-main pointer-events-none size-6 shrink-0 translate-y-0.5 transition-transform duration-200" />
        {/* Minus Icon */}
        <MinusIcon className="minus-icon text-main pointer-events-none size-6 shrink-0 translate-y-0.5 transition-transform duration-200 hidden" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}) {
  return (
    (<AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-white p-4   border-t-0 "
      {...props}>
      <div className={cn("pt-0 ", className)}>{children}</div>
    </AccordionPrimitive.Content>)
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }