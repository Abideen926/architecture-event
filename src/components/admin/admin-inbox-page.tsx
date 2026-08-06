"use client";

import { useMemo, useState } from "react";
import { adminInboxMessages } from "@/lib/admin/dashboard-data";

const inboxFilters = ["All messages", "Contact Us", "Advertising"] as const;
type InboxFilter = (typeof inboxFilters)[number];

export function AdminInboxPage() {
  const [filter, setFilter] = useState<InboxFilter>("All messages");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState(
    adminInboxMessages.map((message) => ({ ...message }))
  );

  const filteredMessages = useMemo(() => {
    if (filter === "All messages") return messages;
    return messages.filter((message) => message.kind === filter);
  }, [filter, messages]);

  const selectedMessage = filteredMessages[selectedIndex] ?? filteredMessages[0] ?? messages[0];

  function selectFilter(next: InboxFilter) {
    setFilter(next);
    setSelectedIndex(0);
  }

  function toggleResolved() {
    if (!selectedMessage) return;
    setMessages((current) =>
      current.map((message) =>
        message.from === selectedMessage.from && message.subject === selectedMessage.subject
          ? { ...message, resolved: !message.resolved }
          : message
      )
    );
  }

  return (
    <div className="space-y-4">
      <div className="border-b border-[#E8E3DB] pb-5">
        <h2 className="ae-serif text-[31px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
          Inbox & Messages
        </h2>
        <p className="mt-3 text-[14.5px] text-[#7A7A7A]">
          Contact Us submissions and advertising inquiries, delivered through SendGrid.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.15fr]">
        <section className="overflow-hidden rounded-[20px] border border-[#E3DED6] bg-white">
          <div className="flex flex-wrap gap-2 border-b border-[#EAE6DE] px-4 py-4">
            {inboxFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectFilter(item)}
                className={`inline-flex py-2 items-center rounded-full border px-[13px] text-[12.5px] transition-colors ${
                  filter === item
                    ? "border-[#232323] bg-[#232323] font-semibold text-white"
                    : "border-[#DDD8D0] bg-white text-[#4D4D4D]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div>
            {filteredMessages.map((message, index) => (
              <button
                key={`${message.from}-${message.subject}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`block w-full border-b border-[#EEE8E0] px-4 py-4 text-left last:border-b-0 ${
                  selectedMessage?.from === message.from &&
                  selectedMessage?.subject === message.subject
                    ? "bg-[#F7F3EC]"
                    : "bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-[#202020]">
                      {message.from}
                    </p>
                    <p className="truncate text-[13.5px] leading-[1.55] text-[#666666]">
                      {message.subject}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex py-1 items-center rounded-full border border-[#E2DDD5] bg-[#F6F2EC] px-[9px] text-[10.5px] font-medium text-[#5B5B5B]">
                        {message.shortTag}
                      </span>
                      {message.resolved ? (
                        <span className="inline-flex py-1 items-center rounded-full bg-[#232323] px-[8px] text-[10px] font-bold text-white">
                          RESOLVED
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <span className="text-[11.5px] text-[#7A7A7A]">{message.date}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[20px] border border-[#E3DED6] bg-white px-6 py-5">
          {selectedMessage ? (
            <>
              <p className="text-[10.5px] font-bold tracking-[0.15em] text-[#8A8A8A]">
                {selectedMessage.tag.toUpperCase()}
              </p>
              <h3 className="mt-3 ae-serif text-[23px] leading-[1.15] tracking-[-0.02em] text-[#202020]">
                {selectedMessage.subject}
              </h3>
              <p className="mt-3 text-[14px] text-[#7A7A7A]">
                {selectedMessage.from} · {selectedMessage.date}, 2026
              </p>

              <div className="mt-5 border-t border-[#EAE6DE] pt-5 text-[15px] leading-[1.95] text-[#5C5C5C]">
                {selectedMessage.body.map((paragraph) => (
                  <p key={paragraph} className="mb-5 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-5 border-t border-[#EAE6DE] pt-5">
                <label className="block">
                  <span className="mb-3 block text-[13px] font-semibold text-[#303030]">
                    Reply
                  </span>
                  <textarea
                    rows={5}
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder="Write a reply — it sends from hello@architectureevents.com."
                    className="min-h-[103px] w-full rounded-[12px] border border-[#DDD8D0] px-4 py-3 text-[14px] text-[#202020] outline-none placeholder:text-[#9A9A9A]"
                  />
                </label>

                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    className="inline-flex py-1.5 items-center justify-center rounded-[10px] bg-[#232323] px-4 text-[13.5px] font-semibold text-white"
                  >
                    Send reply
                  </button>
                  <button
                    type="button"
                    onClick={toggleResolved}
                    className="inline-flex py-1.5 items-center justify-center rounded-[10px] border border-[#232323] bg-white px-4 text-[13.5px] font-medium text-[#232323]"
                  >
                    Mark resolved
                  </button>
                  <button type="button" className="text-[13.5px] text-[#5F5F5F]">
                    Archive
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </section>
      </div>
    </div>
  );
}
