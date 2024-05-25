"use client";
import React, { useState, FormEvent } from 'react';
import { FaStar } from 'react-icons/fa';

interface ReviewFormProps {
  tourId: string;
  userId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ tourId, userId }) => {
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ review, rating, tourId, userId })
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.error('Error submitting review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={review}
        name="review"
        rows={4}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review"
        required
        className="border border-gray-300 rounded-lg placeholder-shown: p-2"
      />

      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                className="hidden"
              />
              <FaStar
                className="cursor-pointer"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>

      <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
