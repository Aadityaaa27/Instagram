import { getFeed, createPost, likePost, unLikePost } from "../services/post.api"
import { useCallback, useContext, useEffect } from "react"
import { PostContext } from "../post.context"

export const usePost = () => {

    const context = useContext(PostContext)

    const { loading, setLoading, post, feed, setFeed } = context

    const handleGetFeed = useCallback(async () => {
        setLoading(true)
        try {
            const data = await getFeed()
            setFeed(data.posts.reverse())
        } finally {
            setLoading(false)
        }
    }, [setFeed, setLoading])

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

    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnLike }

}