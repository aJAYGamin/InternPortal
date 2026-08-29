import Card from "@components/Card";
import CardHeader from "@components/CardHeader";
import { usePostAnnouncements } from "../hooks";
import PostAnnButton from "./PostAnnButton";
import PostAnnForm from "./PostAnnForm";
import AnnContent from "./AnnContent";
import type { Announcement } from "../types";

interface AnnouncementsWidgetProps {
  anns: Announcement[];
  pushAnn: (title: string, body: string, tag: string) => Announcement | null;
  openIds: Set<number>;
  toggleBody: (id: number) => void;
  deleteAnn: (id: number) => void;
  onExpand?: () => void;
  onClose?: () => void;
}

{
  /** Renders announcement tabs, include:
  - Create announcement button & form
  - Annoucement list
  */
}
export default function AnnouncementsWidget(props: AnnouncementsWidgetProps) {
  const { anns, pushAnn, openIds, toggleBody, deleteAnn, onExpand, onClose } = props;
  const postAnnsForm = usePostAnnouncements();

  function post() {
    const { title, body, tag } = postAnnsForm;

    const newAnns = pushAnn(title, body, tag);

    // stop the post function when the new announcement is invalid
    if (!newAnns) return;

    // resets the form if the new announcement is valid
    postAnnsForm.reset();
  }

  return (
    <Card>
      <CardHeader
        title="Announcements"
        count={anns.length}
        onExpand={onExpand}
        onClose={onClose}
        action={<PostAnnButton isFormOpen={postAnnsForm.composing} setFormOpen={postAnnsForm.setComposing} />}
      />

      {postAnnsForm.composing && (
        <PostAnnForm
          title={postAnnsForm.title}
          setTitle={postAnnsForm.setTitle}
          body={postAnnsForm.body}
          setBody={postAnnsForm.setBody}
          tag={postAnnsForm.tag}
          setTag={postAnnsForm.setTag}
          post={post}
        />
      )}

      <div>
        {anns.length === 0 && (
          <div
            style={{
              padding: "32px 20px",
              textAlign: "center",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 14,
              color: "#1A1A1A",
              opacity: 0.45,
            }}>
            You're all caught up — no announcements
          </div>
        )}
        {anns.map((ann) => (
          <AnnContent ann={ann} toggleAnnBody={toggleBody} deleteAnn={deleteAnn} openIds={openIds} />
        ))}
      </div>
    </Card>
  );
}
