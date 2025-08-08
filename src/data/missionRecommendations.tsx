import React from 'react';
export const getMissionRecommendations = (squad: any, missionType: any, infiltration: number) => {
  const recommendations: string[] = [];
  // Squad size recommendations
  const sizeDiff = missionType.recommendedSquadSize - squad.soldiers.length;
  if (sizeDiff > 0) {
    recommendations.push(`Consider adding ${sizeDiff} more soldier${sizeDiff > 1 ? 's' : ''} to match the recommended squad size of ${missionType.recommendedSquadSize}.`);
  } else if (sizeDiff < -2) {
    recommendations.push('Large squad size will significantly impact infiltration time. Consider a smaller team for better infiltration.');
  }
  // Infiltration recommendations
  if (infiltration < 100) {
    recommendations.push('Low infiltration will result in increased enemy presence. Consider lighter equipment or a smaller squad.');
  } else if (infiltration > 150) {
    recommendations.push('Excellent infiltration level. Expect minimal resistance and good ambush opportunities.');
  }
  // Class-specific recommendations
  const classCount = squad.soldiers.reduce((acc: any, soldier: any) => {
    acc[soldier.class] = (acc[soldier.class] || 0) + 1;
    return acc;
  }, {});
  // Mission-specific class recommendations
  switch (missionType.name) {
    case 'Supply Raid':
      if (!classCount['grenadier'] && !classCount['technical']) {
        recommendations.push('Consider bringing a Grenadier or Technical for destroying cover and supplies.');
      }
      break;
    case 'Guerrilla Operation':
      if (!classCount['shinobi']) {
        recommendations.push('A Shinobi would be valuable for scouting and stealth approaches.');
      }
      break;
    case 'Network Tower Assault':
      if (!classCount['specialist']) {
        recommendations.push('A Specialist is highly recommended for hacking objectives.');
      }
      break;
    case 'Retaliation Strike':
      if (!classCount['sharpshooter'] && !classCount['gunner']) {
        recommendations.push('Consider bringing a Sharpshooter or Gunner for overwatch control.');
      }
      break;
  }
  // General squad composition recommendations
  if (!classCount['specialist']) {
    recommendations.push('No medic in squad. Consider bringing a Specialist for healing support.');
  }
  if (!classCount['shinobi'] && !classCount['ranger']) {
    recommendations.push('No stealth capabilities in squad. Consider adding a Shinobi or Ranger for scouting.');
  }
  // Return unique recommendations only
  return Array.from(new Set(recommendations));
};