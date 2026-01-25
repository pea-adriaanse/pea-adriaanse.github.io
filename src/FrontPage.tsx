import Photo from "./assets/images/pasfoto_half.png";
import GitHub_Dark from "./assets/images/github-mark-white.png";
import GitHub_Light from "./assets/images/github-mark.png";
import LinkedIn from "./assets/images/LI-In-Bug.png";
import Post from "./Post";
import "./FrontPage.css";

const postFiles: Record<string, string> = import.meta.glob("./assets/posts/**/*.md", { query: "?raw", eager: true, import: "default" });

function FrontPage() {
	const files: string[] = Object.keys(postFiles);
	const posts = files.map(key => <li key={key} className="post"><Post content={postFiles[key]} /></li>);

	return (
		<>
			<header>
				<img src={Photo} alt="profile picture" id="profilePicture" />
				<h1>
					Paul Adriaanse
				</h1>
				<nav> {/* nav or address (add email) */}
					<a href="https://github.com/pea-adriaanse">
						<picture>
							<source media="(prefers-color-scheme: light)" srcSet={GitHub_Light} />
							<img src={GitHub_Dark} alt="github logo" />
						</picture>
						GitHub
					</a>
					<a href="https://www.linkedin.com/in/paul-adriaanse/">
						<img src={LinkedIn} alt="linkedin logo" />
						LinkedIn
					</a>
				</nav>
			</header>
			<main>
				<ul id="posts">
					{posts}
				</ul>
			</main>
		</>
	);

}

export default FrontPage
