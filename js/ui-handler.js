import { calculatePasswordStrength } from './password-strength.js';
import { updateSuggestions } from './suggestions.js';
import { animateProgressBar, animateCheckmark } from './animations.js';

class UIHandler {
    constructor() {
        this.passwordInput = document.getElementById('password-input');
        this.strengthBar = document.getElementById('strength-bar');
        this.strengthScore = document.getElementById('strength-score');
        this.strengthLabel = document.getElementById('strength-label');
        this.suggestionsList = document.getElementById('suggestions-list');
        this.criteriaList = document.querySelectorAll('.criterion');
        this.toggleVisibilityBtn = document.getElementById('toggle-visibility');
        this.copyBtn = document.getElementById('copy-password');
        this.generateBtn = document.getElementById('generate-password');
        this.resetBtn = document.getElementById('reset-password');
        
        this.init();
    }

    init() {
        this.passwordInput.addEventListener('input', (e) => this.handlePasswordChange(e.target.value));
        this.toggleVisibilityBtn.addEventListener('click', () => this.togglePasswordVisibility());
        this.copyBtn.addEventListener('click', () => this.copyPasswordToClipboard());
        this.generateBtn.addEventListener('click', () => this.generateRandomPassword());
        this.resetBtn.addEventListener('click', () => this.resetPassword());
        
        this.updateUI('');
    }

    handlePasswordChange(password) {
        this.updateUI(password);
    }

    updateUI(password) {
        const strengthResult = calculatePasswordStrength(password);
        
        this.updateStrengthBar(strengthResult.score);
        this.updateStrengthScore(strengthResult.score);
        this.updateStrengthLabel(strengthResult.score);
        this.updateCriteriaCheckmarks(strengthResult.criteria);
        updateSuggestions(password, strengthResult.criteria, this.suggestionsList);
        
        animateProgressBar(this.strengthBar, strengthResult.score);
    }

    updateStrengthBar(score) {
        this.strengthBar.style.width = `${score}%`;
        
        if (score < 40) {
            this.strengthBar.style.backgroundColor = '#e74c3c';
        } else if (score < 70) {
            this.strengthBar.style.backgroundColor = '#f39c12';
        } else {
            this.strengthBar.style.backgroundColor = '#2ecc71';
        }
    }

    updateStrengthScore(score) {
        this.strengthScore.textContent = score;
    }

    updateStrengthLabel(score) {
        let label = '';
        let color = '';
        
        if (score === 0) {
            label = 'Aucun mot de passe';
            color = '#95a5a6';
        } else if (score < 20) {
            label = 'Très faible';
            color = '#e74c3c';
        } else if (score < 40) {
            label = 'Faible';
            color = '#e67e22';
        } else if (score < 60) {
            label = 'Moyen';
            color = '#f1c40f';
        } else if (score < 80) {
            label = 'Fort';
            color = '#3498db';
        } else {
            label = 'Très fort';
            color = '#2ecc71';
        }
        
        this.strengthLabel.textContent = label;
        this.strengthLabel.style.color = color;
    }

    updateCriteriaCheckmarks(criteria) {
        this.criteriaList.forEach(criterion => {
            const type = criterion.dataset.criterion;
            const checkmark = criterion.querySelector('.checkmark');
            const text = criterion.querySelector('.criterion-text');
            
            if (criteria[type]) {
                criterion.classList.add('met');
                checkmark.style.display = 'inline-block';
                text.style.color = '#2ecc71';
                animateCheckmark(checkmark);
            } else {
                criterion.classList.remove('met');
                checkmark.style.display = 'none';
                text.style.color = '#7f8c8d';
            }
        });
    }

    togglePasswordVisibility() {
        const type = this.passwordInput.getAttribute('type');
        const icon = this.toggleVisibilityBtn.querySelector('i');
        
        if (type === 'password') {
            this.passwordInput.setAttribute('type', 'text');
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
            this.toggleVisibilityBtn.setAttribute('aria-label', 'Masquer le mot de passe');
        } else {
            this.passwordInput.setAttribute('type', 'password');
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
            this.toggleVisibilityBtn.setAttribute('aria-label', 'Afficher le mot de passe');
        }
        
        this.passwordInput.focus();
    }

    copyPasswordToClipboard() {
        if (!this.passwordInput.value) return;
        
        navigator.clipboard.writeText(this.passwordInput.value)
            .then(() => {
                const originalText = this.copyBtn.innerHTML;
                this.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copié!';
                this.copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    this.copyBtn.innerHTML = originalText;
                    this.copyBtn.classList.remove('copied');
                }, 2000);
            })
            .catch(err => {
                console.error('Erreur lors de la copie: ', err);
                alert('Impossible de copier le mot de passe. Veuillez réessayer.');
            });
    }

    generateRandomPassword() {
        const length = 16;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let password = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        
        this.passwordInput.value = password;
        this.updateUI(password);
        this.passwordInput.focus();
        
        const event = new Event('input', { bubbles: true });
        this.passwordInput.dispatchEvent(event);
    }

    resetPassword() {
        this.passwordInput.value = '';
        this.updateUI('');
        this.passwordInput.focus();
    }
}

export { UIHandler };