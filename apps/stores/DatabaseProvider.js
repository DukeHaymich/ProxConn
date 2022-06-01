import React, { createContext, useState, useEffect, useContext } from 'react';
// import publicIP from 'react-native-public-ip';
// import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthProvider';
import { Alert } from 'react-native';

export const DatabaseContext = createContext();
/***
 * users:
 *      -mail, name....
 *      
 */
export default function DatabaseProvider({ children }) {
    const [userData, setUserData] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [curRoomUser, setCurRoomUser] = useState(null);
    const [curRoom, setCurRoom] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    const { user } = useContext(AuthContext);
    const userId = user?.uid;
  
    useEffect(() => {
        if (userId==null) return;

        const userDB = firestore().collection('users').doc(userId);

        const subscriber = userDB.onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
            setUserData(documentSnapshot.data());
        });

        const subcriber2= userDB.collection('chatSess').onSnapshot(querySnapshot => {
                console.log('Total chat rooms: ', querySnapshot.size);
                const tmp=[];
                querySnapshot.forEach(documentSnapshot => {
                    const roomdata={...documentSnapshot.data(),roomName:documentSnapshot.id,roomRef:documentSnapshot.ref};
                    tmp.push(roomdata)
                    setCurRoomUser(roomdata);
                });
                setChatRooms(tmp);
          });
        return () => {
            subscriber();
            subcriber2();
        }
    }, [userId]);


    
    useEffect(() => {
        if (userId==null || curRoomUser==null) return;

        const subscriber = curRoomUser['roomID'].onSnapshot(documentSnapshot => {
            console.log('Room data: ',documentSnapshot.data())
            setCurRoom(documentSnapshot.data());
        });

        const subcriber2=curRoomUser['roomID'].collection('messages').onSnapshot(querySnapshot => {
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
        if (curRoom==null || userId==null) return;

        const chatSessRef = curRoomUser['roomRef'];
        const newMessRef = curRoomUser['roomID'].collection('messages').doc();

        const batch = firestore().batch();
        batch.update(chatSessRef,{'lastMess':mess.content,'lastActive':mess.time});
        batch.set(newMessRef,{'content':mess.content,'time':mess.time,'sender':userData.username});

        return batch.commit();
    }

    function addChatRoomHandler(name,type,listId) {
        const roomID = firestore().collection('rooms').doc();
        const batch = firestore().batch();
        if (type!='direct'){
            listId.forEach((v)=>{
                batch.set(firestore().collection('users').doc(v).collections('chatSess').doc(name),{
                    roomID:roomID
                });
            })
        }
        else {
            batch.set(firestore().collection('users').doc(v).collections('chatSess').doc(listId[1]),{
                roomID:roomID
            });
            batch.set(firestore().collection('users').doc(v).collections('chatSess').doc(listId[0]),{
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
        setCurRoom: setCurRoom,
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
