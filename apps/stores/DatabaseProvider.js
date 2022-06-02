import React, { createContext, useState, useEffect, useContext } from 'react';
// import publicIP from 'react-native-public-ip';
// import DeviceInfo from 'react-native-device-info';
// import firestore from '@react-native-firebase/firestore';
// import { AuthContext } from './AuthProvider';
import { db } from './firebase';

export const DatabaseContext = createContext();


/**
 * Structured of firestore is: collection->documents->collection->documents->....
 * 
 * + userData(collection):
 *     id:  - username: string
 *          - mail: string
 *          + chatSess(collection):
 *              roomName: - roomID: reference
 *                        - lastMess: string
 *                        - lastActive: number (e.g Date.now())
 * + rooms(collection):
 *      roomID: - ids: array of string (username of chat rooms' member)
 *              - type: string ('direct' or 'group')
 *              + messages(collection):
 *                  messID: - content: string (content of message)
 *                          - time: number
 *                          - sender: string (username of sender)
 *              
 */


export default function DatabaseProvider({ children }) {
     const [userData, setUserData] = useState(null);
     const [chatRooms, setChatRooms] = useState([]);
     const [curRoomUser, setCurRoomUser] = useState(null);
     const [curRoom, setCurRoom] = useState(null);
     const [roomMessages, setRoomMessages] = useState([]);
 
    //  const { user } = useContext(AuthContext);
     const userId = 'dX9ZvQamAIhcI3EhwU6dpxs3xMj1';
   
     useEffect(() => {
         if (userId==undefined) return;
 
         const userDB = db.collection('users').doc(userId);
 
         const subscriber = userDB.onSnapshot(documentSnapshot => {
             console.log('User data: ', documentSnapshot.data());
             setUserData(documentSnapshot.data());
         });
 
         const subcriber2= userDB.collection('chatSess').orderBy('lastActive','desc').limit(30).onSnapshot(querySnapshot => {
                 console.log('Total chat rooms: ', querySnapshot.size);
                 const tmp=[];
                 querySnapshot.forEach(documentSnapshot => {
                     const roomdata={...documentSnapshot.data(),roomName:documentSnapshot.id,roomRef:documentSnapshot.ref};
                     tmp.push(roomdata)
                 });
                 console.log('chatRooms: ', tmp);
                 setChatRooms(tmp);
           });
         return () => {
             subscriber();
             subcriber2();
         }
     }, [userId]);
 
 
     
     useEffect(() => {
         if (userId==undefined || curRoomUser==null) return;
 
         const subscriber = curRoomUser['roomID'].onSnapshot(documentSnapshot => {
             console.log('Room data: ',documentSnapshot.data())
             setCurRoom(documentSnapshot.data());
         });
 
         const subcriber2=curRoomUser['roomID'].collection('messages').orderBy('lastActive','desc').limit(30).onSnapshot(querySnapshot => {
             console.log('Total message: ', querySnapshot.size);
             const tmp=[];
             querySnapshot.forEach(documentSnapshot => {
                 console.log('Message: ', documentSnapshot.data());
                 tmp.push(documentSnapshot.data());
             });
             setRoomMessages(tmp);
           });
         return () => {
             subscriber();
             subcriber2();
         }
 
     }, [curRoomUser,userId]);
 
         
     function pushMessageHandler(mess) {
         if (curRoom==null || userId==undefined) return;
 
         const chatSessRef = curRoomUser['roomRef'];
         const newMessRef = curRoomUser['roomID'].collection('messages').doc();
 
         const batch = db.batch();
         console.log(chatSessRef)
         batch.update(chatSessRef,{'lastMess':mess.content,'lastActive':mess.time});
         batch.set(newMessRef,{'content':mess.content,'time':mess.time,'sender':userData.username});
 
         return batch.commit();
     }
 
     function addChatRoomHandler(name,type,listId) {
         const roomID = db.collection('rooms').doc();
         const batch = db.batch();
         if (type!='direct'){
             listId.forEach((v)=>{
                 batch.set(db.collection('users').doc(v).collections('chatSess').doc(name),{
                     roomID:roomID
                 });
             })
         }
         else {
             batch.set(db.collection('users').doc(v).collections('chatSess').doc(listId[1]),{
                 roomID:roomID
             });
             batch.set(db.collection('users').doc(v).collections('chatSess').doc(listId[0]),{
                 roomID:roomID
             });
         }
         batch.set(roomID,{ids:listId,type:type});
 
         return batch.commit();
     }
 
     const context = {
         userData: userData,
         roomMessages:roomMessages,
         chatRooms: chatRooms,
         curRoom: curRoom,
         curRoomUser: curRoomUser,
         setCurRoomUser: setCurRoomUser,
         pushMessage: pushMessageHandler,
         addChatRoom: addChatRoomHandler
         
     }
     return (
         <DatabaseContext.Provider
             value={context}
         >
             {children}
         </DatabaseContext.Provider>
     );
 }
 