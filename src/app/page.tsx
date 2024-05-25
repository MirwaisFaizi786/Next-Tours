import fetchToursData from "@/actions/tourAction/tourActions";

import { TourType } from "@/types/tourType";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const toursData = await fetchToursData().then((data) => data.data.data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-4xl font-bold mb-8">Available Tours</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {toursData?.map((tour: TourType) => (
          <Link href={`/tour/${tour._id}`} key={tour._id}>
            <div className="tour-card w-full h-full border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={`/img/tours/${tour.imageCover}`}
                alt={tour.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{tour.name}</h2>
                <h3 className="text-xl text-gray-500 mb-4">${tour.price}</h3>
                <p className="text-gray-700">{tour.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
