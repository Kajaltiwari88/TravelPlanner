import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import dayjs from "dayjs";
import AppCard from "../../../ReusableComponent/ReusableCards";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase/auth";
import AppShimmer from "../../../ReusableComponent/ReusableShimmer";
import { useNavigate } from "react-router-dom";
import AppModal from "../../../ReusableComponent/AppModal";
import toast from "react-hot-toast";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchNotes = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "notes"),
          where("userId", "==", user?.uid),
        );

        const snapshot = await getDocs(q);

        const data = snapshot?.docs?.map((docSnap) => ({
          id: docSnap?.id,
          ...docSnap?.data(),
        }));

        setNotes(data || []);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  const handleEdit = (note) => {
    navigate("/notes", {
      state: {
        noteId: note?.id,
        name: note?.name,
        content: note?.content,
      },
    });
  };

  const openDeleteModal = (noteId) => {
    setSelectedNoteId(noteId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedNoteId) return;

    try {
      await deleteDoc(doc(db, "notes", selectedNoteId));
      toast.success("Note Delete Successfully!");
      setNotes((prev) => prev?.filter((note) => note?.id !== selectedNoteId));
    } catch (error) {
      toast.error("Failed to delete note!");
    } finally {
      setShowModal(false);
      setSelectedNoteId(null);
    }
  };

  if (!user) {
    return (
      <div className="p-10 text-center text-(--text-secondary)">
        Please login to view your saved notes.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-(--text-primary)">
          📄 Saved Notes
        </h1>
        <p className="text-md text-(--text-secondary)">
          All notes you've saved
        </p>
      </div>

      {loading && <AppShimmer />}

      {!loading && notes?.length === 0 && (
        <p className="text-sm text-(--text-secondary)">
          You haven't saved any notes yet.
        </p>
      )}

      <div className="grid gap-4">
        {notes?.map((note) => (
          <AppCard
            key={note?.id}
            title={note?.name}
            subtitle={
              note?.content
                ? `${note?.content?.slice(0, 80)}${
                    note?.content?.length > 80 ? "…" : ""
                  }`
                : "No content"
            }
            rightContent={
              note?.createdAt ? (
                <span className="text-xs text-(--text-secondary)">
                  {dayjs(note?.createdAt?.toDate?.()).format("DD MMM YYYY, hh:mm:ss")}
                </span>
              ) : null
            }
            menuItems={[
              {
                label: "✏️ Edit",
                onClick: () => handleEdit(note),
              },
              {
                label: "❌ Delete",
                onClick: () => openDeleteModal(note?.id),
              },
            ]}
          />
        ))}
      </div>

      <AppModal
        open={showModal}
        title="Are you sure you want to delete this note?"
        primaryText="Delete"
        danger={"true"}
        onClose={() => setShowModal(false)}
        onPrimary={confirmDelete}
      />
    </div>
  );
};

export default SavedNotes;
