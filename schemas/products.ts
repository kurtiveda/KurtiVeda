import { defineField } from "sanity";
import { ShirtIcon } from "lucide-react";
import category from "./categories";

const Products = {
  name: "Products",
  title: "Products",
  type: "document",
  icon: ShirtIcon,
  fields: [
    defineField({
      name: "Title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(5),
    }),
    defineField({
      name: "line_description",
      title: "Line Description",
      type: "string",
      description: "Write one line description of the product",
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Write a brief description of the product",
      validation: (Rule) => Rule.required().min(10).max(400),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "text",
      description: "Write Features of the product",
      validation: (Rule) => Rule.required().min(10).max(300),
    }),
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "Category",
            },
          ],
        },
      ],
      description: "Categories to which the product belongs",
    },
    {
      name: "productMedia",
      title: "Product Images",
      type: "array",
      of: [{ type: "image" }],
      description: "Upload Product Media",
      options: { hotspot: true, layout: "grid" },
    },
    {
      name: "Price",
      title: "Price",
      description: "Enter Price in INR",
      type: "number",
    },
    {
      name: "sizes",
      title: "Sizes",
      description: "Sizes for the product",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "out_of_stock",
      type: "boolean",
      title: "Out of Stock",
      description: "Is the product out of stock?",
    },
  ],
};

export default Products;
