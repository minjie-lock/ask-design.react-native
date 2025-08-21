import { lazy } from 'react';

const Progress = {
  /**
   * @description 进度条
  */
  Bar: lazy(() => import('./bar')),
  /**
   * @description 进度圈
  */
  Circular: lazy(() => import('./circular')),
  /**
   * @description 半圆进度圈
  */
  Semicircle: lazy(() => import('./semicircle')),
};

export default Progress;
