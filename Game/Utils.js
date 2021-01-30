export class Utils {

    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}