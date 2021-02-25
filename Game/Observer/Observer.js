/**
 * classe Observer créer par Joudrier Kevin
 * 
 * @property {array} observers : Contient toutes les observers
 **/
export class Observer {

    constructor() {
        this.observers = [];
    }

    /**
     * Souscrit a un observer
     * 
     * @param {CallableFunction} observer 
     * @return {void}
     **/
    subscribe(observer) {
        this.observers.push(observer);
    }

    /**
     * Supprime la souscription a un observer
     * 
     * @param {CallableFunction} observer
     * @return  {void}
     **/
    unsubscribe(observer) {
        this.observers = this.observers.filter(subscriber => subscriber !== observer);
    }

    /**
     * Avertie des modifications sur un observer
     * 
     * @param {array} data 
     **/
    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}