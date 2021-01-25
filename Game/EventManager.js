export class EventManager {

    constructor() {

        this.listeners = {}

    }

    /**
     * attaches a listeners to an event
     * 
     * @param {string} event 
     * @param {callback} callback 
     * @param {number} priority 
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
        
        // Sort tableaux listeners
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

        return newEvents;
    }

    trigger(event, target = null, argv = {}) {
        const events = this.listeners[event];

        // Recherche l'évent dans la liste
        if(events !== undefined) {

            // On parcour la liste est on éxécute les événement les un après les autres
            events.forEach((item) => {
                item.call.apply(null, argv);
            })
        }
    }

    /**
     * Detach Event
     * 
     * @param {string} event 
     * @param {callback} $callaback 
     **/
    detach(event, callback) {
        let newEvent = this.listeners[event].filter(item => item !== callback)
        this.listeners[event] = newEvent;
    }
    
}