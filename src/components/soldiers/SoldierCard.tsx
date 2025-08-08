import React, { memo } from 'react';
import { Soldier } from '../../contexts/SquadContext';
import { ShieldIcon, CrosshairIcon, ZapIcon, BrainIcon } from 'lucide-react';
import { useSquad } from '../../contexts/SquadContext';
interface SoldierCardProps {
  soldier: Soldier;
  onClick?: () => void;
}
const SoldierCard: React.FC<SoldierCardProps> = ({
  soldier,
  onClick
}) => {
  const {
    classData
  } = useSquad();
  const soldierClassData = classData[soldier.class];
  if (!soldierClassData) return null;
  const ClassIcon = soldierClassData.icon;
  return <div className={`bg-gray-700 rounded-lg border border-gray-600 overflow-hidden shadow-md ${onClick ? 'cursor-pointer hover:bg-gray-650' : ''}`} onClick={onClick}>
      <div className="flex">
        {/* Class icon */}
        <div className="w-16 bg-gray-800 flex items-center justify-center p-2">
          <ClassIcon className="w-12 h-12 text-blue-400" />
        </div>
        {/* Soldier details */}
        <div className="flex-1 p-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-white">{soldier.name}</h3>
              <p className="text-sm text-blue-300">{soldierClassData.name}</p>
            </div>
            <div className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300">
              Rank {soldier.rank}
            </div>
          </div>
          {/* Stats */}
          <div className="mt-2 grid grid-cols-4 gap-2">
            <div className="flex items-center text-xs text-gray-300">
              <ShieldIcon className="h-3 w-3 mr-1 text-red-400" />
              <span>{soldier.health}</span>
            </div>
            <div className="flex items-center text-xs text-gray-300">
              <CrosshairIcon className="h-3 w-3 mr-1 text-yellow-400" />
              <span>{soldier.aim}</span>
            </div>
            <div className="flex items-center text-xs text-gray-300">
              <ZapIcon className="h-3 w-3 mr-1 text-green-400" />
              <span>{soldier.mobility}</span>
            </div>
            <div className="flex items-center text-xs text-gray-300">
              <BrainIcon className="h-3 w-3 mr-1 text-purple-400" />
              <span>{soldier.will}</span>
            </div>
          </div>
          {/* Equipment */}
          <div className="mt-2 text-xs text-gray-400 truncate">
            {soldier.primaryWeapon}
            {soldier.utilities.length > 0 && `, ${soldier.utilities.join(', ')}`}
          </div>
        </div>
      </div>
    </div>;
};
export default memo(SoldierCard);