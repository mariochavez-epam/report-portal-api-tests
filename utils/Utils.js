// utils/Utils.ts

module.exports = class Utils {
    /**
     * Generates a random username.
     * @param length - The length of the username to generate.
     * @returns A randomly generated username string.
     */
     generateRandomUsername(length) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const characters = letters + letters.toUpperCase() + numbers;

        let username = '';

        // Ensure the first character is a letter
        username += letters.charAt(Math.floor(Math.random() * letters.length));

        // Generate the rest of the characters
        for (let i = 1; i < length; i++) {
            username += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return username;
    }

    /**
     * Generates a random password.
     * @param length - The length of the password to generate.
     * @returns A randomly generated password string containing uppercase, lowercase, numbers, and special characters.
     */
     generateRandomPassword(length) {
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';
        const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;

        let password = '';

        // Ensure at least one character from each category
        password += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length));
        password += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));

        // Generate the remaining characters
        for (let i = 4; i < length; i++) {
            password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
        }

        // Shuffle the characters in the password to avoid predictable patterns
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        return password;
    }
}
