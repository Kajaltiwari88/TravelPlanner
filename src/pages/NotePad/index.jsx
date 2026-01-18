import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import notepadBg from "../../assets/images/note.png";
import AppModal from "../../ReusableComponent/AppModal";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/auth";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const NotesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [noteId, setNoteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location?.state) {
      setContent(location?.state?.content || "");
      setName(location?.state?.name || "");
      setNoteId(location?.state?.noteId || null);
    }
  }, [location?.state]);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please login to save notes");
      return;
    }

    try {
      if (noteId) {
        await updateDoc(doc(db, "notes", noteId), {
          name,
          content,
        });
        toast.success("Note updated successfully");
      } else {
        await addDoc(collection(db, "notes"), {
          userId: user?.uid,
          name,
          content,
          createdAt: new Date(),
        });
        toast.success("Note saved successfully");
      }

      setName("");
      setContent("");
      setNoteId(null);
      setShowModal(false);
      navigate("/notes/saved");
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-(--bg-primary)
        px-4 py-8
        bg-no-repeat bg-cover bg-center
      "
      style={{
        backgroundImage: `url(${notepadBg})`,
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-black">📝 Notes</h1>
          <p className="text-sm text-[#475569]">
            Write freely and save when you're ready
          </p>
        </div>

        <div className="rounded-xl shadow-xl w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write anything here…"
            className="
              w-full h-[700px]
              bg-transparent
              resize-none
              px-8 pt-20 pb-6
              text-[18px] leading-7
              text-[#2b2b2b]
              placeholder-[#6b6b6b]
              font-[Inter]
              focus:outline-none
            "
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          disabled={!content?.trim()}
          className="
            bg-(--primary)
            text-(--btn-primary-text)
            px-6 py-2
            rounded-lg
            disabled:opacity-50
            cursor-pointer
          "
        >
          {noteId ? "Update Note" : "Save Note"}
        </button>
      </div>

      <AppModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Enter name for your note"
        isInputRequired
        inputVal={name}
        handleInputChange={(e) => setName(e?.target?.value)}
        primaryText={noteId ? "Update" : "Save"}
        onPrimary={handleSave}
      />
    </div>
  );
};

export default NotesPage;
