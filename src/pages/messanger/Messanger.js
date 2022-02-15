import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../app/axios';
import { io } from 'socket.io-client';
import './messanger.css';
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';

const Messanger = () => {

    const { user } = useContext(AuthContext);
    const scrollRef = useRef(null);
    const socket = useRef();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        socket.current = io("ws://localhost:9001");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, [])

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(user?.following.filter(f => users.some(
                u => u.userId === f
            )));
        })
    }, [user])

    useEffect(() => {
        arrivalMessage && 
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(`/conversations/${user._id}`);
                setConversations(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getConversations()
    }, [user._id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(`/messages/${currentChat._id}`);
                setMessages(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        currentChat && getMessages();
    }, [currentChat])

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(member => member !== user._id)

        try {
            const response = await axios.post("/messages", message);
            setMessages([...messages, response.data]);
            socket.current.emit("sendMessage", {
                senderId: user._id,
                receiverId,
                text: newMessage
            })
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <Topbar />
            <div className='messanger'>

                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input 
                            placeholder='Search for friends'
                            className='chatMenuInput'
                        />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)} >
                                <Conversation 
                                    key={c._id}
                                    conversation={c}
                                    currentUser={user}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                    
                    {currentChat ? (
                        <>
                            <div className='chatBoxTop'>
                                {messages.map(m => (
                                    <Message 
                                        key={m._id}
                                        message={m}
                                        own={m.sender === user._id}
                                    />
                                ))}
                                <div ref={scrollRef} />
                            </div>

                            <div className='chatBoxBottom'>
                                <textarea
                                    className='chatMessageInput'
                                    placeholder='Write something...'
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                ></textarea>
                                <button 
                                    className='chatSubmitButton'
                                    onClick={handleSubmit}
                                >
                                    Send
                                </button>
                            </div>
                        </>
                    ) : (
                        <span className='noConversationText'>
                            Open a conversation to start a chat
                        </span>
                    )}

                    </div>
                </div>

                <div className='chatOnline'>
                    <div className='chatOnlineWrapper'>
                        <ChatOnline 
                            currentUserId={user?._id}
                            onlineUsers={onlineUsers}
                            setCurrentChat={setCurrentChat} 
                        />
                    </div>
                </div>

            </div>
        </>
    );
};

export default Messanger;
