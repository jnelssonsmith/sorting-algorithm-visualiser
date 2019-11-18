export type AlgorithmDetail = {
  title: string;
  description: string;
  space: {
    worstCase: {
      value: string;
      description: string;
    };
    bestCase: {
      value: string;
      description: string;
    };
  };
  time: {
    worstCase: {
      value: string;
      description: string;
    };
    bestCase: {
      value: string;
      description: string;
    };
  };
};
