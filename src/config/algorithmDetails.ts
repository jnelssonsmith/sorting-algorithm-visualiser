import { AlgorithmDetail, Algorithms } from '../types';

const algorthmDetails: { [key in Algorithms]: AlgorithmDetail } = {
  [Algorithms.BUBBLE]: {
    title: 'Bubble Sort',
    description:
      'Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
    space: {
      worstCase: {
        value: '1',
        description:
          'Bubble sort only makes use of in-place swaps so will always only require the space of the given array',
      },
      bestCase: {
        value: '1',
        description:
          'Bubble sort only makes use of in-place swaps so will always only require the space of the given array',
      },
    },
    time: {
      worstCase: {
        value: 'O(n²)',
        description:
          'Corresponds to the case where the elements are in reverse sort order and the maximum distance is traveledby each item propogating to the end of the array',
      },
      bestCase: {
        value: 'O(n)',
        description:
          'If the elements are sorted already only a single pass through the array is required to confirm',
      },
    },
  },
  [Algorithms.SELECTION]: {
    title: 'Selection Sort',
    description:
      'In computer science, selection sort is a sorting algorithm, specifically an in-place comparison sort. It has O time complexity, making it inefficient on large lists, and generally performs worse than the similar insertion sort.',
    space: {
      worstCase: {
        value: '1',
        description:
          'Selection sort only makes use of in-place swaps so will always only require the space of the given array.',
      },
      bestCase: {
        value: '1',
        description:
          'Selection sort only makes use of in-place swaps so will always only require the space of the given array.',
      },
    },
    time: {
      worstCase: {
        value: 'O(n²)',
        description: '',
      },
      bestCase: {
        value: 'O(n²)',
        description: '',
      },
    },
  },
  [Algorithms.INSERTION]: {
    title: 'Insertion Sort',
    description:
      'Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. ',
    space: {
      worstCase: {
        value: '',
        description: '',
      },
      bestCase: {
        value: '',
        description: '',
      },
    },
    time: {
      worstCase: {
        value: '',
        description: '',
      },
      bestCase: {
        value: '',
        description: '',
      },
    },
  },
  [Algorithms.MERGE]: {
    title: 'Merge Sort',
    description:
      'In computer science, merge sort is an efficient, general-purpose, comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.',
    space: {
      worstCase: {
        value: '',
        description: '',
      },
      bestCase: {
        value: '',
        description: '',
      },
    },
    time: {
      worstCase: {
        value: '',
        description: '',
      },
      bestCase: {
        value: '',
        description: '',
      },
    },
  },
  [Algorithms.QUICK]: {
    title: 'Quick Sort',
    description:
      'Quicksort is an efficient sorting algorithm, serving as a systematic method for placing the elements of a random access file or an array in order. Developed by British computer scientist Tony Hoare in 1959 and published in 1961, it is still a commonly used algorithm for sorting.',
    space: {
      worstCase: {
        value: '',
        description: '',
      },
      bestCase: {
        value: '',
        description: '',
      },
    },
    time: {
      worstCase: {
        value: '',
        description: '',
      },
      bestCase: {
        value: '',
        description: '',
      },
    },
  },
};

export default algorthmDetails;
