import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router";
import Talk from 'talkjs';



function Chat(props) {

    let chat = undefined;
    let refContainer = useRef(null)
    useEffect(() => {

       // Promise can be `then`ed multiple times
       Talk.ready
       .then(() => {
           let userData = {
            id: props.user.id,
            name: props.user.name,
            email: props.user.email,
            welcomeMessage: "Hey there! How are you? :-)"
        }
            if (props.user.photo) {
                userData.photoUrl = props.user.photo
            }
           const me = new Talk.User(userData);

           if (!window.talkSession) {
               window.talkSession = new Talk.Session({
                   appId: "tyjb0JJP",
                   me: me
               });
           }
           let otherUserData = {
            id: props.otherUser.id,
            name: props.otherUser.name,
            email: props.otherUser.email,
            welcomeMessage: "Hey there! Love to chat :-)"
        };
        if (props.otherUser.photo) {
            otherUserData.photoUrl = props.otherUser.photo
        }
           const other = new Talk.User(otherUserData);


           // You control the ID of a conversation. oneOnOneId is a helper method that generates
           // a unique conversation ID for a given pair of users. 
           const conversationId = Talk.oneOnOneId(me, other);
       
           const conversation = window.talkSession.getOrCreateConversation(conversationId);
           conversation.setParticipant(me);
           conversation.setParticipant(other);
       
           chat = window.talkSession.createPopup(conversation, {
               keepOpen: false, 

           });
           console.log("refContainer:", refContainer)
           chat.mount(refContainer.current);

       })
       .catch(e => console.error(e));
       return function cleanUp() {
        if (chat) {
            chat.destroy();
        }
    }

    }, [props]);
    return(
        <span>
            <div ref={c => refContainer = c}>   </div>
        </span>
    )
}


export default Chat;