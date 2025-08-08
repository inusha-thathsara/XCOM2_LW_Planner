import { jsPDF } from 'jspdf';
import type { Squad } from '../contexts/SquadContext';
import { missionTypes } from '../data/missionData';
import { calculateSquadStats, getClassDistribution } from '../utils/squadUtils';
const exportAsJson = (squads: Squad[]): string => {
  return JSON.stringify(squads, null, 2);
};
const exportAsText = (squads: Squad[]): string => {
  return squads.map(squad => {
    const missionInfo = squad.missionType ? `\nMission: ${squad.missionType}\nInfiltration: ${squad.infiltration}%\nThreat Level: ${squad.threatLevel}` : '\nNo mission assigned';
    const soldiers = squad.soldiers.map(soldier => `  - ${soldier.name} (${soldier.class}, Rank ${soldier.rank})\n    Equipment: ${soldier.primaryWeapon}${soldier.utilities.length > 0 ? `, ${soldier.utilities.join(', ')}` : ''}`).join('\n');
    return `Squad: ${squad.name}${missionInfo}\n\nSoldiers:\n${soldiers}\n\n${'-'.repeat(50)}\n`;
  }).join('\n');
};
const exportAsPdf = async (squads: Squad[]): Promise<void> => {
  const doc = new jsPDF();
  squads.forEach((squad, squadIndex) => {
    if (squadIndex > 0) {
      doc.addPage();
    }
    // Squad Header
    doc.setFontSize(24);
    doc.setTextColor(59, 130, 246); // Blue
    doc.text(squad.name, 20, 20);
    let yPos = 40;
    // Mission Information
    if (squad.missionType) {
      const mission = missionTypes[squad.missionType];
      doc.setFontSize(16);
      doc.setTextColor(59, 130, 246);
      doc.text('Mission Details', 20, yPos);
      yPos += 10;
      doc.setFontSize(12);
      doc.setTextColor(75, 85, 99);
      doc.text(`Type: ${mission.name}`, 25, yPos);
      yPos += 7;
      doc.text(`Description: ${mission.description}`, 25, yPos, {
        maxWidth: 170
      });
      yPos += 14;
      doc.text(`Infiltration: ${squad.infiltration}%`, 25, yPos);
      yPos += 7;
      doc.text(`Threat Level: ${squad.threatLevel || 'Moderate'}`, 25, yPos);
      yPos += 7;
      doc.text(`Recommended Size: ${mission.recommendedSquadSize}`, 25, yPos);
      yPos += 7;
      doc.text(`Expected Rewards: ${mission.rewards}`, 25, yPos);
      yPos += 20;
    }
    // Squad Statistics
    const stats = calculateSquadStats(squad.soldiers);
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text('Squad Statistics', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(75, 85, 99);
    doc.text(`Total Health: ${stats.totalHealth}`, 25, yPos);
    yPos += 7;
    doc.text(`Average Aim: ${stats.avgAim}`, 25, yPos);
    yPos += 7;
    doc.text(`Average Mobility: ${stats.avgMobility}`, 25, yPos);
    yPos += 7;
    doc.text(`Average Will: ${stats.avgWill}`, 25, yPos);
    yPos += 20;
    // Class Distribution
    const distribution = getClassDistribution(squad.soldiers);
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text('Class Distribution', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(75, 85, 99);
    Object.entries(distribution).forEach(([className, count]) => {
      doc.text(`${className.charAt(0).toUpperCase() + className.slice(1)}: ${count}`, 25, yPos);
      yPos += 7;
    });
    yPos += 13;
    // Squad Members
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text('Squad Members', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(75, 85, 99);
    squad.soldiers.forEach(soldier => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${soldier.name} (${soldier.class}, Rank ${soldier.rank})`, 25, yPos);
      doc.text(`Equipment: ${soldier.primaryWeapon}${soldier.utilities.length > 0 ? `, ${soldier.utilities.join(', ')}` : ''}`, 30, yPos + 7);
      yPos += 20;
    });
    // Notes
    if (squad.notes) {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(16);
      doc.setTextColor(59, 130, 246);
      doc.text('Mission Notes', 20, yPos);
      yPos += 10;
      doc.setFontSize(12);
      doc.setTextColor(75, 85, 99);
      doc.text(squad.notes, 25, yPos, {
        maxWidth: 170
      });
    }
  });
  doc.save('lw2-squads.pdf');
};
const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], {
    type
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
const copyToClipboard = async (content: string): Promise<void> => {
  await navigator.clipboard.writeText(content);
};
export { exportAsJson, exportAsText, exportAsPdf, downloadFile, copyToClipboard };