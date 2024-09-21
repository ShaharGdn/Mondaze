import loader from '../../src/assets/img/loader.gif'

export function Loader() {
    return (
        <section className="loader-container">
            <img src={loader} alt="loader" className="loader" />
        </section>
    )
}