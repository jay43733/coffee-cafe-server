const prisma = require("../config/prisma");

const productData = [
  {
    name: "Hot Coffee",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728298579/q4nd3ihhpvhyaptpuej6.svg",
    description:
      "Rich, aromatic hot coffee with a deep, bold flavor. Smooth, slightly bitter taste, warm steam rising, comforting and invigorating with every sip.",
    price: 100,
    isRecommended: false,
    product_categoryId: 1,
  },
  {
    name: "Hot Milk Tea",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728298579/o1fwxn1tigpy0lpgbwv9.svg",
    description:
      "A comforting blend of black tea and steamed milk, lightly sweetened, with a creamy texture and warm aroma perfect for relaxation.",
    price: 90,
    isRecommended: false,
    product_categoryId: 2,
  },
  {
    name: "Iced Green Tea",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728298578/hg9oyghrznxy0wvtxkbi.svg",
    description:
      "Green tea is a refreshing, lightly caffeinated beverage made from unoxidized leaves, known for its grassy flavor and numerous health benefits.",
    price: 120,
    isRecommended: false,
    product_categoryId: 2,
  },
  {
    name: "Hot Green Tea",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728298578/jvtvrsu6oswzqikxhtss.svg",
    description:
      "A soothing hot green tea, light and aromatic, with earthy notes and a hint of freshness. Perfect for relaxation and mindfulness.",
    price: 110,
    isRecommended: false,
    product_categoryId: 2,
  },
  {
    name: "Iced Milk",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728298577/tq5f5u9edc7owywxvonn.svg",
    description:
      "Milk is a nutrient-rich liquid produced by mammals, commonly consumed for its calcium, protein, and vitamins, essential for healthy bones.",
    price: 100,
    isRecommended: false,
    product_categoryId: 2,
  },
  {
    name: "Bubble Tea",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728298577/y5lwuo8emfi7mkztk5a5.svg",
    description:
      "Sweet, creamy tea with chewy tapioca pearls, offering a unique texture. Flavors range from fruity to classic milk tea",
    price: 100,
    isRecommended: false,
    product_categoryId: 2,
  },
  {
    name: "Chocolate Drink",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728298577/gt3icooggzkrgnh4v1yw.svg",
    description:
      "Smooth, creamy blend of milk and rich cocoa. Sweet and comforting, perfect for both kids and adults, served chilled or warm.",
    price: 100,
    isRecommended: false,
    product_categoryId: 2,
  },
  {
    name: "Brewed Coffee",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728298577/tzojhihlulqalblz05bq.svg",
    description:
      "Rich, aromatic, bold. Simple yet invigorating, brewed coffee is enjoyed black or with added milk and sugar, awakening the senses.",
    price: 100,
    isRecommended: false,
    product_categoryId: 1,
  },
  {
    name: "Strawberry Milk",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728298580/fouls5simoickfan5zn7.svg",
    description:
      "A delightful blend of fresh strawberries and creamy milk, creating a sweet, fruity drink perfect for a refreshing treat.",
    price: 150,
    isRecommended: true,
    product_categoryId: 2,
  },
  {
    name: "Milkshake",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728298579/lqtqohsqjmnb9bqmnfn9.svg",
    description:
      "A classic, thick, and creamy beverage made with chilled milk, ice cream, and your choice of flavors",
    price: 110,
    isRecommended: true,
    product_categoryId: 2,
  },
  {
    name: "Cream Milk",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728399571/s5r0jc19lfxdocbxspxc.svg",
    description:
      "Rich and velvety, cream milk offers a smooth texture and a subtly sweet taste.",
    price: 110,
    isRecommended: true,
    product_categoryId: 2,
  },
  {
    name: "White Hot Tea",
    image:
      "https://res.cloudinary.com/dp7ggau3r/image/upload/v1728399572/iczwygja1jfsqa6kkt3y.svg",
    description:
      "A soothing, mild tea with delicate flavors, often paired with a dash of milk or sweetener.",
    price: 70,
    isRecommended: true,
    product_categoryId: 2,
  },
];

console.log("Seed...");

async function run() {
  await prisma.product.createMany({ data: productData });
}

run();
