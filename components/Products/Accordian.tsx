"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LucideIcon } from "lucide-react";

import React from "react";

const Accordian = ({
  title,
  description,
}: {
  title: string;
  description: string | { title: string; img: any }[];
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-lato uppercase text-xs laptop:text-sm tracking-widest">
          {title}
        </AccordionTrigger>
        <AccordionContent className="space-y-3 py-4">
          {typeof description === "string" ? (
            <p className="font-lato uppercase tracking-widest text-[11px] text-muted-foreground">
              {title === "Features"
                ? description.split("\n")?.map((line, index) => (
                    // Render each line with appropriate formatting
                    <p key={index}>
                      <strong>{line.split(":")[0]?.trim()}:</strong>{" "}
                      {line.split(":")[1]?.trim()}
                    </p>
                  ))
                : description}
            </p>
          ) : (
            description?.map((desc, index) => {
              return (
                <div key={index} className="flex">
                  <ul className="flex justify-center items-center gap-2">
                    {desc.img}
                    <li className="font-lato uppercase tracking-widest text-[11px]">
                      {desc.title}
                    </li>
                  </ul>
                </div>
              );
            })
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Accordian;
