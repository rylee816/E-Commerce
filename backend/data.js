import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Randy Riley',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Woozle',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Slim Shirt",
      slug: "nike-slim-shirt",
      category: "Shirts",
      image: "/images/p1.jpg", // 679px × 829px
      price: 120,
      countInStock: 14,
      brand: "Nike",
      rating: 4.5,
      numReviews: 52,
      description: "high quality shirt",
    },
    {
      name: "Adidas Fit Shirt",
      slug: "adidas-fit-shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 108,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 128,
      description: "high quality product",
    },
    {
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      category: "Pants",
      image: "/images/p3.jpg",
      price: 85,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "high quality product",
    },
    {
      name: "Adidas Fit Pant",
      slug: "adidas-fit-pant",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 65,
      countInStock: 5,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 63,
      description: "high quality product",
    },
    {
      name: "Apple AirPods (2nd Gen)",
      slug: "apple-airpods",
      category: "Electronics",
      image: "/images/p5.jpg",
      price: 99.99,
      countInStock: 23,
      brand: "Apple",
      rating: 4,
      numReviews: 185,
      description: "bluetooth headset",
    },
    {
      name: "Michael Kors Bradshaw",
      slug: "michael-kors-bradshaw",
      category: "Accesories",
      image: "/images/p6.jpg",
      price: 275,
      countInStock: 8,
      brand: "Michael Kors",
      rating: 4.5,
      numReviews: 16,
      description: "Oversized Bradshaw Two-Tone Silver",
    },
    {
      name: "DKNY Men's Modern-Fit Stretch Suit",
      slug: "dkny-mens-modern-fit-stretch",
      category: "Suits",
      image: "/images/p7.webp",
      price: 234,
      countInStock: 12,
      brand: "DKNY",
      rating: 4.5,
      numReviews: 23,
      description: "Men's comfort stretch modern fit suit",
    },
    {
      name: "North Face Explore Fusebox Backpack—S",
      slug: "north-face-explore-fusebox-backpack",
      category: "Outdoors",
      image: "/images/p8.png",
      price: 125,
      countInStock: 18,
      brand: "North Face",
      rating: 5,
      numReviews: 46,
      description: "Ultra-durable and super-functional, the Explore Fusebox—S hauls what you need when you’re traversing the city on two wheels, four wheels, or on foot. ",
    },
  ],
};
export default data;
