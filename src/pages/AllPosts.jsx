import React, {useState, useEffect} from 'react';
import { Container, PostCard } from '../component';
import databaseService from '../appwrite/config';
import { BounceLoader } from 'react-spinners';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        databaseService.getPosts().then(
            (posts) => {
                if(posts) 
                    setPosts(posts.documents)
                setLoading(false);
            }
        )
    },[])

    if(loading) {
        return (
            <div className='flex items-center justify-center p-10 m-10'>
                <BounceLoader/>
            </div>
        )
    }

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts