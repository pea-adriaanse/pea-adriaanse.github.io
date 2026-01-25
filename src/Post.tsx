// import { useState, use } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

// async function fetchPost(file: string) {
//     return await fetch(`/posts/${file}.md`).then((result) => result.text());
// }

interface PostProps {
    content: string
}

function Post({ content }: PostProps) {
    // const markdown: string = use(fetchPost(file));
    return (
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ h1: "h2" }}>{content}</Markdown>
    );
}

export default Post;