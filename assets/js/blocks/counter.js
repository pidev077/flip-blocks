export default {
    init() {
        const blocks = document.querySelectorAll('.counter-item');
        if (!blocks.length) return;

        blocks.forEach(block => {
            const counters = block.querySelectorAll('.counter-number');
            if (!counters.length) return;

            function animateFormattedCounter(el, duration = 2000) {
                const originalText = el.textContent.trim();

                const numberMatch = originalText.match(/[\d.,]+/);
                const prefixMatch = originalText.match(/^[^\d]+/);
                const suffixMatch = originalText.match(/[^\d]+$/);

                const prefix = prefixMatch ? prefixMatch[0] : '';
                const suffix = suffixMatch ? suffixMatch[0] : '';
                const numberStr = numberMatch ? numberMatch[0] : '0';

                let decimalSeparator = '.';
                if (numberStr.includes(',') && numberStr.includes('.')) {
                    decimalSeparator =
                        numberStr.lastIndexOf(',') > numberStr.lastIndexOf('.') ? ',' : '.';
                } else if (numberStr.includes(',')) {
                    decimalSeparator = ',';
                }

                let decimalDigits = 0;
                const decimalPart = numberStr.split(decimalSeparator)[1];
                if (decimalPart) decimalDigits = decimalPart.length;

                let normalized = numberStr.replace(new RegExp(`[^\\d${decimalSeparator}]`, 'g'), '');
                if (decimalSeparator === ',') normalized = normalized.replace(',', '.');
                const target = parseFloat(normalized) || 0;

                const start = 0;
                const startTime = performance.now();

                const thousandSeparator = decimalSeparator === '.' ? ',' : '.';

                function formatNumber(num) {
                    let parts = num.toFixed(decimalDigits).split('.');
                    let intPart = parts[0];
                    let decPart = parts[1];

                    if (thousandSeparator)
                        intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

                    return decimalDigits > 0
                        ? `${intPart}${decimalSeparator}${decPart}`
                        : intPart;
                }

                function easeOutCubic(t) {
                    return 1 - Math.pow(1 - t, 3);
                }

                // --- Animation loop ---
                function update(now) {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const eased = easeOutCubic(progress);
                    const current = eased * (target - start) + start;

                    el.textContent = prefix + formatNumber(current) + suffix;

                    if (progress < 1) requestAnimationFrame(update);
                }

                requestAnimationFrame(update);
            }

            // --- IntersectionObserver ---
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            counters.forEach(el => animateFormattedCounter(el));
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            observer.observe(block);
        });
    }
};