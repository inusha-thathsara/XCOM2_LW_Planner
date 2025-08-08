import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSquad } from '../contexts/SquadContext';
import { EditIcon, TrashIcon, MapIcon, ClockIcon, AlertTriangleIcon, ShieldIcon, CrosshairIcon, ZapIcon, BrainIcon, UsersIcon } from 'lucide-react';
import SoldierCard from '../components/soldiers/SoldierCard';
import SoldierCreator from '../components/soldiers/SoldierCreator';
import Tooltip from '../components/layout/Tooltip';
import { useSquadStats } from '../hooks/useSquadStats';
const SquadOverview: React.FC = () => {
  const {
    squadId
  } = useParams<{
    squadId: string;
  }>();
  const navigate = useNavigate();
  const {
    squads,
    updateSquad,
    deleteSquad,
    addSoldierToSquad,
    updateSoldier,
    removeSoldier,
    missionTypes,
    classData
  } = useSquad();
  const [isAddingSoldier, setIsAddingSoldier] = useState(false);
  const [editingSoldierId, setEditingSoldierId] = useState<string | null>(null);
  const squad = useMemo(() => squads.find(s => s.id === squadId), [squads, squadId]);
  const missionType = useMemo(() => squad?.missionType ? missionTypes[squad.missionType] : null, [squad?.missionType, missionTypes]);
  const {
    squadStats,
    classDistribution
  } = useSquadStats(squad?.soldiers || []);
  useEffect(() => {
    if (!squad) {
      navigate('/');
    }
  }, [squad, navigate]);
  if (!squad) return null;
  const handleDeleteSquad = () => {
    if (window.confirm(`Are you sure you want to delete the squad "${squad.name}"?`)) {
      deleteSquad(squad.id);
      navigate('/');
    }
  };
  const handleAddSoldier = soldier => {
    addSoldierToSquad(squad.id, soldier);
    setIsAddingSoldier(false);
  };
  const handleUpdateSoldier = soldier => {
    updateSoldier(squad.id, soldier);
    setEditingSoldierId(null);
  };
  const handleRemoveSoldier = soldierId => {
    if (window.confirm('Are you sure you want to remove this soldier from the squad?')) {
      removeSoldier(squad.id, soldierId);
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">{squad.name}</h1>
        <div className="flex space-x-2">
          <Link to={`/mission-planner?squad=${squad.id}`} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors flex items-center">
            <MapIcon className="h-5 w-5" />
          </Link>
          <button onClick={handleDeleteSquad} className="p-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition-colors flex items-center">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {missionType && <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-blue-300">
                Mission: {missionType.name}
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                {missionType.description}
              </p>
            </div>
            <Link to="/mission-planner" className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors flex items-center">
              <EditIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Infiltration</p>
                <p className="font-bold">{squad.infiltration || 100}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <AlertTriangleIcon className="h-5 w-5 mr-2 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Threat Level</p>
                <p className="font-bold capitalize">
                  {squad.threatLevel || 'Moderate'}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <UsersIcon className="h-5 w-5 mr-2 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Squad Size</p>
                <p className="font-bold">
                  {squad.soldiers.length} / {missionType.recommendedSquadSize}{' '}
                  <span className="text-sm text-gray-400">recommended</span>
                </p>
              </div>
            </div>
          </div>
          {squad.notes && <div className="mt-4 p-3 bg-gray-700 rounded-md">
              <p className="text-sm font-medium text-gray-300">Notes:</p>
              <p className="text-sm text-gray-400">{squad.notes}</p>
            </div>}
        </div>}

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-300">
          Squad Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="flex items-center mb-1">
              <ShieldIcon className="h-4 w-4 mr-2 text-red-400" />
              <h3 className="font-medium text-gray-300">Total Health</h3>
            </div>
            <p className="text-2xl font-bold">{squadStats.totalHealth}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="flex items-center mb-1">
              <CrosshairIcon className="h-4 w-4 mr-2 text-yellow-400" />
              <h3 className="font-medium text-gray-300">Avg. Aim</h3>
            </div>
            <p className="text-2xl font-bold">{squadStats.avgAim}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="flex items-center mb-1">
              <ZapIcon className="h-4 w-4 mr-2 text-green-400" />
              <h3 className="font-medium text-gray-300">Avg. Mobility</h3>
            </div>
            <p className="text-2xl font-bold">{squadStats.avgMobility}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="flex items-center mb-1">
              <BrainIcon className="h-4 w-4 mr-2 text-purple-400" />
              <h3 className="font-medium text-gray-300">Avg. Will</h3>
            </div>
            <p className="text-2xl font-bold">{squadStats.avgWill}</p>
          </div>
        </div>
        {Object.keys(classDistribution).length > 0 && <div className="mt-6">
            <h3 className="font-medium text-gray-300 mb-2">
              Class Distribution
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Object.entries(classDistribution).map(([className, count]) => {
            const classInfo = classData[className];
            if (!classInfo) return null;
            const ClassIcon = classInfo.icon;
            return <Tooltip key={className} content={classInfo.description}>
                    <div className="flex items-center bg-gray-700 p-2 rounded-md">
                      <ClassIcon className="w-8 h-8 text-blue-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium">{classInfo.name}</p>
                        <p className="text-xs text-gray-400">
                          {count} {count === 1 ? 'soldier' : 'soldiers'}
                        </p>
                      </div>
                    </div>
                  </Tooltip>;
          })}
            </div>
          </div>}
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-300">Squad Members</h2>
          <button onClick={() => setIsAddingSoldier(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors text-sm" disabled={isAddingSoldier}>
            Add Soldier
          </button>
        </div>
        {isAddingSoldier && <div className="mb-6">
            <SoldierCreator onSave={handleAddSoldier} onCancel={() => setIsAddingSoldier(false)} />
          </div>}
        <div className="space-y-4">
          {squad.soldiers.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {squad.soldiers.map(soldier => <div key={soldier.id}>
                  {editingSoldierId === soldier.id ? <SoldierCreator initialData={soldier} onSave={handleUpdateSoldier} onCancel={() => setEditingSoldierId(null)} /> : <div className="relative">
                      <SoldierCard soldier={soldier} onClick={() => setEditingSoldierId(soldier.id)} />
                      <button onClick={() => handleRemoveSoldier(soldier.id)} className="absolute top-2 right-2 p-1 bg-red-800 hover:bg-red-700 rounded-full text-white" aria-label="Remove soldier">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>}
                </div>)}
            </div> : <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-700 rounded-md">
              No soldiers in this squad. Add soldiers to your squad.
            </div>}
        </div>
      </div>
    </div>;
};
export default SquadOverview;