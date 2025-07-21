import React from 'react';

const RatingStars = ({ rating = 4 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
      ★
    </span>
  ));
  return <div className="text-sm">{stars}</div>;
};

export default RatingStars;
