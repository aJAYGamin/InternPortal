import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import AnnouncementsWidget from "./features/announcements/components/AnnouncementsWidget";
import HoursLogWidget from "./features/hoursLog/components/HoursLogWidget";
import Modal from "@components/Modal";
import { useAnnouncements } from "./features/announcements/hooks";
import { useHoursEntries } from "./features/hoursLog/hooks";
import TodoWidget from "./features/todo/components/TodoWidget";
import { INITIAL_TODOS } from "./features/todo/mockData";
import { useTodos } from "./features/todo/hooks";
import CalendarWidget from "./features/calendar/components/CalendarWidget";
import { useCalendarEvents } from "./features/calendar/hooks";
import { CALENDAR_EVENTS } from "./features/calendar/mockData";
import QuickDocsWidget from "./features/quickDocs/components/QuickDocsWidget";
import { useDocs } from "./features/quickDocs/hooks";
import { QUICK_DOCS } from "./features/quickDocs/mockData";

type ExpandedPanel = "todo" | "calendar" | "announcements" | "links" | "docs" | "dms" | "hours" | null;

function App() {
  const [count, setCount] = useState(0);
  const [expanded, setExpanded] = useState<ExpandedPanel>(null);
  const { anns, pushAnn, openIds, toggleBody, deleteAnn } = useAnnouncements();
  const { entries, addEntries } = useHoursEntries();
  const todoStore = useTodos(INITIAL_TODOS);
  const calendarStore = useCalendarEvents(CALENDAR_EVENTS);
  const docStore = useDocs(QUICK_DOCS);

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <AnnouncementsWidget
            onExpand={() => setExpanded("announcements")}
            anns={anns}
            pushAnn={pushAnn}
            openIds={openIds}
            toggleBody={toggleBody}
            deleteAnn={deleteAnn}
          />
          <TodoWidget todoStore={todoStore} onExpand={() => setExpanded("todo")} />
          <HoursLogWidget entries={entries} addEntries={addEntries} onExpand={() => setExpanded("hours")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <CalendarWidget calendarStore={calendarStore} onExpand={() => setExpanded("calendar")} />
          {/* <DmsWidget onExpand={() => setExpanded("dms")} /> */}
          <QuickDocsWidget docStore={docStore} onExpand={() => setExpanded("docs")} />
        </div>
      </div>

      {expanded === "announcements" && (
        <Modal onClose={() => setExpanded(null)}>
          <AnnouncementsWidget
            onClose={() => setExpanded(null)}
            anns={anns}
            pushAnn={pushAnn}
            openIds={openIds}
            toggleBody={toggleBody}
            deleteAnn={deleteAnn}
          />
        </Modal>
      )}

      {expanded === "hours" && (
        <Modal onClose={() => setExpanded(null)}>
          <HoursLogWidget entries={entries} addEntries={addEntries} onClose={() => setExpanded(null)} />
        </Modal>
      )}

      {expanded === "calendar" && (
        <Modal onClose={() => setExpanded(null)}>
          <CalendarWidget calendarStore={calendarStore} onClose={() => setExpanded(null)} />
        </Modal>
      )}

      {expanded === "docs" && (
        <Modal onClose={() => setExpanded(null)}>
          <QuickDocsWidget docStore={docStore} onClose={() => setExpanded(null)} />
        </Modal>
      )}

      {expanded === "todo" && (
        <Modal onClose={() => setExpanded(null)}>
          <TodoWidget todoStore={todoStore} onClose={() => setExpanded(null)} />
        </Modal>
      )}
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button type="button" className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
