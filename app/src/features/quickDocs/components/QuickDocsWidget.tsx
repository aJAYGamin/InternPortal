import Card from "@components/Card";
import CardHeader from "@components/CardHeader";
import DocEntry from "./DocEntry";
import PostDocButton from "./PostDocButton";
import PostDocForm from "./PostDocForm";
import { usePostDoc } from "../hooks";
import type { DocStore } from "../types";

interface QuickDocsWidgetProps {
  docStore: DocStore;
  onExpand?: () => void;
  onClose?: () => void;
}

/**
 * Renders the quick docs widget, includes:
 * - Add document button & form
 * - Document list
 */
export default function QuickDocsWidget({ docStore, onExpand, onClose }: QuickDocsWidgetProps) {
  const { docs, addDoc } = docStore;
  const postDocForm = usePostDoc();

  function post() {
    const { title, url, type } = postDocForm;

    // stop the post function when the new document is invalid
    if (!addDoc(title, url, type)) return;

    // resets the form if the new document is valid
    postDocForm.reset();
  }

  return (
    <Card>
      <CardHeader
        title="Quick Docs"
        onExpand={onExpand}
        onClose={onClose}
        action={<PostDocButton isFormOpen={postDocForm.composing} setFormOpen={postDocForm.setComposing} />}
      />

      {postDocForm.composing && (
        <PostDocForm
          title={postDocForm.title}
          setTitle={postDocForm.setTitle}
          url={postDocForm.url}
          setUrl={postDocForm.setUrl}
          type={postDocForm.type}
          setType={postDocForm.setType}
          post={post}
        />
      )}

      <div style={{ padding: "0 20px 18px", display: "flex", flexDirection: "column", gap: 2 }}>
        {docs.length === 0 ? (
          <div
            style={{
              padding: "24px 0",
              textAlign: "center",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 14,
              color: "#1A1A1A",
              opacity: 0.45,
            }}>
            No documents yet — add one above
          </div>
        ) : (
          docs.map((doc) => <DocEntry key={doc.id} doc={doc} />)
        )}
      </div>
    </Card>
  );
}
