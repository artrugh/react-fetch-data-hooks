import React, { useState, useEffect } from 'react';
import axios from 'axios';

// form calla API without loading and error settings
export function Form() {

    const [data, setData] = useState({ hits: [] });
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://hn.algolia.com/api/v1/search?query=${query}`,
            );
            setData(result.data);
        };
        fetchData();
    }, [search]);
    return (
        <>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button type="button" onClick={() => setSearch(query)}>
                Search
        </button>
            <ul>
                {data.hits.map(item => (
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </>
    );
}

// form call API with loading and error settings
export function FormSettings() {

    const [data, setData] = useState({ hits: [] });
    const [query, setQuery] = useState('redux');
    const [url, setUrl] = useState(
        'https://hn.algolia.com/api/v1/search?query=redux'
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios(url);
                setData(result.data);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [url]);

    return (
        <>
            <form onSubmit={event => {
                setUrl(`http://hn.algolia.com/ap/v1/search?query=${query}`);
                event.preventDefault();
            }}>
                <input
                    type="text"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {isError && <div>Something went wrong ...</div>}
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                    <ul>
                        {data.hits.map(item => (
                            <li key={item.objectID}>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                )}
        </>
    );
}