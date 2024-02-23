import { defineField } from "sanity";
import { Image } from "lucide-react";

const Banner = {
  name: "Banner",
  title: "Banner",
  type: "document",
  icon: Image,
  fields: [
    defineField({
      name: "Title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(5),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "Write a brief description of the product",
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: "bannerMedia",
      title: "Banner Images",
      type: "array",
      of: [{ type: "image" }],
      description: "Upload Banner Media",
      options: { layout: "grid" },
    }),
  ],
};

export default Banner;
