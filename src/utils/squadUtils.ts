import { Soldier } from '../contexts/SquadContext';
/**
 * Calculate statistics for a squad based on its soldiers
 */
export const calculateSquadStats = (soldiers: Soldier[]) => {
  const stats = soldiers.reduce((acc, soldier) => ({
    totalHealth: acc.totalHealth + soldier.health,
    avgAim: acc.avgAim + soldier.aim,
    avgMobility: acc.avgMobility + soldier.mobility,
    avgWill: acc.avgWill + soldier.will
  }), {
    totalHealth: 0,
    avgAim: 0,
    avgMobility: 0,
    avgWill: 0
  });
  const count = soldiers.length;
  if (count > 0) {
    stats.avgAim = Math.round(stats.avgAim / count);
    stats.avgMobility = Math.round(stats.avgMobility / count);
    stats.avgWill = Math.round(stats.avgWill / count);
  }
  return stats;
};
/**
 * Get distribution of soldier classes in a squad
 */
export const getClassDistribution = (soldiers: Soldier[]) => {
  return soldiers.reduce((acc, soldier) => {
    acc[soldier.class] = (acc[soldier.class] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};
/**
 * Get color for infiltration percentage
 */
export const getInfiltrationColor = (value: number) => {
  if (value >= 150) return 'text-green-400';
  if (value >= 100) return 'text-blue-400';
  if (value >= 75) return 'text-yellow-400';
  if (value >= 50) return 'text-orange-400';
  return 'text-red-400';
};
/**
 * Get color for threat level
 */
export const getThreatColor = (threat: string) => {
  switch (threat) {
    case 'light':
      return 'bg-green-900/50 text-green-300';
    case 'moderate':
      return 'bg-yellow-900/50 text-yellow-300';
    case 'heavy':
      return 'bg-orange-900/50 text-orange-300';
    case 'very heavy':
      return 'bg-red-900/50 text-red-300';
    case 'extreme':
      return 'bg-purple-900/50 text-purple-300';
    default:
      return 'bg-gray-900/50 text-gray-300';
  }
};