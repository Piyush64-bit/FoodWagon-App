'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

export default function RestaurantGrid({ restaurants }: { restaurants: any[] }) {
  if (!restaurants || restaurants.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">No restaurants found 🥲</p>
    );
  }

  return (
    <div className="container py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {restaurants.map((r) => (
        <div
          key={r.id}
          className="bg-white dark:bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
        >
          <div className="relative w-full h-48">
            <Image
              src={r.image}
              alt={r.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="p-4 space-y-1">
            <h3 className="text-lg font-semibold text-foreground">{r.name}</h3>
            <p className="text-sm text-muted-foreground">
              {r.cuisine} · {r.deliveryTime}
            </p>

            <div className="flex items-center justify-between text-sm text-muted-foreground pt-1">
              <span className="flex items-center gap-1 text-amber-500 font-medium">
                <Star className="h-4 w-4 fill-current" /> {r.rating}
              </span>
              <span>₹{r.deliveryFee} Delivery</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
