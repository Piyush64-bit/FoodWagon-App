const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding data...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();

  const restaurantsData = [
    {
      name: 'The Jaipur Tandoori',
      address: 'MI Road, Jaipur',
      cuisine: 'North Indian',
      image: 'https://source.unsplash.com/600x400/?indian,restaurant',
      rating: 4.7,
      description: 'Authentic North Indian cuisine with a modern twist',
      phone: '9785551122',
      deliveryFee: 29,
      deliveryTime: '25-35 mins',
      isActive: true,
    },
    {
      name: 'Pizza Galleria',
      address: 'Tonk Road, Jaipur',
      cuisine: 'Italian',
      image: 'https://source.unsplash.com/600x400/?pizza,restaurant',
      rating: 4.3,
      description: 'Neapolitan wood-fired pizzas',
      phone: '9123456789',
      deliveryFee: 49,
      deliveryTime: '30-45 mins',
      isActive: true,
    },
    {
      name: 'Chaiwala Express',
      address: 'C-Scheme, Jaipur',
      cuisine: 'Street Food',
      image: 'https://source.unsplash.com/600x400/?chai,indian-cafe',
      rating: 4.9,
      description: 'Best chai and street food vibes',
      phone: '9988776655',
      deliveryFee: 19,
      deliveryTime: '20-30 mins',
      isActive: true,
    },
    {
      name: 'Sushi Samurai',
      address: 'Vaishali Nagar, Jaipur',
      cuisine: 'Japanese',
      image: 'https://source.unsplash.com/600x400/?sushi,japanese',
      rating: 4.6,
      description: 'Sushi rolls, ramen, and sake',
      phone: '9900990099',
      deliveryFee: 59,
      deliveryTime: '40-50 mins',
      isActive: true,
    },
  ];

  for (const data of restaurantsData) {
    const restaurant = await prisma.restaurant.create({ data });

    await prisma.menuItem.createMany({
      data: [
        {
          name: 'Paneer Tikka',
          description: 'Grilled paneer chunks',
          price: 249,
          image: 'https://source.unsplash.com/600x400/?paneer,tandoori',
          category: 'Starter',
          isVegetarian: true,
          restaurantId: restaurant.id,
        },
        {
          name: 'Butter Chicken',
          description: 'Creamy tomato gravy with chicken',
          price: 329,
          image: 'https://source.unsplash.com/600x400/?butter-chicken',
          category: 'Main Course',
          isVegetarian: false,
          restaurantId: restaurant.id,
        },
        {
          name: 'Gulab Jamun',
          description: 'Syrupy dessert balls',
          price: 99,
          image: 'https://source.unsplash.com/600x400/?gulab-jamun',
          category: 'Dessert',
          isVegetarian: true,
          restaurantId: restaurant.id,
        },
      ],
    });
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
