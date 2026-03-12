class PasswordStrength {
    constructor() {
        this.criteria = {
            minLength: 8,
            hasUpperCase: false,
            hasLowerCase: false,
            hasNumbers: false,
            hasSpecialChars: false,
            uniqueChars: 0,
            length: 0
        };
        
        this.specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        this.commonPasswords = ['password', '123456', 'qwerty', 'letmein', 'welcome', 'admin', 'password123'];
    }

    analyze(password) {
        this.resetCriteria();
        this.criteria.length = password.length;
        
        if (password.length === 0) {
            return this.calculateScore();
        }

        const chars = new Set(password);
        this.criteria.uniqueChars = chars.size;

        for (let char of password) {
            if (char >= 'A' && char <= 'Z') {
                this.criteria.hasUpperCase = true;
            } else if (char >= 'a' && char <= 'z') {
                this.criteria.hasLowerCase = true;
            } else if (char >= '0' && char <= '9') {
                this.criteria.hasNumbers = true;
            } else if (this.specialChars.includes(char)) {
                this.criteria.hasSpecialChars = true;
            }
        }

        return this.calculateScore();
    }

    resetCriteria() {
        this.criteria.hasUpperCase = false;
        this.criteria.hasLowerCase = false;
        this.criteria.hasNumbers = false;
        this.criteria.hasSpecialChars = false;
        this.criteria.uniqueChars = 0;
        this.criteria.length = 0;
    }

    calculateScore() {
        let score = 0;
        const maxScore = 100;

        const lengthScore = Math.min(this.criteria.length * 4, 30);
        score += lengthScore;

        if (this.criteria.hasUpperCase) score += 10;
        if (this.criteria.hasLowerCase) score += 10;
        if (this.criteria.hasNumbers) score += 15;
        if (this.criteria.hasSpecialChars) score += 20;

        const uniqueRatio = this.criteria.uniqueChars / Math.max(this.criteria.length, 1);
        score += Math.min(uniqueRatio * 15, 15);

        if (this.criteria.length >= 12) score += 10;

        score = Math.min(score, maxScore);

        if (this.isCommonPassword()) {
            score = Math.max(score - 30, 0);
        }

        if (this.criteria.length < 4) {
            score = Math.max(score - 20, 0);
        }

        return {
            score: Math.round(score),
            criteria: { ...this.criteria },
            strength: this.getStrengthLevel(score)
        };
    }

    getStrengthLevel(score) {
        if (score >= 80) return 'strong';
        if (score >= 50) return 'medium';
        return 'weak';
    }

    isCommonPassword() {
        const lowerPassword = this.criteria.length > 0 ? 
            Array.from({ length: this.criteria.length }, (_, i) => 
                String.fromCharCode(this.criteria.length)
            ).join('').toLowerCase() : '';
        
        for (let common of this.commonPasswords) {
            if (lowerPassword.includes(common)) {
                return true;
            }
        }
        return false;
    }

    getCriteriaStatus() {
        return {
            length: this.criteria.length >= this.criteria.minLength,
            hasUpperCase: this.criteria.hasUpperCase,
            hasLowerCase: this.criteria.hasLowerCase,
            hasNumbers: this.criteria.hasNumbers,
            hasSpecialChars: this.criteria.hasSpecialChars,
            uniqueChars: this.criteria.uniqueChars
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PasswordStrength;
}