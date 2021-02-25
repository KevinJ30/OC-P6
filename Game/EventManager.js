/**
 * Classe EventManager créer par Joudrier Kevin
 * 
 * @property {Object} listeners : Liste des callable trier par événement
 **/
export class EventManager {

    constructor() {
        this.listeners = {}
    }

    /**
     * Attaches un callback a un événement
     * 
     * @param {string} event : Nom de l'évenement
     * @param { function } callback : Fonction a appeller
     * @param {number} priority : Ordre de priorité
     * @return {void}
     */
    attach(event, callback, priority) {
        // Si la clé de l"évènement n'existe pas on la créer dans le tableaux
        if(this.listeners[event] === undefined) {
            this.listeners[event] = [];
        }

        // On ajoute le callable dans le tableaux
        this.listeners[event].push({
            call: callback,
            priority: priority
        });
        
        // Trie le tableau dans l'ordre de priorité
        let newEvents = this.listeners[event].sort((last, current) => {
            if(last.priority < current.priority) {
                return -1;
            }
            else if(last.priority > current.priority) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }

    /**
     * Appelle toutes les fonctions d'un événement
     * 
     * @param {string} event : Nom de l'événement
     * @param {Object} argv : Argument passé au fonction appellé
     **/
    trigger(event, argv = {}) {
        const events = this.listeners[event];
        console.log(argv);
        // Recherche l'évent dans la liste
        if(events !== undefined) {

            // On parcour la liste est on éxécute les événement les un après les autres
            events.forEach((item) => {
                item.call.apply(null, argv);
            })
        }
    }

    /**
     * Supprime une fonction attaché a l'événement 
     * 
     * @param {string} event : Nom de l'événement
     * @param {callback} callaback : Fonction de l'événement
     **/
    detach(event, callback) {
        this.listeners[event] = this.listeners[event].filter(item => item !== callback);
    }
    
}