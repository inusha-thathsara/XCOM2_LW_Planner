import React, { useEffect, useState, createContext, useContext } from 'react';
import { classData } from '../data/classData';
import { equipmentData } from '../data/equipmentData';
import { missionTypes } from '../data/missionData';
export type SoldierClass = 'assault' | 'shinobi' | 'grenadier' | 'gunner' | 'ranger' | 'sharpshooter' | 'specialist' | 'technical' | 'rocketeer' | 'infantry' | 'spark';
export interface Soldier {
  id: string;
  name: string;
  class: SoldierClass;
  rank: number;
  health: number;
  aim: number;
  mobility: number;
  will: number;
  hack: number;
  primaryWeapon: string;
  secondaryWeapon: string;
  utilities: string[];
  armor: string;
}
export interface Squad {
  id: string;
  name: string;
  soldiers: Soldier[];
  missionType?: string;
  infiltration?: number;
  threatLevel?: string;
  notes?: string;
  lastEdited: Date;
}
interface SquadContextType {
  squads: Squad[];
  currentSquad: Squad | null;
  addSquad: (squad: Omit<Squad, 'id' | 'lastEdited'>) => void;
  updateSquad: (squad: Squad) => void;
  deleteSquad: (id: string) => void;
  setCurrentSquad: (squad: Squad | null) => void;
  addSoldierToSquad: (squadId: string, soldier: Omit<Soldier, 'id'>) => void;
  updateSoldier: (squadId: string, soldier: Soldier) => void;
  removeSoldier: (squadId: string, soldierId: string) => void;
  classData: any;
  equipmentData: any;
  missionTypes: any;
}
const SquadContext = createContext<SquadContextType | undefined>(undefined);
export const SquadProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [squads, setSquads] = useState<Squad[]>(() => {
    const savedSquads = localStorage.getItem('lw2-squads');
    return savedSquads ? JSON.parse(savedSquads) : [];
  });
  const [currentSquad, setCurrentSquad] = useState<Squad | null>(null);
  useEffect(() => {
    localStorage.setItem('lw2-squads', JSON.stringify(squads));
  }, [squads]);
  const addSquad = (squad: Omit<Squad, 'id' | 'lastEdited'>) => {
    const newSquad: Squad = {
      ...squad,
      id: Date.now().toString(),
      lastEdited: new Date()
    };
    setSquads([...squads, newSquad]);
    return newSquad;
  };
  const updateSquad = (updatedSquad: Squad) => {
    setSquads(squads.map(squad => squad.id === updatedSquad.id ? {
      ...updatedSquad,
      lastEdited: new Date()
    } : squad));
  };
  const deleteSquad = (id: string) => {
    setSquads(squads.filter(squad => squad.id !== id));
    if (currentSquad?.id === id) {
      setCurrentSquad(null);
    }
  };
  const addSoldierToSquad = (squadId: string, soldier: Omit<Soldier, 'id'>) => {
    setSquads(squads.map(squad => {
      if (squad.id === squadId) {
        return {
          ...squad,
          soldiers: [...squad.soldiers, {
            ...soldier,
            id: Date.now().toString()
          }],
          lastEdited: new Date()
        };
      }
      return squad;
    }));
  };
  const updateSoldier = (squadId: string, updatedSoldier: Soldier) => {
    setSquads(squads.map(squad => {
      if (squad.id === squadId) {
        return {
          ...squad,
          soldiers: squad.soldiers.map(soldier => soldier.id === updatedSoldier.id ? updatedSoldier : soldier),
          lastEdited: new Date()
        };
      }
      return squad;
    }));
  };
  const removeSoldier = (squadId: string, soldierId: string) => {
    setSquads(squads.map(squad => {
      if (squad.id === squadId) {
        return {
          ...squad,
          soldiers: squad.soldiers.filter(soldier => soldier.id !== soldierId),
          lastEdited: new Date()
        };
      }
      return squad;
    }));
  };
  return <SquadContext.Provider value={{
    squads,
    currentSquad,
    addSquad,
    updateSquad,
    deleteSquad,
    setCurrentSquad,
    addSoldierToSquad,
    updateSoldier,
    removeSoldier,
    classData,
    equipmentData,
    missionTypes
  }}>
      {children}
    </SquadContext.Provider>;
};
export const useSquad = () => {
  const context = useContext(SquadContext);
  if (context === undefined) {
    throw new Error('useSquad must be used within a SquadProvider');
  }
  return context;
};