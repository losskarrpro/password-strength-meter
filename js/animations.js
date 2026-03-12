class ProgressBarAnimator {
    constructor(progressBarElement) {
        this.progressBar = progressBarElement;
        this.currentWidth = 0;
        this.targetWidth = 0;
        this.animationFrameId = null;
        this.lastTimestamp = 0;
        this.animationDuration = 300;
    }

    animateTo(width, color) {
        this.targetWidth = Math.max(0, Math.min(100, width));
        const startWidth = this.currentWidth;
        const widthDiff = this.targetWidth - startWidth;
        const startColor = this.getCurrentColor();
        const targetColor = color;

        const animate = (timestamp) => {
            if (!this.lastTimestamp) this.lastTimestamp = timestamp;
            const elapsed = timestamp - this.lastTimestamp;
            const progress = Math.min(elapsed / this.animationDuration, 1);

            const easeProgress = this.easeOutCubic(progress);
            this.currentWidth = startWidth + (widthDiff * easeProgress);

            const currentColor = this.interpolateColor(startColor, targetColor, easeProgress);

            this.progressBar.style.width = `${this.currentWidth}%`;
            this.progressBar.style.backgroundColor = currentColor;

            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(animate);
            } else {
                this.currentWidth = this.targetWidth;
                this.progressBar.style.width = `${this.currentWidth}%`;
                this.progressBar.style.backgroundColor = targetColor;
                this.animationFrameId = null;
                this.lastTimestamp = 0;
            }
        };

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        this.animationFrameId = requestAnimationFrame(animate);
    }

    getCurrentColor() {
        const computedStyle = window.getComputedStyle(this.progressBar);
        return computedStyle.backgroundColor || 'rgb(220, 53, 69)';
    }

    interpolateColor(color1, color2, factor) {
        const c1 = this.parseColor(color1);
        const c2 = this.parseColor(color2);

        const r = Math.round(c1.r + (c2.r - c1.r) * factor);
        const g = Math.round(c1.g + (c2.g - c1.g) * factor);
        const b = Math.round(c1.b + (c2.b - c1.b) * factor);

        return `rgb(${r}, ${g}, ${b})`;
    }

    parseColor(color) {
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3])
            };
        }
        return { r: 220, g: 53, b: 69 };
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    reset() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.currentWidth = 0;
        this.targetWidth = 0;
        this.lastTimestamp = 0;
        this.progressBar.style.width = '0%';
        this.progressBar.style.backgroundColor = 'rgb(220, 53, 69)';
    }
}

class CriterionAnimator {
    constructor() {
        this.animationDuration = 200;
    }

    animateCriterion(element, isValid) {
        if (!element) return;

        const icon = element.querySelector('.criterion-icon');
        const text = element.querySelector('.criterion-text');

        if (isValid) {
            this.animateSuccess(icon, text);
        } else {
            this.animateFailure(icon, text);
        }
    }

    animateSuccess(icon, text) {
        icon.classList.remove('invalid');
        icon.classList.add('valid');

        icon.style.transform = 'scale(1.2)';
        text.style.color = '#198754';

        setTimeout(() => {
            icon.style.transform = 'scale(1)';
            icon.style.transition = 'transform 0.3s ease';
        }, this.animationDuration);
    }

    animateFailure(icon, text) {
        icon.classList.remove('valid');
        icon.classList.add('invalid');

        icon.style.transform = 'scale(0.9)';
        text.style.color = '#dc3545';

        setTimeout(() => {
            icon.style.transform = 'scale(1)';
            icon.style.transition = 'transform 0.3s ease';
        }, this.animationDuration);
    }

    resetCriterion(element) {
        const icon = element.querySelector('.criterion-icon');
        const text = element.querySelector('.criterion-text');

        icon.classList.remove('valid', 'invalid');
        icon.style.transform = 'scale(1)';
        icon.style.transition = '';
        text.style.color = '';
    }
}

class ScoreAnimator {
    constructor(scoreElement) {
        this.scoreElement = scoreElement;
        this.currentScore = 0;
        this.targetScore = 0;
        this.animationFrameId = null;
        this.animationDuration = 400;
    }

