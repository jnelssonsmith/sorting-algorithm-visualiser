import React from 'react';

import { AlgorithmDetail } from '../types';

interface AlgorithmDetailViewProps {
  algorithmDetail: AlgorithmDetail;
}

const AlgorithmDetailView: React.SFC<AlgorithmDetailViewProps> = ({
  algorithmDetail,
}): JSX.Element => {
  if (!algorithmDetail) {
    return <p>error loading details</p>;
  }

  return (
    <div className="algorithm-details">
      <h2>{algorithmDetail.title}</h2>
      <p>{algorithmDetail.description}</p>
    </div>
  );
};

export default AlgorithmDetailView;
