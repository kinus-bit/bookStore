import React from 'react';

const PriceTag = ({ price }) => {
  return <span className="font-bold text-lg">${price.toFixed(2)}</span>;
};

export default PriceTag;
