import React, { useState, useEffect } from 'react'

export default function Repo() {
    const [repositories, setRepositories] = useState([])

    useEffect(async () => {
        const response = await fetch("https://api.github.com/users/markkusMotta/repos")
        const data = await response.json()
    
        setRepositories(data)
    }, [])

    useEffect(() => {
        const filtered = repositories.filter(repo => repo.favorite)
        document.title = `Favorite: ${filtered.length}`

    }, [repositories])

    function handleFavorite(id) {
        const newRepositories = repositories.map(repo => {
            return repo.id === id ? {...repo, favorite: !repo.favorite } : repo
        })

        setRepositories(newRepositories)
    } 


    return (
        <ul>
            {repositories.map(repo => (
                <li key={repo.id}>
                    {repo.name}
                    {repo.favorite && <button className={'active'}>+</button> }
                    <button onClick={() => handleFavorite(repo.id)}>Favorite</button>
                </li>
            ))}
        </ul>
    )
}