import { useMemo } from 'react';
import { Soldier } from '../contexts/SquadContext';
import { calculateSquadStats, getClassDistribution } from '../utils/squadUtils';
/**
 * Custom hook to calculate squad statistics and class distribution
 */
export const useSquadStats = (soldiers: Soldier[]) => {
  const squadStats = useMemo(() => calculateSquadStats(soldiers), [soldiers]);
  const classDistribution = useMemo(() => getClassDistribution(soldiers), [soldiers]);
  return {
    squadStats,
    classDistribution
  };
};