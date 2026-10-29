import { getFeed, createPost, likePost, unLikePost } from "../services/post.api"
import { useCallback, useContext, useEffect } from "react"
import { PostContext } from "../post.context"

export const usePost = () => {

    const context = useContext(PostContext)

    const { loading, setLoading, error, setError, post, feed, setFeed } = context

    const handleGetFeed = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getFeed()
            setFeed(data.posts.reverse())
        } catch (requestError) {
            setFeed([])
            if (requestError.response?.status === 401) {
                setError("Your session has expired. Please log in again.")
            } else {
                setError("Unable to load the feed. Please try again.")
                console.error("Unable to load the feed.", requestError)
            }
        } finally {
            setLoading(false)
        }
    }, [setError, setFeed, setLoading])

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([ data.post, ...feed ])
        setLoading(false)
    }

    const handleLike = async (post) => {

        await likePost(post)
        await handleGetFeed()

    }
    const handleUnLike = async (post) => {

        await unLikePost(post)
        await handleGetFeed()

    }

    useEffect(() => {
        handleGetFeed()
    }, [handleGetFeed])

    return { loading, error, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnLike }

}