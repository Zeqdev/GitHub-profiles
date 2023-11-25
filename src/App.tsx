import { useState } from 'react'
import './App.css'

interface User {
	name: string
	avatar_url: string
	bio: string
	followers: number
	following: number
	public_repos: number
}

export function App() {
	const [input, setInput] = useState<string>('')
	const [user, setUser] = useState<User | null>(null)

	const APIURL = 'https://api.github.com/users/'

	const getUser = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			fetch(APIURL + input)
				.then(response => response.json())
				.then(result => {
					setUser(result)
					setInput('')
				})
		}
	}

	return (
		<>
			<header className='search-container'>
				<input
					className='search-box'
					type='text'
					placeholder='Search a Github user'
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyPress={e => getUser(e)}
				/>
			</header>
			<main className='card-container'>
				{user ? (
					<div className='card'>
						<div className='img-container'>
							<img className='img' src={user.avatar_url} alt={user.name}></img>
						</div>
						<div className='profile'>
							<h2>{user.name}</h2>
							<span>{user.bio}</span>
							<div className='user-info'>
								<p>
									<strong>{user.followers} Followers</strong>
								</p>
								<p>
									<strong>{user.following} Following</strong>
								</p>
								<p>
									<strong>{user.public_repos} Repositories</strong>
								</p>
							</div>
						</div>
					</div>
				) : (
					<h2 className='not-found'>No results</h2>
				)}
			</main>
		</>
	)
}

export default App
