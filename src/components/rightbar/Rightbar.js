import React, { useContext, useEffect, useState } from 'react';
import axios from '../../app/axios';
import './rightbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';

const Rightbar = ({ user }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);
    const {user: currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.following.includes(user?._id));

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios
                .get(`/users/friends/${user ? user._id : currentUser._id}`);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        }
        if(user || currentUser) {
            console.log(user, currentUser)
            currentUser && getFriends();
        }
    }, [currentUser, user]);
    
    const handleFollow = async () => {
        try {
            if(followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id
                })
                dispatch({ type: "UNFOLLOW", payload: user._id })
            } else {
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id
                })
                dispatch({ type: "FOLLOW", payload: user._id })
            }
            setFollowed(!followed)
        } catch (err) {
            console.log(err);
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        dispatch({ type: "LOGOUT" })
        navigate('/login', { replace: true });
    }

    const transformRelationship = (relationship) => {
        switch(relationship) {
            case 1:
                return "Single";
            case 2:
                return "In a relationship";
            case 3:
                return "Married";
            default:
                break;
        }
        return "-";
    }

    const HomeRightBar = () => (
        <>
            <div className='birthdayContainer'>
                <img className="birthdayImg" src={`${PF}/gift.png`} alt="" />
                <span className="birthdayText">
                    <b>Foo Bar</b>
                    {" "}
                    and 3 other fiends have birthday today!
                </span>
            </div>
            <img className="rightbarAd" src={`${PF}/ad.png`} alt="" />
            <h4 className="rightbarTitle">Online friends</h4>
            <ul className="rightbarFriendList">
                {friends && friends.map((u) => (
                    <OnlineUser key={u._id} user={u}/>
                ))}
            </ul>
        </>
    )
    
    const OnlineUser = ({ user }) => (
        <li>
            <Link to={`/profile/${user.username}`} replace className='rightbarFriend'>
                <div className="rightbarProfileImgContainer">
                    <img 
                        className="rightbarProfileImg" 
                        src={`${PF}/${user.profilePicture ? user.profilePicture : 'person/noAvatar.png'}`} 
                        alt="" 
                    />
                    <span className="rightbarOnline"></span>
                </div>
                <span className='rightbarUsername'>{user.username}</span>
            </Link>
        </li>
    )
    
    const ProfileRightBar = () => (
        <>
        {user.username === currentUser.username && (
            <button onClick={handleLogout} className='rightbarLogoutButton'>
                Logout
            </button>
        )}
        {user.username !== currentUser.username && (
            <button onClick={handleFollow} className='rightbarFollowButton'>
                {followed ? 'Unfollow' : 'Follow'}
                {followed ? <Remove /> : <Add />}
            </button>
        )}
            <h4 className='rightbarTitle'>User information</h4>
            <div className='rightbarInfo'>
                <div className='rightbarInfoItem'>
                    <span className='rightbarInfoKey'>City:</span>
                    <span className='rightbarInfoValue'>{user.city}</span>
                </div>
                <div className='rightbarInfoItem'>
                    <span className='rightbarInfoKey'>From:</span>
                    <span className='rightbarInfoValue'>{user.from}</span>
                </div>
                <div className='rightbarInfoItem'>
                    <span className='rightbarInfoKey'>Relationship:</span>
                    <span className='rightbarInfoValue'>{transformRelationship(user.relationship)}</span>
                </div>
            </div>
            <h4 className='rightbarTitle'>User friends</h4>
            <div className='rightbarFollowingContainer'>
                {friends && friends.map((u) => (
                    <RightbarFollowing key={u._id} user={u}/>
                ))}
            </div>
        </>
    )
    
    const RightbarFollowing = ({ user }) => (
        <Link to={`/profile/${user.username}`} replace className='rightbarFollowing'>
            <img className="rightbarFollowingImg" src={`${PF}/${user.profilePicture ? user.profilePicture : 'person/noAvatar.png'}`} alt="" />
            <span className='rightbarFollowingName'>{user.username}</span>
        </Link>
    )

    return (
        <div className='rightbar'>
            <div className='rightbarWrapper'>
                {user ? (
                    <ProfileRightBar user={user} friends={friends} />  
                ) : (
                    <HomeRightBar friends={friends} />
                )}
            </div>
        </div>
    )
};



export default Rightbar;
