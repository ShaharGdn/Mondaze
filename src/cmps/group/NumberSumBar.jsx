export function NumberSumBar({ group }) {
    const sum = group.pulses.reduce((total, pulse) => {
        return !isNaN(pulse.number) ? total + +pulse.number : total
    }, 0)

    return (
        <section className="sum-container">
                <span className="total-amount">{sum.toLocaleString('en-GB')}</span>
                <span className="sum-title">sum</span>
        </section>
    )
}