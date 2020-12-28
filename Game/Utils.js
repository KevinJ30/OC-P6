export class Utils {

    static randomNumber(min, max) {
        return Math.trunc(Math.random() * ((max) - min) + min);
    }

}