class Store {
	// Loads saved krystalls, prestige, and click power from local storage.
	constructor() {
		this.krystalls = Number(localStorage.getItem('krystalls')) || 0;
		this.prestige = Number(localStorage.getItem('prestige')) || 0;
		this.clickPower = Number(localStorage.getItem('clickPower')) || (1 + this.prestige);
		this.autoKrystallsPerSecond = Number(localStorage.getItem('autoKrystallsPerSecond')) || 0;
		this.startAutoIncome();
	}

	// Saves the current game state to local storage.
	save() {
		localStorage.setItem('krystalls', this.krystalls);
		localStorage.setItem('prestige', this.prestige);
		localStorage.setItem('clickPower', this.clickPower);
		localStorage.setItem('autoKrystallsPerSecond', this.autoKrystallsPerSecond);
	}

	// Adds krystalls and persists the updated state.
	addKrystalls(amount) {
		this.krystalls += amount;
		this.save();
	}

	// Checks whether an upgrade costs less than or equal to the current krystalls.
	canBuyUpgrade(upgrade) {
		return this.krystalls >= upgrade.cost;
	}

	// Buys an upgrade if it is affordable and updates click power.
	buyUpgrade(upgrade) {
		if (!this.canBuyUpgrade(upgrade)) {
			return false;
		}

		this.krystalls -= upgrade.cost;
		this.clickPower += upgrade.power || 0;
		this.autoKrystallsPerSecond += upgrade.autoKrystallsPerSecond || 0;
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
		window.dispatchEvent(new CustomEvent('krystalls-changed'));
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
		this.items = [
			{ id: 'drill', name: 'Moon Drill', cost: 25, power: 1 },
			{ id: 'charger', name: 'Crystal Charger', cost: 120, power: 5 },
			{ id: 'autoMiner', name: 'Auto Miner', cost: 250, autoKrystallsPerSecond: 1 }
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

}

class Prestige {
	static threshold = 500;
}

window.gameStore = new Store();
window.gameUpgrades = new Upgrades();
window.gamePrestige = Prestige;