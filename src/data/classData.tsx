import React from 'react';
import { SwordIcon, ShieldIcon, BombIcon, CrosshairIcon, CameraIcon, WrenchIcon, FlameIcon, RocketIcon, ScanLineIcon, ZapIcon, BoxIcon } from 'lucide-react';
export const classData = {
  assault: {
    name: 'Assault',
    icon: BoxIcon,
    description: 'Close combat specialists with high mobility and close-range firepower.',
    primaryWeapons: ['shotgun', 'rifle'],
    secondaryWeapons: ['pistol'],
    abilities: ['Run & Gun', 'Close Combat Specialist', 'Close Encounters'],
    stats: {
      health: 5,
      aim: 65,
      mobility: 15,
      will: 35
    }
  },
  shinobi: {
    name: 'Shinobi',
    icon: SwordIcon,
    description: 'Stealth and melee specialists, excellent for scouting and assassinations.',
    primaryWeapons: ['sword', 'rifle'],
    secondaryWeapons: ['pistol'],
    abilities: ['Shadowstep', 'Phantom', 'Conceal'],
    stats: {
      health: 4,
      aim: 65,
      mobility: 16,
      will: 40
    }
  },
  grenadier: {
    name: 'Grenadier',
    icon: BombIcon,
    description: 'Explosive specialists that excel at destroying cover and hitting multiple targets.',
    primaryWeapons: ['cannon', 'rifle'],
    secondaryWeapons: ['grenade_launcher'],
    abilities: ['Fire in the Hole', 'Demolition', 'Suppression'],
    stats: {
      health: 6,
      aim: 65,
      mobility: 12,
      will: 35
    }
  },
  gunner: {
    name: 'Gunner',
    icon: BoxIcon,
    description: 'Heavy weapons experts that provide suppressive fire and sustained damage.',
    primaryWeapons: ['cannon'],
    secondaryWeapons: ['pistol'],
    abilities: ['Suppression', 'Holo Targeting', 'Traverse Fire'],
    stats: {
      health: 6,
      aim: 70,
      mobility: 11,
      will: 35
    }
  },
  ranger: {
    name: 'Ranger',
    icon: ShieldIcon,
    description: 'Versatile soldiers with a focus on rifles and overwatch abilities.',
    primaryWeapons: ['rifle', 'shotgun'],
    secondaryWeapons: ['pistol'],
    abilities: ['Phantom', 'Deep Cover', 'Executioner'],
    stats: {
      health: 5,
      aim: 70,
      mobility: 13,
      will: 35
    }
  },
  sharpshooter: {
    name: 'Sharpshooter',
    icon: CrosshairIcon,
    description: 'Long-range specialists with high accuracy and critical hit potential.',
    primaryWeapons: ['sniper_rifle'],
    secondaryWeapons: ['pistol'],
    abilities: ['Squadsight', 'Death From Above', 'Serial'],
    stats: {
      health: 4,
      aim: 75,
      mobility: 12,
      will: 35
    }
  },
  specialist: {
    name: 'Specialist',
    icon: WrenchIcon,
    description: 'Tech experts with a combat drone that can hack, heal, or attack.',
    primaryWeapons: ['rifle'],
    secondaryWeapons: ['gremlin'],
    abilities: ['Hack', 'Medical Protocol', 'Combat Protocol'],
    stats: {
      health: 5,
      aim: 65,
      mobility: 13,
      will: 40,
      hack: 25
    }
  },
  technical: {
    name: 'Technical',
    icon: FlameIcon,
    description: 'Fire and explosive specialists with area denial capabilities.',
    primaryWeapons: ['rifle', 'shotgun'],
    secondaryWeapons: ['flamethrower', 'rocket_launcher'],
    abilities: ['Fire in the Hole', 'Burnout', 'Incinerator'],
    stats: {
      health: 5,
      aim: 65,
      mobility: 13,
      will: 35
    }
  },
  rocketeer: {
    name: 'Rocketeer',
    icon: RocketIcon,
    description: 'Rocket specialists that excel at destroying cover and groups of enemies.',
    primaryWeapons: ['rifle'],
    secondaryWeapons: ['rocket_launcher'],
    abilities: ['Fire in the Hole', 'Javelin Rockets', 'Fire and Forget'],
    stats: {
      health: 5,
      aim: 70,
      mobility: 12,
      will: 35
    }
  },
  infantry: {
    name: 'Infantry',
    icon: BoxIcon,
    description: 'Rifle specialists with multiple shooting actions per turn.',
    primaryWeapons: ['rifle'],
    secondaryWeapons: ['pistol'],
    abilities: ["Light 'Em Up", 'Suppression', 'Cyclic Fire'],
    stats: {
      health: 5,
      aim: 70,
      mobility: 13,
      will: 35
    }
  },
  spark: {
    name: 'SPARK',
    icon: ZapIcon,
    description: 'Robotic units with high health, firepower, and immunity to mental attacks.',
    primaryWeapons: ['cannon', 'rifle'],
    secondaryWeapons: ['brawler'],
    abilities: ['Overdrive', 'Bombard', 'Strike'],
    stats: {
      health: 10,
      aim: 65,
      mobility: 12,
      will: 100
    }
  }
};