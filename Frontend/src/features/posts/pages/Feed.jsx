import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Nav from '../../shared/components/Nav'
import { Link } from 'react-router'

const Feed = () => {

    const { feed, loading, error, handleLike, handleUnLike } = usePost()

    if (loading || !feed) {
        return (<main><h1>Feed is loading...</h1></main>)
    }

    if (error) {
        return (
            <main>
                <h1>{error}</h1>
                <Link to="/login">Go to login</Link>
            </main>
        )
    }



    return (
        <main className='feed-page' >
            <Nav/>
            <div className="feed">
                <div className="posts">
                    {feed.map(post=>{
                        return <Post user={post.user} post={post} loading={loading} handleLike={handleLike}  handleUnLike={handleUnLike}/>
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed