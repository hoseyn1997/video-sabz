import ProjectInfo from "./components/project_info";
import WhatsNew from "./components/whats_new";
import CreatorInfo from "./components/creator_info";
import Feedback from "./components/feedback";
import Feedbacks from "./components/feedbacks";

export default function Page() {
  return (
    <div className="relative mx-auto max-w-screen-minicontainer rtl p-2">
      <ProjectInfo />
      <CreatorInfo />
      <Feedback />
      <Feedbacks />
      <WhatsNew />
    </div>
  );
}
