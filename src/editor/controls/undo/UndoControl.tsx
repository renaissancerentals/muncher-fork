import React from "react";
import {EditorState} from 'draft-js';
import {EditorStateProps} from "../../RenaissanceEditor";
import {Button, Icon} from "@contentmunch/muncher-ui";

export const UndoControl: React.FC<EditorStateProps> = ({handleEditorStateChange, editorState}) => {

    return (
        <Button
            title="Undo"
            size="small"
            disabled={editorState.getUndoStack().size === 0}
            onMouseDown={() => {
                handleEditorStateChange(EditorState.undo(editorState));
            }}>
            <Icon name="undo"/>
        </Button>
    );
}