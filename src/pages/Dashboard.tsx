import React, { useCallback, useMemo, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { useSquad } from '../contexts/SquadContext';
import { PlusIcon, UsersIcon, MapIcon, AlertTriangleIcon, DownloadIcon } from 'lucide-react';
import Tooltip from '../components/layout/Tooltip';
import { gameTips } from '../data/tips';
import ExportDialog from '../components/export/ExportDialog';
const Dashboard: React.FC = () => {
  const {
    squads,
    classData
  } = useSquad();
  const [isExportOpen, setIsExportOpen] = useState(false);
  // Get 3 random tips - memoized to prevent recalculation on re-renders
  const randomTips = useMemo(() => {
    const shuffled = [...gameTips].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);
  // Check for duplicate names - memoized for performance
  const duplicateSquadNames = useMemo(() => {
    const names = squads.map(s => s.name.toLowerCase());
    return names.filter((name, index) => names.indexOf(name) !== index);
  }, [squads]);
  const duplicateSoldierNames = useMemo(() => {
    const names = squads.flatMap(s => s.soldiers.map(sol => sol.name.toLowerCase()));
    return names.filter((name, index) => names.indexOf(name) !== index);
  }, [squads]);
  // Sort squads by last edited date - memoized for performance
  const sortedSquads = useMemo(() => [...squads].sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()), [squads]);
  const handleOpenExport = useCallback(() => {
    setIsExportOpen(true);
  }, []);
  const handleCloseExport = useCallback(() => {
    setIsExportOpen(false);
  }, []);
  return <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">
          Long War 2 Squad Planner
        </h1>
        <div className="flex space-x-2">
          <button onClick={handleOpenExport} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors flex items-center" title="Export Squads">
            <DownloadIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* Warnings */}
      {(duplicateSquadNames.length > 0 || duplicateSoldierNames.length > 0) && <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangleIcon className="h-5 w-5 text-red-400 mt-0.5 mr-2" />
            <div>
              {duplicateSquadNames.length > 0 && <p className="text-red-200">
                  Warning: You have squads with duplicate names.
                </p>}
              {duplicateSoldierNames.length > 0 && <p className="text-red-200">
                  Warning: You have soldiers with duplicate names.
                </p>}
            </div>
          </div>
        </div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-blue-300">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link to="/squad-builder" className="flex items-center p-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors">
              <PlusIcon className="mr-2 h-5 w-5" />
              <span>Create New Squad</span>
            </Link>
            <Link to="/mission-planner" className="flex items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors">
              <MapIcon className="mr-2 h-5 w-5" />
              <span>Plan Mission</span>
            </Link>
          </div>
        </div>
        {/* Recent squads */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg md:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-blue-300">
            Recent Squads
          </h2>
          {sortedSquads.length > 0 ? <div className="space-y-3">
              {sortedSquads.slice(0, 5).map(squad => <Link key={squad.id} to={`/squad-overview/${squad.id}`} className="block p-4 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">{squad.name}</h3>
                      <div className="text-sm text-gray-300">
                        {squad.soldiers.length} soldiers •
                        {squad.missionType ? ` ${squad.missionType}` : ' No mission assigned'}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {squad.missionType && <span className="px-2 py-1 bg-blue-800 text-blue-100 text-xs rounded-full">
                          Mission Ready
                        </span>}
                    </div>
                  </div>
                </Link>)}
            </div> : <div className="text-center py-8 text-gray-400">
              <UsersIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>
                No squads created yet. Create your first squad to get started!
              </p>
            </div>}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class overview */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-blue-300">
            Available Classes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.entries(classData).map(([key, classInfo]: [string, any]) => {
            const ClassIcon = classInfo.icon;
            return <Tooltip key={key} content={classInfo.description}>
                    <div className="flex flex-col items-center p-3 bg-gray-700 rounded-md">
                      <ClassIcon className="w-12 h-12 text-blue-400 mb-2" />
                      <span className="text-sm font-medium text-center">
                        {classInfo.name}
                      </span>
                    </div>
                  </Tooltip>;
          })}
          </div>
        </div>
        {/* Game tips */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            Long War 2 Tips
          </h2>
          <div className="space-y-4">
            {randomTips.map((tip, index) => <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <h3 className="font-bold text-yellow-600 dark:text-yellow-400">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tip.content}
                </p>
              </div>)}
          </div>
        </div>
      </div>
      <ExportDialog isOpen={isExportOpen} onClose={handleCloseExport} squads={squads} />
    </div>;
};
export default Dashboard;