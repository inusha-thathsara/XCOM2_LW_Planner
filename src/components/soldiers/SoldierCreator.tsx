import React, { useState } from 'react';
import { useSquad, Soldier, SoldierClass } from '../../contexts/SquadContext';
import { CheckIcon, XIcon } from 'lucide-react';
import Tooltip from '../layout/Tooltip';
interface SoldierCreatorProps {
  onSave: (soldier: Soldier) => void;
  onCancel: () => void;
  initialData?: Partial<Soldier>;
}
const SoldierCreator: React.FC<SoldierCreatorProps> = ({
  onSave,
  onCancel,
  initialData
}) => {
  const {
    classData,
    equipmentData
  } = useSquad();
  const [name, setName] = useState(initialData?.name || '');
  const [soldierClass, setSoldierClass] = useState<SoldierClass>(initialData?.class || 'assault');
  const [rank, setRank] = useState(initialData?.rank || 1);
  const [primaryWeapon, setPrimaryWeapon] = useState(initialData?.primaryWeapon || '');
  const [secondaryWeapon, setSecondaryWeapon] = useState(initialData?.secondaryWeapon || '');
  const [utilities, setUtilities] = useState<string[]>(initialData?.utilities || []);
  const [armor, setArmor] = useState(initialData?.armor || 'kevlar');
  const selectedClassData = classData[soldierClass];
  if (!selectedClassData) return null;
  const defaultStats = {
    health: selectedClassData.stats?.health || 5,
    aim: selectedClassData.stats?.aim || 65,
    mobility: selectedClassData.stats?.mobility || 13,
    will: selectedClassData.stats?.will || 35,
    hack: selectedClassData.stats?.hack || 0
  };
  const handleSave = () => {
    if (!name.trim()) {
      alert('Soldier name is required');
      return;
    }
    if (!primaryWeapon) {
      alert('Primary weapon is required');
      return;
    }
    if (!secondaryWeapon) {
      alert('Secondary weapon is required');
      return;
    }
    const newSoldier: Soldier = {
      id: Date.now().toString(),
      name,
      class: soldierClass,
      rank,
      primaryWeapon,
      secondaryWeapon,
      utilities,
      armor,
      ...defaultStats
    };
    onSave(newSoldier);
  };
  const handleUtilityToggle = (utility: string) => {
    if (utilities.includes(utility)) {
      setUtilities(utilities.filter(u => u !== utility));
    } else {
      if (utilities.length < 2) {
        setUtilities([...utilities, utility]);
      } else {
        alert('Maximum 2 utility items allowed');
      }
    }
  };
  return <div className="bg-gray-700 rounded-lg border border-gray-600 p-4 shadow-lg">
      <h3 className="text-lg font-bold mb-4 text-blue-300">Create Soldier</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Soldier name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Rank
            </label>
            <select value={rank} onChange={e => setRank(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(r => <option key={r} value={r}>
                  {r}
                </option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Class
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {Object.entries(classData).map(([key, data]: [string, any]) => {
            if (!data || !data.name || !data.icon) return null;
            const ClassIcon = data.icon;
            return <Tooltip key={key} content={data.description}>
                  <button type="button" onClick={() => setSoldierClass(key as SoldierClass)} className={`flex flex-col items-center p-2 rounded-md border ${soldierClass === key ? 'bg-blue-900/50 border-blue-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-750'}`}>
                    <ClassIcon className="w-8 h-8 text-blue-400 mb-1" />
                    <span className="text-xs font-medium">{data.name}</span>
                  </button>
                </Tooltip>;
          })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Primary Weapon
            </label>
            <select value={primaryWeapon} onChange={e => setPrimaryWeapon(e.target.value)} className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select weapon</option>
              {selectedClassData.primaryWeapons.map((weapon: string) => {
              const weaponData = equipmentData.primaryWeapons[weapon];
              if (!weaponData) return null;
              return <option key={weapon} value={weapon}>
                    {weaponData.name}
                  </option>;
            })}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Secondary Weapon
            </label>
            <select value={secondaryWeapon} onChange={e => setSecondaryWeapon(e.target.value)} className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select weapon</option>
              {selectedClassData.secondaryWeapons.map((weapon: string) => {
              const weaponData = equipmentData.secondaryWeapons[weapon];
              if (!weaponData) return null;
              return <option key={weapon} value={weapon}>
                    {weaponData.name}
                  </option>;
            })}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Armor
          </label>
          <select value={armor} onChange={e => setArmor(e.target.value)} className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            {Object.entries(equipmentData.armor).map(([key, data]: [string, any]) => <option key={key} value={key}>
                  {data.name}
                </option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Utilities (max 2)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(equipmentData.utilities).map(([key, data]: [string, any]) => <button key={key} type="button" onClick={() => handleUtilityToggle(key)} className={`p-2 rounded-md border text-sm ${utilities.includes(key) ? 'bg-blue-900/50 border-blue-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-750'}`}>
                  {data.name}
                </button>)}
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-white transition-colors flex items-center">
          <XIcon className="h-4 w-4 mr-1" />
          Cancel
        </button>
        <button type="button" onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors flex items-center">
          <CheckIcon className="h-4 w-4 mr-1" />
          Save Soldier
        </button>
      </div>
    </div>;
};
export default SoldierCreator;