import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, User, MessageSquare, ChevronLeft, Smile, Paperclip, Camera, Mic, Phone, Video } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react';
import { CallSignals } from './CallManager';

interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: any;
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: number;
  updatedAt: number;
}

interface DirectMessagesProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  conversations: Conversation[];
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ 
  isOpen, 
  onClose, 
  currentUser, 
  activeConversationId, 
  setActiveConversationId,
  conversations 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState<any>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [otherUserTyping, setOtherUserTyping] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const otherTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeConversationId) {
      setMessages([]);
      setOtherUser(null);
      return;
    }

    const q = query(
      collection(db, 'conversations', activeConversationId, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    // Fetch other user info
    const conv = conversations.find(c => c.id === activeConversationId);
    if (conv && currentUser) {
      const otherId = conv.participants.find(p => p !== currentUser.id);
      if (otherId) {
        getDoc(doc(db, 'users', otherId)).then(snap => {
          if (snap.exists()) setOtherUser(snap.data());
        });
      }
    }

    return () => unsubscribe();
  }, [activeConversationId, conversations, currentUser?.id]);

  // WebSocket for typing indicator
  useEffect(() => {
    if (!isOpen || !currentUser?.id) {
      if (wsRef.current) wsRef.current.close();
      return;
    }

    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout;

    const connect = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws-messaging?userId=${currentUser.id}&username=${encodeURIComponent(currentUser.username)}`;
      
      ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'private-typing') {
            if (otherUser && data.from === otherUser.id) {
              setOtherUserTyping(data.isTyping);
              
              if (data.isTyping) {
                if (otherTypingTimeoutRef.current) clearTimeout(otherTypingTimeoutRef.current);
                otherTypingTimeoutRef.current = setTimeout(() => {
                  setOtherUserTyping(false);
                }, 5000);
              }
            }
          }
        } catch (err) {
          console.error('Failed to parse WS message', err);
        }
      };

      ws.onclose = () => {
        reconnectTimer = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      if (ws) ws.close();
    };
  }, [isOpen, currentUser?.id, otherUser]);

  const sendTypingStatus = (typing: boolean) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && otherUser?.id) {
      wsRef.current.send(JSON.stringify({
        type: 'private-typing',
        to: otherUser.id,
        isTyping: typing
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      sendTypingStatus(true);
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      sendTypingStatus(false);
    }, 2000);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversationId) return;

    const text = newMessage;
    setNewMessage('');
    setIsTyping(false);
    sendTypingStatus(false);
    setShowEmojiPicker(false);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    try {
      await addDoc(collection(db, 'conversations', activeConversationId, 'messages'), {
        senderId: currentUser?.id,
        text,
        createdAt: serverTimestamp()
      });

      await updateDoc(doc(db, 'conversations', activeConversationId), {
        lastMessage: text,
        lastMessageAt: Date.now(),
        updatedAt: Date.now()
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-[#1C1B1B] border-l border-[#3A4A40]/30 z-[60] shadow-2xl flex flex-col"
      >
        <div className="px-4 py-3 border-b border-[#3A4A40]/20 flex items-center justify-between bg-[#141414] gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {activeConversationId && (
              <button onClick={() => setActiveConversationId(null)} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors shrink-0">
                <ChevronLeft className="w-5 h-5 text-outline" />
              </button>
            )}
            <h2 className="font-headline font-black text-primary tracking-tight text-base uppercase flex flex-col min-w-0">
              <span className="truncate">{activeConversationId ? (otherUser?.username || 'Signal') : 'Archives'}</span>
              {activeConversationId && otherUser && (
                <div className="h-4 -mt-0.5 truncate">
                  {otherUserTyping ? (
                    <div className="flex items-center gap-1">
                      <span className="flex gap-0.5 shrink-0">
                        <span className="w-0.5 h-0.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-0.5 h-0.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-0.5 h-0.5 bg-primary rounded-full animate-bounce"></span>
                      </span>
                      <span className="text-[7px] text-primary font-black tracking-widest lowercase opacity-70 truncate">typing...</span>
                    </div>
                  ) : (
                    <span className="text-[7px] text-outline/40 font-mono tracking-widest lowercase truncate">secure link active</span>
                  )}
                </div>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {activeConversationId && otherUser && (
              <>
                <button 
                  onClick={() => CallSignals.triggerCall(otherUser.id, 'audio')}
                  className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-outline hover:text-primary"
                  title="Audio Link"
                >
                  <Phone className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => CallSignals.triggerCall(otherUser.id, 'video')}
                  className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-outline hover:text-primary"
                  title="Video Link"
                >
                  <Video className="w-4.5 h-4.5" />
                </button>
              </>
            )}
            <button onClick={onClose} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
              <X className="w-5 h-5 text-outline" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {!activeConversationId ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {conversations.length === 0 ? (
                <div className="text-center py-20 text-outline font-label text-sm uppercase tracking-widest opacity-50">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  No conversations yet
                </div>
              ) : (
                conversations.map(conv => (
                  <ConversationItem 
                    key={conv.id} 
                    conv={conv} 
                    currentUserId={currentUser?.id} 
                    onClick={() => setActiveConversationId(conv.id)} 
                  />
                ))
              )}
            </div>
          ) : (
            <div 
              ref={scrollRef} 
              className="flex-1 p-3 md:p-4 space-y-3 h-full overflow-y-auto bg-surface/30 custom-scrollbar"
            >
              {messages.map(msg => {
                const isMe = msg.senderId === currentUser?.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                    {!isMe && (
                      otherUser?.profileImage ? (
                        <img src={otherUser.profileImage} alt={otherUser.username} className="w-6 h-6 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                          <User className="w-3 h-3 text-outline" />
                        </div>
                      )
                    )}
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm break-words ${
                      isMe 
                        ? 'bg-primary-container text-on-primary-container rounded-tr-none' 
                        : 'bg-surface-container-highest text-on-surface rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {activeConversationId && (
          <div className="px-3 py-3 border-t border-[#3A4A40]/20 bg-[#141414]">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-xl mx-auto">
              <div className="flex-1 flex items-center bg-surface-container-high border border-outline-variant/10 rounded-full px-2 py-1 shadow-inner relative">
                {showEmojiPicker && (
                  <div className="absolute bottom-full mb-4 left-0 z-50 shadow-2xl rounded-2xl overflow-hidden scale-90 sm:scale-100 origin-bottom-left">
                    <div className="fixed inset-0" onClick={() => setShowEmojiPicker(false)}></div>
                    <div className="relative">
                      <EmojiPicker 
                        onEmojiClick={handleEmojiClick}
                        theme={Theme.DARK}
                        width={280}
                        height={350}
                        skinTonesDisabled
                        searchPlaceHolder="Search..."
                      />
                    </div>
                  </div>
                )}
                <button 
                  type="button" 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`p-1.5 transition-all ${showEmojiPicker ? 'text-primary' : 'text-outline hover:text-on-surface'}`}
                >
                  <Smile className="w-5 h-5" />
                </button>
                <input 
                  value={newMessage}
                  onChange={handleInputChange}
                  placeholder="Message"
                  className="flex-1 bg-transparent border-none px-2 py-2 text-xs focus:outline-none transition-all font-body placeholder:text-outline/40"
                />
                <div className="flex items-center gap-0.5">
                  <button type="button" className="p-1.5 text-outline hover:text-on-surface transition-all">
                    <Paperclip className="w-5 h-5 -rotate-45" />
                  </button>
                  {!newMessage.trim() && (
                    <button type="button" className="p-1.5 text-outline hover:text-on-surface transition-all">
                      <Camera className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              <div className="shrink-0">
                {newMessage.trim() ? (
                  <button 
                    type="submit" 
                    className="w-10 h-10 bg-primary-container text-on-primary rounded-full flex items-center justify-center shadow-md hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Send className="w-4.5 h-4.5 fill-current ml-0.5" />
                  </button>
                ) : (
                  <button 
                    type="button"
                    className="w-10 h-10 bg-primary-container text-on-primary rounded-full flex items-center justify-center shadow-md hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Mic className="w-4.5 h-4.5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

interface ConversationItemProps {
  conv: Conversation;
  currentUserId: string;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conv, currentUserId, onClick }) => {
  const [otherUser, setOtherUser] = useState<any>(null);

  useEffect(() => {
    const otherId = conv.participants.find(p => p !== currentUserId);
    if (otherId) {
      getDoc(doc(db, 'users', otherId)).then(snap => {
        if (snap.exists()) setOtherUser(snap.data());
      });
    }
  }, [conv, currentUserId]);

  return (
    <div 
      onClick={onClick}
      className="p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-[#3A4A40]/20 group"
    >
      <div className="flex items-center gap-3">
        {otherUser?.profileImage ? (
          <img src={otherUser.profileImage} alt={otherUser.username} className="w-10 h-10 rounded-lg object-cover shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-primary-container/10 transition-colors">
            <User className="w-5 h-5 text-outline group-hover:text-primary-container" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-0.5">
            <h4 className="font-bold text-on-surface text-sm truncate">{otherUser?.username || 'Loading...'}</h4>
            <span className="text-[10px] text-outline font-mono">{conv.lastMessageAt ? new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
          </div>
          <p className="text-xs text-outline truncate opacity-70">{conv.lastMessage || 'Start a conversation'}</p>
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;
