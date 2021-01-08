/**
 * Group all class classes accessible
 * in all the application
 **/
export class Container {

    /**
     *
     * @param {string} functionName
     **/
    get(functionName) {
        if(this[functionName]) {
            this[functionName]();
        }
    }
}