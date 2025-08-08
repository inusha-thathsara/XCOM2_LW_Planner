import React from 'react';
export const missionTypes = {
  supply_raid: {
    name: 'Supply Raid',
    description: 'Intercept ADVENT supply operations to gather resources.',
    infiltrationTime: 5,
    recommendedSquadSize: 6,
    rewards: 'Supplies, Materials',
    enemyTypes: ['ADVENT Trooper', 'ADVENT Officer', 'ADVENT Turret']
  },
  guerrilla_op: {
    name: 'Guerrilla Operation',
    description: 'Disrupt ADVENT operations to counter Dark Events.',
    infiltrationTime: 4,
    recommendedSquadSize: 4,
    rewards: 'Intel, Scientist/Engineer',
    enemyTypes: ['ADVENT Trooper', 'ADVENT Officer', 'Sectoid']
  },
  council_mission: {
    name: 'Council Mission',
    description: 'Special missions from the Council providing high rewards.',
    infiltrationTime: 6,
    recommendedSquadSize: 5,
    rewards: 'High Intel, Scientist/Engineer, Soldier',
    enemyTypes: ['ADVENT Trooper', 'ADVENT Officer', 'Sectoid', 'Viper']
  },
  liberation: {
    name: 'Liberation Mission',
    description: 'Series of missions to liberate a region from ADVENT control.',
    infiltrationTime: 8,
    recommendedSquadSize: 6,
    rewards: 'Region Liberation, Resistance Contact',
    enemyTypes: ['ADVENT Trooper', 'ADVENT Officer', 'ADVENT MEC', 'Sectoid', 'Viper']
  },
  retaliation: {
    name: 'Retaliation Strike',
    description: 'Defend a resistance settlement from ADVENT attack.',
    infiltrationTime: 0,
    recommendedSquadSize: 8,
    rewards: 'Maintain Haven, Recruits',
    enemyTypes: ['ADVENT Trooper', 'ADVENT Officer', 'Faceless', 'Chryssalid']
  },
  facility: {
    name: 'Facility Raid',
    description: 'Attack and destroy an alien facility to reduce the Avatar Project progress.',
    infiltrationTime: 7,
    recommendedSquadSize: 6,
    rewards: 'Reduce Avatar Project, Alien Materials',
    enemyTypes: ['ADVENT Trooper', 'ADVENT Officer', 'ADVENT MEC', 'Sectoid', 'Archon']
  },
  network_tower: {
    name: 'Network Tower Assault',
    description: 'Hack into the ADVENT network to gather crucial information.',
    infiltrationTime: 6,
    recommendedSquadSize: 6,
    rewards: 'Intel, Data',
    enemyTypes: ['ADVENT Trooper', 'ADVENT Officer', 'Codex', 'ADVENT MEC']
  },
  landed_ufo: {
    name: 'Landed UFO',
    description: 'Raid a landed alien UFO for valuable technology.',
    infiltrationTime: 9,
    recommendedSquadSize: 8,
    rewards: 'Alien Materials, Elerium, Alloys',
    enemyTypes: ['Sectoid', 'Viper', 'Muton', 'Archon', 'Sectopod']
  },
  hq_assault: {
    name: 'ADVENT HQ Assault',
    description: 'Direct assault on an ADVENT headquarters.',
    infiltrationTime: 10,
    recommendedSquadSize: 8,
    rewards: 'Intel, High-tier Equipment',
    enemyTypes: ['ADVENT Trooper', 'ADVENT Officer', 'ADVENT MEC', 'Sectoid', 'Muton', 'Archon']
  }
};