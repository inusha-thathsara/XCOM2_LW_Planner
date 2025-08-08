import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSquad, Soldier } from '../contexts/SquadContext';
import { PlusIcon, TrashIcon, CheckIcon, XIcon } from 'lucide-react';
import SoldierCard from '../components/soldiers/SoldierCard';
import SoldierCreator from '../components/soldiers/SoldierCreator';
const SquadBuilder: React.FC = () => {
  const navigate = useNavigate();
  const {
    addSquad
  } = useSquad();
  const [squadName, setSquadName] = useState('');
  const [soldiers, setSoldiers] = useState<Soldier[]>([]);
  const [isAddingSoldier, setIsAddingSoldier] = useState(false);
  const [error, setError] = useState('');
  const handleAddSoldier = (soldier: Soldier) => {
    setSoldiers([...soldiers, soldier]);
    setIsAddingSoldier(false);
  };
  const handleRemoveSoldier = (soldierId: string) => {
    setSoldiers(soldiers.filter(s => s.id !== soldierId));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!squadName.trim()) {
      setError('Squad name is required');
      return;
    }
    if (soldiers.length === 0) {
      setError('Add at least one soldier to your squad');
      return;
    }
    const newSquad = addSquad({
      name: squadName,
      soldiers: soldiers
    });
    navigate(`/squad-overview/${newSquad.id}`);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">Create New Squad</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Squad name */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-blue-300">
            Squad Details
          </h2>
          <div>
            <label htmlFor="squadName" className="block text-sm font-medium text-gray-300 mb-1">
              Squad Name
            </label>
            <input type="text" id="squadName" value={squadName} onChange={e => setSquadName(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter squad name..." />
          </div>
        </div>
        {/* Soldiers */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-300">Squad Roster</h2>
            <span className="text-sm text-gray-400">
              {soldiers.length} {soldiers.length === 1 ? 'soldier' : 'soldiers'}
            </span>
          </div>
          {error && <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">
              {error}
            </div>}
          <div className="space-y-4">
            {soldiers.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {soldiers.map(soldier => <div key={soldier.id} className="relative">
                    <SoldierCard soldier={soldier} />
                    <button type="button" onClick={() => handleRemoveSoldier(soldier.id)} className="absolute top-2 right-2 p-1 bg-red-800 hover:bg-red-700 rounded-full text-white" aria-label="Remove soldier">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>)}
              </div> : <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-700 rounded-md">
                No soldiers added yet. Add soldiers to your squad.
              </div>}
            {isAddingSoldier ? <SoldierCreator onSave={handleAddSoldier} onCancel={() => setIsAddingSoldier(false)} /> : <button type="button" onClick={() => setIsAddingSoldier(true)} className="w-full p-3 flex justify-center items-center bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors">
                <PlusIcon className="mr-2 h-5 w-5" />
                Add Soldier
              </button>}
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => navigate('/')} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors">
            Create Squad
          </button>
        </div>
      </form>
    </div>;
};
export default SquadBuilder;