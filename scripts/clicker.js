class ClickCounter {


    constructor() {

        this.store = window.gameStore;
        this.upgrades = window.gameUpgrades;


        this.asteroid = document.getElementById('asteroid');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.openShopBtn = document.getElementById('openShopBtn');
        this.openPrestigeBtn = document.getElementById('openPrestigeBtn');
        this.shopModal = document.getElementById('shopModal');
        this.prestigeModal = document.getElementById('prestigeModal');
        this.shopList = document.getElementById('shopList');
        this.prestigeText = document.getElementById('prestigeText');
        this.prestigeActionBtn = document.getElementById('prestigeActionBtn');
        this.resetBtn = document.getElementById('resetBtn');

        this.asteroid.addEventListener('click', () => this.incrementScore());

        if (this.resetBtn) this.resetBtn.addEventListener('click', () => this.resetGame());

        this.openShopBtn.addEventListener('click', () => this.openModal(this.shopModal));
        this.openPrestigeBtn.addEventListener('click', () => this.openModal(this.prestigeModal));

        this.prestigeActionBtn.addEventListener('click', () => this.doPrestige());

        window.addEventListener('krystalls-changed', () => this.renderGameState());

        document.querySelectorAll('[data-close-modal]').forEach((element) => {
            element.addEventListener('click', () => this.closeModal(this.getModalById(element.dataset.closeModal)));
        });

        
        this.renderShop();
        this.renderPrestige();
        this.renderScore();
    }


    resetGame() {
        const keys = ['krystalls','prestige','clickPower','autoKrystallsPerSecond','upgradeCounts','totalEarnedSinceReset'];
        keys.forEach(k => localStorage.removeItem(k));
        
        location.reload();
    }

    
    renderGameState() {
        this.renderScore();
        this.renderShop();
    }

   
    incrementScore() {
        this.store.addKrystalls(this.store.clickPower);
        this.renderGameState();
    }

    
    renderScore() {
        this.scoreDisplay.textContent = `Krystalls: ${this.store.shortFormKrystalls()} | Power: ${this.store.clickPower} | Auto: ${this.store.autoKrystallsPerSecond}/s`;
    }

   
    renderShop() {
        this.shopList.innerHTML = '';

        this.upgrades.getAll().forEach((item) => {
            
            const affordable = this.store.canBuyUpgrade(item);
            
            const boughtCount = this.store.getUpgradeCount(item.id);
            
            const itemMeta = item.autoKrystallsPerSecond
                ? `+${item.autoKrystallsPerSecond} Krystall pro Sekunde`
                : `+${item.power} Power pro Klick`;
            const itemElement = document.createElement('div');
            itemElement.className = 'shop-item';
            
            const currentCost = window.gameUpgrades.getCost(item.id, boughtCount);
            itemElement.innerHTML = `
                <div class="shop-item-title">${item.name}</div>
                <div class="shop-item-meta">${itemMeta} | ${boughtCount}/${item.maxQuantity} gekauft</div>
                <button class="shop-buy-button" type="button" data-upgrade-id="${item.id}" ${affordable ? '' : 'disabled'}>
                    Kaufen für ${currentCost} Krystalls
                </button>
            `;

            itemElement.querySelector('button').addEventListener('click', () => this.buyUpgrade(item.id));
            this.shopList.appendChild(itemElement);
        });
    }

   
    buyUpgrade(upgradeId) {
        const upgrade = this.upgrades.getById(upgradeId);

        if (!upgrade) {
            return;
        }

        this.store.buyUpgrade(upgrade);
        this.renderScore();
        this.renderShop();
    }

    
    renderPrestige() {
        const prestigeBonus = this.store.prestige + 1;
        this.prestigeText.textContent = `Prestige Stufe ${this.store.prestige}. Setze bei ${Prestige.threshold} Krystalls zurück, um dauerhaft x${prestigeBonus} Bonus auf Klick-Power zu erhalten.`;
    }

    doPrestige() {
        if (!this.store.doPrestige()) {
            return;
        }

        this.renderScore();
        this.renderShop();
        this.renderPrestige();
        this.closeModal(this.prestigeModal);
    }

    

    openModal(modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
    }

    
    closeModal(modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    }

    
    getModalById(id) {
        return document.getElementById(id);
    }
}


const clickCounter = new ClickCounter();
