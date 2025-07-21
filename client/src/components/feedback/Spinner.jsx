import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
};

export default Spinner;
