export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Delicious Food
            <br />
            <span className="text-yellow-300">Delivered Fast</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-gray-100">
            Order from the best restaurants in Jaipur. Fresh ingredients, amazing flavors, delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
              Order Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-500 transition-all">
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-40 w-24 h-24 bg-pink-300/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 left-20 w-40 h-40 bg-red-300/20 rounded-full blur-xl"></div>
    </section>
  )
}