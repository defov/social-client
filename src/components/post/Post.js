import React, { useContext, useEffect, useState } from 'react';
import './post.css';
import axios from '../../app/axios';
import TimeAgo from 'react-timeago';
import {
    MoreVert
} from '@material-ui/icons'

import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Post = ({post}) => {
    const PIF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext)
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState()
    const [user, setUser] = useState({})

    const likeHandler = () => {
        try {
            axios.put(`/posts/${post._id}/like`, {
                userId: currentUser._id
            });
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like-1 : like + 1)
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser();
    }, [post.userId]);

    return (
        <div className='post'>
            <div className='postWrapper'>
                <div className='postTop'>
                    <div className='postTopLeft'>
                        <Link to={`/profile/${user.username}`} replace>
                            <img
                                src={user?.profilePicture || `${PIF}/person/noAvatar.png`} 
                                className="postProfileImg" 
                                alt="" 
                            />
                        </Link>
                        <Link to={`/profile/${user.username}`} replace className='postUsername'>
                            {user?.username}
                        </Link>
                        <span className='postDate'>
                            <TimeAgo date={post.createdAt} />
                        </span> 
                    </div>
                    <div className='postTopRight'>
                        <MoreVert />
                    </div>
                </div>
                <div className='postCenter'>
                    <span className='postText'>{post.desc}</span>
                    {post.img && <img src={`${PIF}/${post.img}`} className="postImage" alt="" />}
                </div>
                <div className='postBottom'>
                    <div className='postBottomLeft'>
                        <img className="likeIcon" src={`${PIF}/like.png`} onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${PIF}/heart.png`} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people liked it</span>
                    </div>
                    <div className='postBottomRight'>
                        <span className="postCommentText">{post.comments?.length || 0} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
