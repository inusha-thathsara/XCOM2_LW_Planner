import React from 'react';
export const equipmentData = {
  primaryWeapons: {
    rifle: {
      name: 'Assault Rifle',
      damage: '3-5',
      accuracy: 0,
      critChance: 0,
      clipSize: 4
    },
    shotgun: {
      name: 'Shotgun',
      damage: '5-7',
      accuracy: -10,
      critChance: 10,
      clipSize: 4
    },
    cannon: {
      name: 'Cannon',
      damage: '4-6',
      accuracy: -5,
      critChance: 0,
      clipSize: 3
    },
    sniper_rifle: {
      name: 'Sniper Rifle',
      damage: '4-6',
      accuracy: 5,
      critChance: 10,
      clipSize: 4
    }
  },
  secondaryWeapons: {
    pistol: {
      name: 'Pistol',
      damage: '2-3',
      accuracy: 0,
      critChance: 5,
      clipSize: 1
    },
    sword: {
      name: 'Sword',
      damage: '4-6',
      accuracy: 20,
      critChance: 25
    },
    grenade_launcher: {
      name: 'Grenade Launcher',
      damage: '3-4',
      radius: 2,
      uses: 2
    },
    gremlin: {
      name: 'Gremlin',
      hackBonus: 20,
      healAmount: 4,
      combatDamage: 2,
      uses: 2
    },
    flamethrower: {
      name: 'Flamethrower',
      damage: '2-3',
      radius: 3,
      uses: 2
    },
    rocket_launcher: {
      name: 'Rocket Launcher',
      damage: '4-6',
      radius: 3,
      uses: 1
    },
    brawler: {
      name: 'BIT',
      damage: '3-5',
      accuracy: 10,
      uses: 1
    }
  },
  armor: {
    kevlar: {
      name: 'Kevlar Armor',
      armorPoints: 0,
      mobilityMod: 0,
      healthBonus: 0
    },
    plated: {
      name: 'Plated Armor',
      armorPoints: 1,
      mobilityMod: -1,
      healthBonus: 1
    },
    powered: {
      name: 'Powered Armor',
      armorPoints: 2,
      mobilityMod: 0,
      healthBonus: 2
    }
  },
  utilities: {
    frag_grenade: {
      name: 'Frag Grenade',
      damage: '3-4',
      radius: 2
    },
    flashbang: {
      name: 'Flashbang',
      radius: 3,
      effect: 'Disorient'
    },
    smoke_grenade: {
      name: 'Smoke Grenade',
      radius: 2,
      effect: '+20 Defense'
    },
    medkit: {
      name: 'Medkit',
      healAmount: 4,
      uses: 2
    },
    battle_scanner: {
      name: 'Battle Scanner',
      radius: 4,
      duration: 2,
      uses: 2
    },
    ap_rounds: {
      name: 'AP Rounds',
      armorPiercing: 1,
      damageBonus: 1
    },
    emp_grenade: {
      name: 'EMP Grenade',
      damage: '4-6',
      radius: 2,
      effect: 'Bonus damage to robotic units'
    },
    gas_grenade: {
      name: 'Gas Grenade',
      damage: '1-2',
      radius: 3,
      effect: 'Poison',
      duration: 2
    },
    incendiary_grenade: {
      name: 'Incendiary Grenade',
      damage: '2-3',
      radius: 2,
      effect: 'Fire',
      duration: 2
    },
    acid_grenade: {
      name: 'Acid Grenade',
      damage: '2-3',
      radius: 2,
      effect: 'Acid',
      duration: 2
    },
    proximity_mine: {
      name: 'Proximity Mine',
      damage: '4-6',
      radius: 2,
      effect: 'Triggers on enemy movement'
    },
    spider_suit_grapple: {
      name: 'Grapple',
      uses: 2,
      effect: 'Movement to high ground'
    },
    stasis_vest: {
      name: 'Stasis Vest',
      effect: 'Emergency heal when damaged',
      healthRestore: 4
    },
    hazmat_vest: {
      name: 'Hazmat Vest',
      effect: 'Immunity to poison and acid'
    },
    nano_medikit: {
      name: 'Nano-Medikit',
      healAmount: 6,
      uses: 3,
      effect: 'Removes negative status effects'
    },
    mimic_beacon: {
      name: 'Mimic Beacon',
      uses: 1,
      effect: 'Creates a high-priority target for enemies'
    }
  }
};