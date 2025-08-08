import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSquad } from '../contexts/SquadContext';
import { MapIcon, ClockIcon, AlertTriangleIcon, FileTextIcon } from 'lucide-react';
import SoldierCard from '../components/soldiers/SoldierCard';
import { getMissionRecommendations } from '../data/missionRecommendations';
import { getInfiltrationColor, getThreatColor } from '../utils/squadUtils';
const MissionPlanner: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    squads,
    updateSquad,
    missionTypes
  } = useSquad();
  // Parse squad ID from URL query parameters if available
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const preselectedSquadId = queryParams.get('squad');
  const [selectedSquadId, setSelectedSquadId] = useState<string>(preselectedSquadId || '');
  const [selectedMissionType, setSelectedMissionType] = useState<string>('');
  const [infiltration, setInfiltration] = useState<number>(100);
  const [threatLevel, setThreatLevel] = useState<string>('moderate');
  const [notes, setNotes] = useState<string>('');
  const selectedSquad = useMemo(() => squads.find(squad => squad.id === selectedSquadId), [squads, selectedSquadId]);
  const selectedMission = useMemo(() => selectedMissionType ? missionTypes[selectedMissionType] : null, [selectedMissionType, missionTypes]);
  const recommendations = useMemo(() => selectedSquad && selectedMission ? getMissionRecommendations(selectedSquad, selectedMission, infiltration) : [], [selectedSquad, selectedMission, infiltration]);
  // Reset mission fields when squad changes
  useEffect(() => {
    if (selectedSquad) {
      setSelectedMissionType(selectedSquad.missionType || '');
      setInfiltration(selectedSquad.infiltration || 100);
      setThreatLevel(selectedSquad.threatLevel || 'moderate');
      setNotes(selectedSquad.notes || '');
    }
  }, [selectedSquadId, selectedSquad]);
  const handleSaveMission = () => {
    if (!selectedSquad || !selectedMissionType) return;
    updateSquad({
      ...selectedSquad,
      missionType: selectedMissionType,
      infiltration,
      threatLevel,
      notes
    });
    navigate(`/squad-overview/${selectedSquadId}`);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">Mission Planner</h1>
      </div>
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-300">Select Squad</h2>
        {squads.length > 0 ? <div className="space-y-4">
            <select value={selectedSquadId} onChange={e => setSelectedSquadId(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select a squad</option>
              {squads.map(squad => <option key={squad.id} value={squad.id}>
                  {squad.name} ({squad.soldiers.length} soldiers)
                </option>)}
            </select>
            {selectedSquad && <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Squad Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedSquad.soldiers.map(soldier => <SoldierCard key={soldier.id} soldier={soldier} />)}
                </div>
              </div>}
          </div> : <div className="text-center py-8 text-gray-400">
            <p>No squads available. Create a squad first.</p>
            <button onClick={() => navigate('/squad-builder')} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors">
              Create Squad
            </button>
          </div>}
      </div>
      {selectedSquad && <>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-300">
              Mission Details
            </h2>
            <div className="space-y-4">
              {/* Mission Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mission Type
                </label>
                <select value={selectedMissionType} onChange={e => setSelectedMissionType(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select mission type</option>
                  {Object.entries(missionTypes).map(([key, mission]: [string, any]) => <option key={key} value={key}>
                        {mission.name}
                      </option>)}
                </select>
              </div>
              {selectedMission && <div className="p-4 bg-gray-700 rounded-md">
                  <p className="text-sm mb-2">{selectedMission.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2 text-blue-400" />
                      <span>
                        Infiltration Time: {selectedMission.infiltrationTime}h
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapIcon className="h-4 w-4 mr-2 text-green-400" />
                      <span>
                        Recommended Size: {selectedMission.recommendedSquadSize}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangleIcon className="h-4 w-4 mr-2 text-yellow-400" />
                      <span>Rewards: {selectedMission.rewards}</span>
                    </div>
                  </div>
                </div>}
              {/* Infiltration */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Infiltration %
                </label>
                <div className="flex items-center">
                  <input type="range" min="25" max="200" step="5" value={infiltration} onChange={e => setInfiltration(Number(e.target.value))} className="flex-grow mr-4" />
                  <span className={`text-lg font-bold ${getInfiltrationColor(infiltration)}`}>
                    {infiltration}%
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {infiltration < 50 && 'Extremely dangerous! Expect heavy resistance.'}
                  {infiltration >= 50 && infiltration < 75 && 'Very risky. High enemy presence.'}
                  {infiltration >= 75 && infiltration < 100 && 'Risky. Significant enemy presence.'}
                  {infiltration >= 100 && infiltration < 125 && 'Standard infiltration. Normal enemy presence.'}
                  {infiltration >= 125 && infiltration < 150 && 'Good infiltration. Reduced enemy presence.'}
                  {infiltration >= 150 && 'Excellent infiltration. Minimal enemy presence.'}
                </div>
              </div>
              {/* Threat Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Threat Level
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['light', 'moderate', 'heavy', 'very heavy', 'extreme'].map(threat => <button key={threat} type="button" onClick={() => setThreatLevel(threat)} className={`py-2 px-3 rounded-md border text-center text-sm ${threatLevel === threat ? getThreatColor(threat) + ' border-current' : 'bg-gray-700 border-gray-600 hover:bg-gray-650'}`}>
                        {threat.charAt(0).toUpperCase() + threat.slice(1)}
                      </button>)}
                </div>
              </div>
              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mission Notes
                </label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Add notes about mission strategy, objectives, etc."></textarea>
              </div>
            </div>
            {/* Add Recommendations Section */}
            {selectedMission && recommendations.length > 0 && <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-md">
                <h3 className="flex items-center text-lg font-semibold text-blue-300 mb-3">
                  <AlertTriangleIcon className="h-5 w-5 mr-2" />
                  Mission Recommendations
                </h3>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => <li key={index} className="flex items-start text-sm text-gray-300">
                      <span className="text-blue-400 mr-2">•</span>
                      {rec}
                    </li>)}
                </ul>
              </div>}
          </div>
          {/* Action buttons */}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/')} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors">
              Cancel
            </button>
            <button type="button" onClick={handleSaveMission} disabled={!selectedMissionType} className={`px-6 py-2 rounded-md text-white transition-colors ${selectedMissionType ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'}`}>
              Save Mission
            </button>
          </div>
        </>}
    </div>;
};
export default MissionPlanner;