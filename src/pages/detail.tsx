
export default function Detail() {
    return (
        <form action="/" method="get" className="search">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search Pokémons</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search Pokémons"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
    );
}
