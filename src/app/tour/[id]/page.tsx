import { getTourById } from '@/actions/tourAction/tourActions';
import React from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar } from 'react-icons/fa';
import ReviewForm from '@/components/reviews/ReviewForm';
import { createReview } from '@/actions/reviewAction/reviewActions';

async function TourPackage({ params }: { params: { id: string } }) {
  const data = await getTourById(params.id).then((data) => data.data.data);
 const addReview = async ( review: string, rating: number, tourId: string, userId : string ) => {
    "use server";
     return await createReview( review, rating, tourId, userId );
  }
  console.log(data);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
        <h2 className="text-xl text-gray-600 mb-2">{data.summary}</h2>
        <Image src={`/img/tours/${data.imageCover}`} alt={data.name} width={600} height={400} className="rounded-lg" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">Tour Details</h3>
          <p><strong>Price:</strong> ${data.price}</p>
          <p><strong>Duration:</strong> {data.duration} days</p>
          <p><strong>Difficulty:</strong> {data.difficulty}</p>
          <p><strong>Max Group Size:</strong> {data.maxGroupSize}</p>
          <p className="flex items-center"><strong>Ratings:</strong> {renderStars(data.ratingsAverage)} ({data.ratingsQuantity} reviews)</p>
          <p><strong>Description:</strong> {data.description}</p>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">Locations</h3>
          <ul>
            {data.locations.map((location: any) => (
              <li key={location.id} className="mb-4">
                <h4 className="text-xl font-bold">{location.description}</h4>
                <p><strong>Coordinates:</strong> {location.coordinates.join(', ')}</p>
                <p><strong>Day:</strong> {location.day}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Start Location</h3>
        <p><strong>Address:</strong> {data.startLocation.address}</p>
        <p><strong>Description:</strong> {data.startLocation.description}</p>
        <p><strong>Coordinates:</strong> {data.startLocation.coordinates.join(', ')}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Images</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.images.map((image: any, index: number) => (
            <Image key={index} src={`/img/tours/${image}`} alt={`Tour image ${index + 1}`} width={300} height={200} className="rounded-lg" />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {data.reviews.map((review: any) => (
          <div key={review.id} className="mb-4 p-4 border rounded-lg">
            <h4 className="text-xl font-bold">{review.user.name}</h4>
            <p className="flex items-center"><strong>Rating:</strong> {renderStars(review.rating)}</p>
            <p>{review.review}</p>
            <p className="text-sm text-gray-500"><em>{new Date(review.createdAt).toLocaleDateString()}</em></p>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Add Your Review</h3>
        <ReviewForm tourId={params.id}  addReview={addReview} />
      </div>
    </div>
  );
}

export default TourPackage;
