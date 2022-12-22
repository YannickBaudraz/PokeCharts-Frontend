
import { useState } from 'react';
import Search from '../components/search';
import pokemon from '../data/pokemon.json'; 



const filterPosts = (posts: any[], query: string | null) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
    });
};

export default function Detail() {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(pokemon, searchQuery);
    return (
        <>
        <Search 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}/>
        <ul>
            {filteredPosts.map(pokemon => (
                    <li key={pokemon.key}>{pokemon.name}</li>
                ))}
            </ul>
        </>
    );
}
