export const products = [
  {
    id: 1,
    name: "White Shirt",
    price: 22.99,
    description: "A timeless essential. Our White Shirt is made from 100% premium cotton for ultimate comfort and durability. Perfect for any occasion, this versatile piece features a relaxed fit and clean lines.",
    colors: ["White"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "basics",
    image: "/images/white shirt (1)_1764454935023.jpg",
    images: [
      "/images/white shirt (1)_1764454935023.jpg",
      "/images/white shirt (2)_1764454935025.jpg",
      "/images/white shirt (3)_1764454935025.jpg",
      "/images/white shirt (4)_1764454935026.jpg",
      "/images/white shirt (5)_1764454935028.jpg",
      "/images/white shirt (6)_1764454935029.jpg",
      "/images/white shirt (7)_1764454935030.jpg"
    ],
    featured: true,
    new: true
  },
  {
    id: 2,
    name: "Black Shirt",
    price: 24.99,
    description: "Bold and sophisticated. The Black Shirt offers a sleek look with premium quality fabric. Made from soft-touch cotton blend that maintains its color wash after wash.",
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "basics",
    image: "/images/black shirt (1)_1764454943194.jpg",
    images: [
      "/images/black shirt (1)_1764454943194.jpg",
      "/images/black shirt (2)_1764454943195.jpg",
      "/images/black shirt (3)_1764454943196.jpg",
      "/images/black shirt (4)_1764454943197.jpg",
      "/images/black shirt (5)_1764454943197.jpg",
      "/images/black shirt (6)_1764454943198.jpg",
      "/images/black shirt (7)_1764454943199.jpg"
    ],
    featured: true,
    new: true
  },
  {
    id: 3,
    name: "Brown Shirt",
    price: 36.99,
    description: "Warm and earthy. The Brown Shirt brings a natural, grounded aesthetic to your wardrobe. Crafted from premium cotton with a subtle texture that adds depth to any outfit.",
    colors: ["Brown"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "basics",
    collection: "summer",
    image: "/images/brown shirt (1).jpg",
    images: [
      "/images/brown shirt (1).jpg",
      "/images/brown shirt (2).jpg",
      "/images/brown shirt (3).jpg",
      "/images/brown shirt (4).jpg",
      "/images/brown shirt (5).jpg",
      "/images/brown shirt (6).jpg",
      "/images/brown shirt (7).jpg"
    ],
    featured: false,
    new: false
  },
  {
    id: 4,
    name: "Gray Shirt",
    price: 23.99,
    description: "Understated elegance. Our Gray Shirt offers the perfect neutral tone for any style. Made from soft, breathable cotton that feels great all day long.",
    colors: ["Gray"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "basics",
    image: "/images/gray shirt (1).jpg",
    images: [
      "/images/gray shirt (1).jpg",
      "/images/gray shirt (2).jpg",
      "/images/gray shirt (3).jpg",
      "/images/gray shirt (4).jpg",
      "/images/gray shirt (5).jpg",
      "/images/gray shirt (6).jpg",
      "/images/gray shirt (7).jpg",
      "/images/gray shirt (8).jpg"
    ],
    featured: true,
    new: true
  },
  {
    id: 5,
    name: "Green Shirt",
    price: 38.99,
    description: "Fresh and vibrant. The Green Shirt adds a pop of natural color to your collection. Premium quality cotton with excellent color retention for long-lasting wear.",
    colors: ["Green"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "basics",
    collection: "summer",
    image: "/images/green shirt (1).jpg",
    images: [
      "/images/green shirt (1).jpg",
      "/images/green shirt (2).jpg",
      "/images/green shirt (3).jpg",
      "/images/green shirt (4).jpg",
      "/images/green shirt (5).jpg",
      "/images/green shirt (6).jpg",
      "/images/green shirt (7).jpg",
      "/images/green shirt (8).jpg"
    ],
    featured: false,
    new: false
  },
  {
    id: 6,
    name: "Light Blue Shirt",
    price: 37.99,
    description: "Cool and calming. Our Light Blue Shirt brings a refreshing, airy feel to your wardrobe. Soft cotton fabric with a relaxed fit perfect for casual and smart-casual occasions.",
    colors: ["Light Blue"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "basics",
    collection: "summer",
    image: "/images/light blue shirt (1).jpg",
    images: [
      "/images/light blue shirt (1).jpg",
      "/images/light blue shirt (2).jpg",
      "/images/light blue shirt (3).jpg",
      "/images/light blue shirt (4).jpg",
      "/images/light blue shirt (5).jpg",
      "/images/light blue shirt (6).jpg",
      "/images/light blue shirt (7).jpg",
      "/images/light blue shirt (8).jpg"
    ],
    featured: false,
    new: false
  },
  {
    id: 7,
    name: "Marine Shirt",
    price: 39.99,
    description: "Deep and distinguished. The Marine Shirt offers a rich, navy-inspired shade that works beautifully with any outfit. Premium cotton construction ensures lasting comfort and quality.",
    colors: ["Marine"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "basics",
    image: "/images/marine shirt (1).jpg",
    images: [
      "/images/marine shirt (1).jpg",
      "/images/marine shirt (2).jpg",
      "/images/marine shirt (3).jpg",
      "/images/marine shirt (4).jpg",
      "/images/marine shirt (5).jpg",
      "/images/marine shirt (6).jpg",
      "/images/marine shirt (7).jpg"
    ],
    featured: false,
    new: false
  }
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "new", name: "New Products" }
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const colors = ["White", "Black", "Brown", "Gray", "Green", "Light Blue", "Marine"];

export const priceRanges = [
  { id: "all", name: "All Prices", min: 0, max: Infinity },
  { id: "under30", name: "Under €30", min: 0, max: 30 },
  { id: "over30", name: "Over €30", min: 30, max: Infinity }
];
