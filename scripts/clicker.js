class ClickCounter {

    // Initialisiert die UI-Elemente und bindet alle Events.
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

        this.asteroid.addEventListener('click', () => this.incrementScore());
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

    // Rendert Spielstand und Shop neu.
    renderGameState() {
        this.renderScore();
        this.renderShop();
    }

    // Erhöht Krystalls durch den Klick auf den Asteroiden.
    incrementScore() {
        this.store.addKrystalls(this.store.clickPower);
        this.renderGameState();
    }

    // Zeigt die aktuelle Krystall- und Power-Anzeige an.
    renderScore() {
        this.scoreDisplay.textContent = `Krystalls: ${this.store.shortFormKrystalls()} | Power: ${this.store.clickPower} | Auto: ${this.store.autoKrystallsPerSecond}/s`;
    }

    // Baut die Shop-Liste aus allen verfügbaren Upgrades zusammen.
    renderShop() {
        this.shopList.innerHTML = '';

        this.upgrades.getAll().forEach((item) => {
            const affordable = this.store.canBuyUpgrade(item);
            const boughtCount = this.store.getUpgradeCount(item.id);
            const itemMeta = item.autoKrystallsPerSecond
                ? `+${item.autoKrystallsPerSecond} Krystall pro Sekunde`
                : `+${item.power} power per click`;
            const itemElement = document.createElement('div');
            itemElement.className = 'shop-item';
            itemElement.innerHTML = `
                <div class="shop-item-title">${item.name}</div>
                <div class="shop-item-meta">${itemMeta} | ${boughtCount}/${item.maxQuantity} gekauft</div>
                <button class="shop-buy-button" type="button" data-upgrade-id="${item.id}" ${affordable ? '' : 'disabled'}>
                    Buy for ${item.cost} Krystalls
                </button>
            `;

            itemElement.querySelector('button').addEventListener('click', () => this.buyUpgrade(item.id));
            this.shopList.appendChild(itemElement);
        });
    }

    // Kauft ein Upgrade über seine ID.
    buyUpgrade(upgradeId) {
        const upgrade = this.upgrades.getById(upgradeId);

        if (!upgrade) {
            return;
        }

        this.store.buyUpgrade(upgrade);
        this.renderScore();
        this.renderShop();
    }

    // Aktualisiert den Prestige-Text mit der aktuellen Stufe.
    renderPrestige() {
        const prestigeBonus = this.store.prestige + 1;
        this.prestigeText.textContent = `Prestige level ${this.store.prestige}. Reset at ${Prestige.threshold} Krystalls to gain a permanent x${prestigeBonus} bonus to click power.`;
    }

    // Führt Prestige aus, wenn das Ziel erreicht ist.
    doPrestige() {
        if (!this.store.doPrestige()) {
            return;
        }

        this.renderScore();
        this.renderShop();
        this.renderPrestige();
        this.closeModal(this.prestigeModal);
    }

    // Öffnet ein Popup-Fenster.
    openModal(modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
    }

    // Schließt ein Popup-Fenster.
    closeModal(modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    }

    // Holt ein Modal per ID aus dem DOM.
    getModalById(id) {
        return document.getElementById(id);
    }
}


const clickCounter = new ClickCounter();
