document.getElementById('calc-btn').addEventListener('click', calculateStats);

function calculateStats() {
    const level = parseFloat(document.getElementById('level').value);
    const natureValue = document.getElementById('nature').value;

    // Parse which stat is boosted and which is lowered
    let boostedStat = null;
    let loweredStat = null;

    if (natureValue !== 'neutral') {
        const parts = natureValue.split('-'); // e.g. ["atk","up","def","down"]
        boostedStat = parts[0];
        loweredStat = parts[2];
    }

    const stats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

    stats.forEach(stat => {
        const base = parseFloat(document.getElementById(`base-${stat}`).value);
        const iv = parseFloat(document.getElementById(`iv-${stat}`).value);
        const ev = parseFloat(document.getElementById(`ev-${stat}`).value);

        const inner = Math.floor((2 * base + iv + Math.floor(ev / 4)) * level / 100);

        let result;
        if (stat === 'hp') {
            result = inner + level + 10;
        } else {
            let multiplier = 1.0;
            if (stat === boostedStat) multiplier = 1.1;
            if (stat === loweredStat) multiplier = 0.9;

            result = Math.floor((inner + 5) * multiplier);
        }

        document.getElementById(`result-${stat}`).textContent = result;
    });
}
