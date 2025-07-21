import React from 'react';

const EmptyState = ({ message = "Nothing to show." }) => {
  return (
    <div className="text-center text-muted-foreground py-10">
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
