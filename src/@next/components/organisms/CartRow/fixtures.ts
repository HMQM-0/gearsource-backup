import productImage from "./productImage.png";

export const DEFAULT_PROPS = {
  attributes: [
    {
      attribute: {
        id: "1",
        name: "Color",
      },
      values: [
        {
          name: "Yellow",
        },
      ],
    },
    {
      attribute: {
        id: "2",
        name: "Size",
      },
      values: [
        {
          name: "Large",
        },
      ],
    },
    {
      attribute: {
        id: "3",
        name: "Legs",
      },
      values: [
        {
          name: "Square",
        },
      ],
    },
    {
      attribute: {
        id: "4",
        name: "Armrest",
      },
      values: [
        {
          name: "None",
        },
      ],
    },
  ],
  id: "UHJvZHVjdDoz",
  maxQuantity: 5,
  variant: {
    id: "UHJvZHVjdFZhcmlhbnQ6Mw==",
    name: "The Great Square Table",
    slug: "the-great-square-table",
  },
  name: "The Great Square Table",
  quantity: 3,
  sku: "R4ND-0M-5KU",
  thumbnail: {
    alt: "product image",
    url: productImage,
  },
  totalPrice: "150$",
  unitPrice: "50$",
};
