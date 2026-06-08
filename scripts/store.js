class Store {
	// Loads saved krystalls, prestige, and click power from local storage.
	constructor() {
		this.krystalls = Number(localStorage.getItem('krystalls')) || 0;
		this.prestige = Number(localStorage.getItem('prestige')) || 0;
		this.clickPower = Number(localStorage.getItem('clickPower')) || (1 + this.prestige);
		this.autoKrystallsPerSecond = Number(localStorage.getItem('autoKrystallsPerSecond')) || 0;
		this.upgradeCounts = JSON.parse(localStorage.getItem('upgradeCounts')) || {};
		this.startAutoIncome();
	}

	// Saves the current game state to local storage.
	save() {
		localStorage.setItem('krystalls', this.krystalls);
		localStorage.setItem('prestige', this.prestige);
		localStorage.setItem('clickPower', this.clickPower);
		localStorage.setItem('autoKrystallsPerSecond', this.autoKrystallsPerSecond);
		localStorage.setItem('upgradeCounts', JSON.stringify(this.upgradeCounts));
	}

	// Adds krystalls and persists the updated state.
	addKrystalls(amount) {
		this.krystalls += amount;
		this.save();
		window.dispatchEvent(new CustomEvent('krystalls-changed'));
	}


	// Checks whether an upgrade costs less than or equal to the current krystalls.
	canBuyUpgrade(upgrade) {
		const count = this.getUpgradeCount(upgrade.id);
		const cost = window.gameUpgrades.getCost(upgrade.id, count);
		return this.krystalls >= cost && count < (upgrade.maxQuantity || 100);
	}

	// Returns how often an upgrade was already bought.
	getUpgradeCount(upgradeId) {
		return this.upgradeCounts[upgradeId] || 0;
	}

	// Buys an upgrade if it is affordable and updates click power.
	buyUpgrade(upgrade) {
		const count = this.getUpgradeCount(upgrade.id);
		const cost = window.gameUpgrades.getCost(upgrade.id, count);
		if (this.krystalls < cost) return false;

		this.krystalls -= cost;
		this.clickPower += upgrade.power || 0;
		this.autoKrystallsPerSecond += upgrade.autoKrystallsPerSecond || 0;
		this.upgradeCounts[upgrade.id] = count + 1;
		this.save();
		return true;
	}

	// Starts the automatic krystall income tick.
	startAutoIncome() {
		if (this.autoIncomeInterval) {
			return;
		}

		this.autoIncomeInterval = setInterval(() => this.tickAutoIncome(), 1000);
	}

	// Adds automatic krystalls once per second when auto income is unlocked.
	tickAutoIncome() {
		if (this.autoKrystallsPerSecond <= 0) {
			return;
		}

		this.addKrystalls(this.autoKrystallsPerSecond);
	}

	// Checks whether the player has enough krystalls to prestige.
	canPrestige() {
		return this.krystalls >= Prestige.threshold;
	}

	// Resets krystalls and increases prestige if the threshold is reached.
	doPrestige() {
		if (!this.canPrestige()) {
			return false;
		}

		this.prestige += 1;
		this.krystalls = 0;
		this.clickPower = 1 + this.prestige;
		this.autoKrystallsPerSecond = 0;
		this.save();
		return true;
	}

	// Formats krystalls into a short readable number string.
	shortFormKrystalls() {
		switch (true) {
			case this.krystalls >= 1e6: {
				return (this.krystalls / 1e6).toFixed(1) + 'M';
			}
			case this.krystalls >= 1e3: {
				return (this.krystalls / 1e3).toFixed(1) + 'K';
			}
			default: {
				return this.krystalls;
			}
		}
	}
}

class Upgrades {
	// Creates the fixed list of available shop upgrades.
	constructor() {
		this.scale = 1.15; // cost multiplier per purchase
		this.items = [
			{ id: 'drill', name: 'Moon Drill', baseCost: 25, power: 1, maxQuantity: 100 },
			{ id: 'charger', name: 'Crystal Charger', baseCost: 120, power: 5, maxQuantity: 100 },
			{ id: 'autoMiner', name: 'Auto Miner', baseCost: 250, autoKrystallsPerSecond: 1, maxQuantity: 100 }
		];
	}

	// Returns every upgrade in the shop.
	getAll() {
		return this.items;
	}

	// Finds one upgrade by its id.
	getById(upgradeId) {
		return this.items.find((upgrade) => upgrade.id === upgradeId);
	}

	// Returns cost for given upgrade id at a specific purchase count
	getCost(upgradeId, count = 0) {
		const item = this.getById(upgradeId);
		if (!item) return Infinity;
		const base = item.baseCost || item.cost || 0;
		return Math.floor(base * Math.pow(this.scale, count));
	}

}

class Prestige {
	static threshold = 500;
}

window.gameStore = new Store();
window.gameUpgrades = new Upgrades();
window.gamePrestige = Prestige;