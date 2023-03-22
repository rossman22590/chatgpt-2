import { Conversation } from "@/types";
import { IconCheck, IconMessage, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import { FC, KeyboardEvent, useEffect, useState } from "react";

interface Props {
    loading: boolean;
    conversations: Conversation[];
    selectedConversation: Conversation;
    onSelectConversation: (conversation: Conversation) => void;
    onDeleteConversation: (conversation: Conversation) => void;
    onRenameConversation: (conversation: Conversation, name: string) => void;
}

export const Conversations: FC<Props> = ({ loading, conversations, selectedConversation, onSelectConversation, onDeleteConversation, onRenameConversation }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState("");

    const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleRename(selectedConversation);
        }
    };

    const handleRename = (conversation: Conversation) => {
        onRenameConversation(conversation, renameValue);
        setRenameValue("");
        setIsRenaming(false);
    };

    useEffect(() => {
        if (isRenaming) {
            setIsDeleting(false);
        } else if (isDeleting) {
            setIsRenaming(false);
        }
    }, [isRenaming, isDeleting]);

    return (
        <div className="flex flex-col-reverse gap-1 w-full pt-2">
            {conversations.map((conversation, index) => (
                <button
                    key={index}
                    className={`flex gap-3 items-center p-3 text-sm rounded-lg hover:bg-[#343541]/90 transition-colors duration-200 cursor-pointer ${loading ? "disabled:cursor-not-allowed" : ""} ${selectedConversation.id === conversation.id ? "bg-[#343541]/90" : ""}`}
                    onClick={() => onSelectConversation(conversation)}
                    disabled={loading}
                >
                    <IconMessage
                        className=""
                        size={16}
                    />

                    {isRenaming && selectedConversation.id === conversation.id ? (
                        <input
                            className="flex-1 bg-transparent border-b border-neutral-400 focus:border-neutral-100 text-left overflow-hidden overflow-ellipsis pr-1 outline-none text-white"
                            type="text"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={handleEnterDown}
                            autoFocus
                        />
                    ) : (
                        <div className="overflow-hidden whitespace-nowrap overflow-ellipsis pr-1 flex-1 text-left">{conversation.name}</div>
                    )}

                    {(isDeleting || isRenaming) && selectedConversation.id === conversation.id && (
                        <div className="flex gap-1 -ml-2">
                            <IconCheck
                                className="min-w-[20px] text-neutral-400 hover:text-neutral-100"
                                size={16}
                                onClick={(e) => {
                                    e.stopPropagation();

                                    if (isDeleting) {
                                        onDeleteConversation(conversation);
                                    } else if (isRenaming) {
                                        handleRename(conversation);
                                    }

                                    setIsDeleting(false);
                                    setIsRenaming(false);
                                }}
                            />

                            <IconX
                                className="min-w-[20px] text-neutral-400 hover:text-neutral-100"
                                size={16}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDeleting(false);
                                    setIsRenaming(false);
                                }}
                            />
                        </div>
                    )}

                    {selectedConversation.id === conversation.id && !isDeleting && !isRenaming && (
                        <div className="flex gap-1 -ml-2">
                            <IconPencil
                                className="min-w-[20px] text-neutral-400 hover:text-neutral-100"
                                size={18}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsRenaming(true);
                                    setRenameValue(selectedConversation.name);
                                }}
                            />

                            <IconTrash
                                className=" min-w-[20px] text-neutral-400 hover:text-neutral-100"
                                size={18}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDeleting(true);
                                }}
                            />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};