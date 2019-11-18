import Frame from '../../models/Frame';
import { Algorithms } from '../../types';

export interface VisualisationControllerProps {
  onReset: Function;
  algorithm: Algorithms;
  speed: number;
  items: number[];
  onRandomise: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  visualisationInProgress: boolean;
  onVisualisationStatusChange: Function;
}

export interface VisualisationControllerState {
  currentFrame: Frame;
}
