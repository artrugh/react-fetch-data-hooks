import React, { useEffect, useState } from 'react';

//custom hooks
import { useHackerNewsApi, useDataApi, useDataApiWithReducer } from './useFetchHooks';

export function HackerNewsApiComp() {

    const [query, setQuery] = useState('redux');
    const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi();

    return (
        <>
            <form onSubmit={event => {
                doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
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
    )
}

export function DataApiComp() {

    const [query, setQuery] = useState('redux');
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
        'https://hn.algolia.com/api/v1/search?query=redux',
        { hits: [] },
    );

    return (
        <>
            <form
                onSubmit={event => {
                    doFetch(
                        `http://hn.algolia.com/api/v1/search?query=${query}`,
                    );
                    event.preventDefault();
                }}
            >
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

export function DataApiWithReducerComp() {

    const [query, setQuery] = useState('redux');

    const [{ data, isLoading, isError }, doFetch] = useDataApiWithReducer(
        'https://hn.algolia.com/api/v1/search?query=redux',
        { hits: []},
    );

    useEffect(() => {
        console.log(data);
        
    }, [data])

    return (
        <>
            <form
                onSubmit={event => {
                    doFetch(
                        `http://hn.algolia.com/api/v1/search?query=${query}`,
                    );
                    event.preventDefault();
                }}
            >
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