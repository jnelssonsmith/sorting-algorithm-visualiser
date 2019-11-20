/**
 * An object used to describe an algorithm, including it's name,
 * a brief description of it and it's space and time complexities
 */
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