    animateTo(score) {
        this.targetScore = Math.max(0, Math.min(100, score));
        const startScore = this.currentScore;
        const scoreDiff = this.targetScore - startScore;

        const animate = (timestamp) => {
            if (!this.lastTimestamp) this.lastTimestamp = timestamp;
            const elapsed = timestamp - this.lastTimestamp;
            const progress = Math.min(elapsed / this.animationDuration, 1);

            const easeProgress = this.easeOutQuad(progress);
            this.currentScore = Math.round(startScore + (scoreDiff * easeProgress));

            this.scoreElement.textContent = this.currentScore;
            this.updateScoreColor();

            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(animate);
            } else {
                this.currentScore = this.targetScore;
                this.scoreElement.textContent = this.currentScore;
                this.updateScoreColor();
                this.animationFrameId = null;
                this.lastTimestamp = 0;
            }
        };

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        this.lastTimestamp = 0;
        this.animationFrameId = requestAnimationFrame(animate);
    }

    updateScoreColor() {
        if (this.currentScore < 40) {
            this.scoreElement.style.color = '#dc3545';
        } else if (this.currentScore < 70) {
            this.scoreElement.style.color = '#fd7e14';
        } else {
            this.scoreElement.style.color = '#198754';
        }
    }

    easeOutQuad(t) {
        return t * (2 - t);
    }

    reset() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.currentScore = 0;
        this.targetScore = 0;
        this.lastTimestamp = 0;
        this.scoreElement.textContent = '0';
        this.scoreElement.style.color = '#dc3545';
    }
}

class SuggestionsAnimator {
    constructor(suggestionsContainer) {
        this.suggestionsContainer = suggestionsContainer;
    }

    showSuggestions(suggestions) {
        this.suggestionsContainer.innerHTML = '';
        
        if (!suggestions || suggestions.length === 0) {
            this.suggestionsContainer.style.opacity = '0';
            this.suggestionsContainer.style.transform = 'translateY(-10px)';
            return;
        }

        suggestions.forEach((suggestion, index) => {
            const suggestionElement = document.createElement('div');
            suggestionElement.className = 'suggestion-item';
            suggestionElement.textContent = suggestion;
            suggestionElement.style.opacity = '0';
            suggestionElement.style.transform = 'translateX(-20px)';
            suggestionElement.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
            
            this.suggestionsContainer.appendChild(suggestionElement);
        });

        this.suggestionsContainer.style.opacity = '1';
        this.suggestionsContainer.style.transform = 'translateY(0)';

        setTimeout(() => {
            const items = this.suggestionsContainer.querySelectorAll('.suggestion-item');
            items.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
        }, 50);
    }

    hideSuggestions() {
        const items = this.suggestionsContainer.querySelectorAll('.suggestion-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
        });

        setTimeout(() => {
            this.suggestionsContainer.style.opacity = '0';
            this.suggestionsContainer.style.transform = 'translateY(-10px)';
            this.suggestionsContainer.innerHTML = '';
        }, 300);
    }
}

const AnimationManager = {
    progressBarAnimator: null,
    criterionAnimator: null,
    scoreAnimator: null,
    suggestionsAnimator: null,

    init() {
        const progressBar = document.querySelector('.progress-bar');
        const scoreElement = document.querySelector('.strength-score');
        const suggestionsContainer = document.querySelector('.suggestions-container');

        if (progressBar) {
            this.progressBarAnimator = new ProgressBarAnimator(progressBar);
        }
        
        this.criterionAnimator = new CriterionAnimator();
        
        if (scoreElement) {
            this.scoreAnimator = new ScoreAnimator(scoreElement);
        }
        
        if (suggestionsContainer) {
            this.suggestionsAnimator = new SuggestionsAnimator(suggestionsContainer);
        }
    },

    animateProgressBar(width, color) {
        if (this.progressBarAnimator) {
            this.progressBarAnimator.animateTo(width, color);
        }
    },

    animateCriterion(element, isValid) {
        if (this.criterionAnimator) {
            this.criterionAnimator.animateCriterion(element, isValid);
        }
    },

    animateScore(score) {
        if (this.scoreAnimator) {
            this.scoreAnimator.animateTo(score);
        }
    },

    showSuggestions(suggestions) {
        if (this.suggestionsAnimator) {
            this.suggestionsAnimator.showSuggestions(suggestions);
        }
    },

    hideSuggestions() {
        if (this.suggestionsAnimator) {
            this.suggestionsAnimator.hideSuggestions();
        }
    },

    resetAll() {
        if (this.progressBarAnimator) {
            this.progressBarAnimator.reset();
        }
        
        if (this.scoreAnimator) {
            this.scoreAnimator.reset();
        }
        
        if (this.suggestionsAnimator) {
            this.suggestionsAnimator.hideSuggestions();
        }

        const criteria = document.querySelectorAll('.criterion-item');
        criteria.forEach(criterion => {
            if (this.criterionAnimator) {
                this.criterionAnimator.resetCriterion(criterion);
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AnimationManager.init();
});