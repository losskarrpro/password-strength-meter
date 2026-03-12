import { calculatePasswordStrength, checkCriteria } from '../password-strength.js';

describe('Password Strength Calculator', () => {
    describe('checkCriteria', () => {
        test('should return correct criteria for empty password', () => {
            const result = checkCriteria('');
            expect(result).toEqual({
                length: false,
                uppercase: false,
                lowercase: false,
                numbers: false,
                specialChars: false
            });
        });

        test('should detect length criteria (min 8 chars)', () => {
            expect(checkCriteria('1234567').length).toBe(false);
            expect(checkCriteria('12345678').length).toBe(true);
            expect(checkCriteria('123456789').length).toBe(true);
        });

        test('should detect uppercase letters', () => {
            expect(checkCriteria('abc').uppercase).toBe(false);
            expect(checkCriteria('ABC').uppercase).toBe(true);
            expect(checkCriteria('Abc').uppercase).toBe(true);
            expect(checkCriteria('123').uppercase).toBe(false);
        });

        test('should detect lowercase letters', () => {
            expect(checkCriteria('ABC').lowercase).toBe(false);
            expect(checkCriteria('abc').lowercase).toBe(true);
            expect(checkCriteria('Abc').lowercase).toBe(true);
            expect(checkCriteria('123').lowercase).toBe(false);
        });

        test('should detect numbers', () => {
            expect(checkCriteria('abc').numbers).toBe(false);
            expect(checkCriteria('123').numbers).toBe(true);
            expect(checkCriteria('abc123').numbers).toBe(true);
            expect(checkCriteria('ABC123').numbers).toBe(true);
        });

        test('should detect special characters', () => {
            expect(checkCriteria('abc123').specialChars).toBe(false);
            expect(checkCriteria('abc!').specialChars).toBe(true);
            expect(checkCriteria('@#$%').specialChars).toBe(true);
            expect(checkCriteria('Abc123!@#').specialChars).toBe(true);
        });
    });

    describe('calculatePasswordStrength', () => {
        test('should return 0 for empty password', () => {
            expect(calculatePasswordStrength('')).toBe(0);
        });

        test('should return low scores for weak passwords', () => {
            expect(calculatePasswordStrength('a')).toBeLessThan(20);
            expect(calculatePasswordStrength('123456')).toBeLessThan(30);
            expect(calculatePasswordStrength('abc')).toBeLessThan(30);
        });

        test('should return medium scores for moderate passwords', () => {
            const score1 = calculatePasswordStrength('Password123');
            expect(score1).toBeGreaterThanOrEqual(40);
            expect(score1).toBeLessThanOrEqual(80);

            const score2 = calculatePasswordStrength('12345678Ab');
            expect(score2).toBeGreaterThanOrEqual(40);
            expect(score2).toBeLessThanOrEqual(80);
        });

        test('should return high scores for strong passwords', () => {
            const score1 = calculatePasswordStrength('StrongP@ssw0rd!');
            expect(score1).toBeGreaterThan(80);
            expect(score1).toBeLessThanOrEqual(100);

            const score2 = calculatePasswordStrength('V3ry$3cur3P@ss!');
            expect(score2).toBeGreaterThan(80);
            expect(score2).toBeLessThanOrEqual(100);
        });

        test('should return 100 for very strong passwords', () => {
            const score = calculatePasswordStrength('V3ry$3cur3&P0w3rfulP@ss!2024');
            expect(score).toBe(100);
        });

        test('should penalize common patterns', () => {
            const commonScore = calculatePasswordStrength('password123');
            const randomScore = calculatePasswordStrength('x7G!p2L@9q');
            expect(randomScore).toBeGreaterThan(commonScore);
        });

        test('should reward password length', () => {
            const shortScore = calculatePasswordStrength('A1b@c2');
            const longScore = calculatePasswordStrength('A1b@c2d3E4f5G6h7!');
            expect(longScore).toBeGreaterThan(shortScore);
        });

        test('should reward character variety', () => {
            const simpleScore = calculatePasswordStrength('aaaaaaaa');
            const variedScore = calculatePasswordStrength('Aa1!Bb2@');
            expect(variedScore).toBeGreaterThan(simpleScore);
        });
    });
});