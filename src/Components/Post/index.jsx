import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GetPosts } from '../../API/Post'
import { useSelector } from 'react-redux'
import AddEditPost from './Components/AddEditPost'
import Post from './Components/Post'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isFetching, setIsFetching] = useState(false) // New state for preventing multiple fetches
  const { User } = useSelector((state) => state.User)

  const fetchPosts = async () => {
    try {
      const pageSize = 10
      setIsFetching(true) // Set fetching to true to block new requests until done
      let results = await GetPosts(User.UserId, page, pageSize)
      if (results.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...results])
        setPage((prevPage) => prevPage + 1)
      } else {
        setHasMore(false) // No more posts to load
      }
      setIsFetching(false) // Reset fetching state after loading
    } catch (error) {
      console.error(error)
      setIsFetching(false) // Reset fetching state if an error occurs
    }
  }

  const loadPosts = async () => {
    if (!hasMore || isFetching) return // Check if already fetching or no more posts

    await fetchPosts()
  }

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 50
      ) {
        loadPosts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathnam, page, hasMore, isFetching]) // Add isFetching to dependency array

  const handleAddPost = (post) => {
    setPosts([post, ...posts])
  }

  const handleDeletePost = () => {
    fetchPosts()
  }

  return (
    <div className="bg-gray-50 dark:bg-darkColor-800">
      <AddEditPost onAddPost={handleAddPost} />
      {Array.isArray(posts) &&
        posts.length > 0 &&
        posts.map((post) => (
          <Post key={uuidv4()} postinfo={post} onDelete={handleDeletePost} />
        ))}
      {hasMore && <p className=" text-center mb-2">Loading more posts...</p>}
    </div>
  )
}
