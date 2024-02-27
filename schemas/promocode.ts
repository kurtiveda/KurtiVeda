// schema.js
const promoCode = {
  name: "promoCode",
  title: "Promo Code",
  type: "document",
  fields: [
    {
      name: "code",
      title: "Code",
      type: "string",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "discountType",
      title: "Discount Type",
      type: "string",
      options: {
        list: ["amount", "percentage"], // Option to choose between discount in amount or percentage
      },
    },
    {
      name: "discountValue",
      title: "Discount Value",
      type: "number",
    },
    {
      name: "basePrice",
      title: "Base Price",
      type: "number",
    },
    {
      name: "expirationDate",
      title: "Expiration Date",
      type: "datetime",
    },
    {
      name: "usageLimit",
      title: "Usage Limit",
      type: "number",
    },
    {
      name: "countdown",
      title: "Enable Countdown",
      type: "boolean",
    },
  ],
};
export default promoCode;
