import React from 'react';

const AlgorithmDetailView = ({ algorithmDetails }) => {
  if (!algorithmDetails) {
    return <p>error loading details</p>;
  }

  return (
    <div className="algorithm-details">
      <h2>{algorithmDetails.title}</h2>
      <p>{algorithmDetails.description}</p>
    </div>
  );
};

export default AlgorithmDetailView;
