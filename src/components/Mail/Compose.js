import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from '../card/Card';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from 'react-bootstrap';
import './Compose.css';
import Context from '../store/Context';

const Compose = () => {
    const ctx = useContext(Context);
    const recepMailRef = useRef('');
    const subjectRef = useRef('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    // const [creationTime, setCreationTime] = useState(new Date());

    // useEffect(() => {
    //     setCreationTime(new Date());
    // }, []);

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const getContent = () => {
        const contentState = editorState.getCurrentContent();
        const contentText = contentState.getPlainText();
        console.log(contentText);
        const recipientMail = recepMailRef.current.value
        const creationTime = new Date();
        const mailData = {
            senderMail: ctx.userMail,
            recipientMail: recipientMail,
            subject: subjectRef.current.value,
            message: contentText,
            isRead: false,
            date: creationTime
        };

        ctx.sendMail(mailData);
    };

  return (
    <div className='compose-container'>
        <Card>
            <form>
                <div className='input-boxes'>
                    <input placeholder="Enter recipient's emailId" ref={recepMailRef}></input>
                    <input placeholder='Enter Subject' ref={subjectRef} />
                </div>
                <div className='editor'>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        placeholder='Enter a message...'
                    />
                </div>
                <div className='compose-button'>
                <Button onClick={getContent} variant="primary">Send</Button>
                </div>
            </form>
        </Card>
    </div>
  )
}

export default Compose