import React, {useEffect, useState} from 'react';
import databaseService from '../appwrite/config';
import { Container,  PostCard } from '../component';
import { useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        databaseService.getPosts([]).then(
            (posts) => {
                if(posts) {
                    setPosts(posts.documents);
                }
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

    if(posts.length === 0) {
        return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            {!userData ? 'Login to read posts' : 'No posts available'}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }
  return (
    <div className='w-full py-8'>
        <Container>
            <h1 className='text-2xl m-2'>Hello, <span className='font-bold italic text-gray-800'>{userData?.name}!</span></h1>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    post.status === 'active'  &&(<div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>)
                ))}
            </div>
            {posts.some(post => (post.status === 'inactive' && post.userId === userData?.$id)) && 
            (
            <>    
            <div className='flex items-center justify-center'>
                <hr className='border w-1/2 border-gray-200'/>
                <span className='bg-white text-md font-bold px-1 rounded-lg whitespace-nowrap'>Your Draft</span>
                <hr className='border w-1/2 border-gray-200'/>
            </div>
            <div className='flex flex-wrap'>
                {posts.filter(post => post.status == 'inactive').map((post) => (
                    post.status === 'inactive'  && (<div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>)
                ))}
            </div>
            </>
            )}
        </Container>
    </div>
  )
}

export default Home