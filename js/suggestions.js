/**
 * Génère des suggestions pour améliorer la force d'un mot de passe
 * @module suggestions
 */

/**
 * Liste des suggestions possibles
 * @type {Array<{id: string, message: string, priority: number}>}
 */
const suggestionsList = [
    {
        id: 'length',
        message: 'Ajoutez au moins 8 caractères',
        priority: 1
    },
    {
        id: 'uppercase',
        message: 'Ajoutez au moins une lettre majuscule',
        priority: 2
    },
    {
        id: 'lowercase',
        message: 'Ajoutez au moins une lettre minuscule',
        priority: 2
    },
    {
        id: 'numbers',
        message: 'Ajoutez au moins un chiffre',
        priority: 3
    },
    {
        id: 'special',
        message: 'Ajoutez au moins un caractère spécial (!@#$%^&*)',
        priority: 4
    },
    {
        id: 'common',
        message: 'Évitez les mots de passe courants (password, 123456, etc.)',
        priority: 5
    },
    {
        id: 'sequence',
        message: 'Évitez les séquences simples (abc, 123, qwerty)',
        priority: 6
    },
    {
        id: 'repetition',
        message: 'Évitez les répétitions de caractères (aaa, 111)',
        priority: 7
    },
    {
        id: 'personal',
        message: 'Évitez les informations personnelles (nom, date de naissance)',
        priority: 8
    }
];

/**
 * Mots de passe courants à éviter
 * @type {string[]}
 */
const commonPasswords = [
    'password', '123456', '12345678', '123456789', '12345',
    'qwerty', 'abc123', 'password1', 'admin', 'welcome',
    'monkey', 'letmein', 'dragon', 'football', 'baseball',
    'superman', 'iloveyou', 'trustno1', 'sunshine', 'master'
];

/**
 * Génère des suggestions basées sur l'analyse du mot de passe
 * @param {string} password - Le mot de passe à analyser
 * @param {Object} analysis - Résultat de l'analyse du mot de passe
 * @param {boolean} analysis.hasMinLength - Si le mot de passe a la longueur minimale
 * @param {boolean} analysis.hasUppercase - Si le mot de passe contient des majuscules
 * @param {boolean} analysis.hasLowercase - Si le mot de passe contient des minuscules
 * @param {boolean} analysis.hasNumbers - Si le mot de passe contient des chiffres
 * @param {boolean} analysis.hasSpecial - Si le mot de passe contient des caractères spéciaux
 * @returns {Array<string>} Liste des suggestions
 */
export function generateSuggestions(password, analysis) {
    const suggestions = [];
    
    // Vérifier les critères de base
    if (!analysis.hasMinLength && password.length < 8) {
        suggestions.push(getSuggestion('length'));
    }
    
    if (!analysis.hasUppercase) {
        suggestions.push(getSuggestion('uppercase'));
    }
    
    if (!analysis.hasLowercase) {
        suggestions.push(getSuggestion('lowercase'));
    }
    
    if (!analysis.hasNumbers) {
        suggestions.push(getSuggestion('numbers'));
    }
    
    if (!analysis.hasSpecial) {
        suggestions.push(getSuggestion('special'));
    }
    
    // Vérifier les mots de passe courants
    if (isCommonPassword(password)) {
        suggestions.push(getSuggestion('common'));
    }
    
    // Vérifier les séquences
    if (hasSimpleSequence(password)) {
        suggestions.push(getSuggestion('sequence'));
    }
    
    // Vérifier les répétitions
    if (hasCharacterRepetition(password)) {
        suggestions.push(getSuggestion('repetition'));
    }
    
    // Trier par priorité
    suggestions.sort((a, b) => a.priority - b.priority);
    
    return suggestions.map(s => s.message);
}

/**
 * Récupère une suggestion par son ID
 * @param {string} id - ID de la suggestion
 * @returns {Object} La suggestion
 */
function getSuggestion(id) {
    return suggestionsList.find(s => s.id === id) || suggestionsList[0];
}

/**
 * Vérifie si le mot de passe est courant
 * @param {string} password - Le mot de passe à vérifier
 * @returns {boolean} True si le mot de passe est courant
 */
function isCommonPassword(password) {
    const lowerPassword = password.toLowerCase();
    return commonPasswords.some(common => lowerPassword.includes(common));
}

/**
 * Vérifie si le mot de passe contient des séquences simples
 * @param {string} password - Le mot de passe à vérifier
 * @returns {boolean} True si le mot de passe contient des séquences simples
 */
function hasSimpleSequence(password) {
    const sequences = [
        '123', '234', '345', '456', '567', '678', '789',
        'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz',
        'qwe', 'wer', 'ert', 'rty', 'tyu', 'yui', 'uio', 'iop', 'asd', 'sdf', 'dfg', 'fgh', 'ghj', 'hjk', 'jkl', 'zxc', 'xcv', 'cvb', 'vbn', 'bnm'
    ];
    
    const lowerPassword = password.toLowerCase();
    return sequences.some(seq => lowerPassword.includes(seq));
}

/**
 * Vérifie si le mot de passe contient des répétitions de caractères
 * @param {string} password - Le mot de passe à vérifier
 * @returns {boolean} True si le mot de passe contient des répétitions
 */
function hasCharacterRepetition(password) {
    if (password.length < 3) return false;
    
    for (let i = 0; i < password.length - 2; i++) {
        if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
            return true;
        }
    }
    
    return false;
}

/**
 * Génère un mot de passe fort aléatoire
 * @param {number} length - Longueur du mot de passe (par défaut 12)
 * @returns {string} Mot de passe généré
 */
export function generateStrongPassword(length = 12) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const allChars = uppercase + lowercase + numbers + special;
    let password = '';
    
    // Assurer au moins un caractère de chaque type
    password += getRandomChar(uppercase);
    password += getRandomChar(lowercase);
    password += getRandomChar(numbers);
    password += getRandomChar(special);
    
    // Remplir le reste avec des caractères aléatoires
    for (let i = password.length; i < length; i++) {
        password += getRandomChar(allChars);
    }
    
    // Mélanger le mot de passe
    return shuffleString(password);
}

/**
 * Récupère un caractère aléatoire d'une chaîne
 * @param {string} str - La chaîne source
 * @returns {string} Un caractère aléatoire
 */
function getRandomChar(str) {
    return str[Math.floor(Math.random() * str.length)];
}

/**
 * Mélange les caractères d'une chaîne
 * @param {string} str - La chaîne à mélanger
 * @returns {string} La chaîne mélangée
 */
function shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}