"use client";

import { useMemo, useState } from "react";
import { adminInboxMessages } from "@/lib/admin/dashboard-data";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

const inboxFilters = ["All messages", "Contact Us", "Advertising"] as const;
type InboxFilter = (typeof inboxFilters)[number];

type InboxMessage = {
  from: string;
  subject: string;
  tag: string;
  shortTag: string;
  date: string;
  kind: string;
  resolved: boolean;
  body: readonly string[];
};

export function AdminInboxPage() {
  const [filter, setFilter] = useState<InboxFilter>("All messages");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState<InboxMessage[]>(
    adminInboxMessages.map((message) => ({ ...message })),
  );

  const filteredMessages = useMemo(() => {
    if (filter === "All messages") return messages;
    return messages.filter((message) => message.kind === filter);
  }, [filter, messages]);

  const selectedMessage =
    filteredMessages[selectedIndex] ?? filteredMessages[0] ?? messages[0];

  function selectFilter(next: InboxFilter) {
    setFilter(next);
    setSelectedIndex(0);
  }

  function toggleResolved() {
    if (!selectedMessage) return;
    setMessages((current) =>
      current.map((message) =>
        message.from === selectedMessage.from &&
        message.subject === selectedMessage.subject
          ? { ...message, resolved: !message.resolved }
          : message,
      ),
    );
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-0">
      <div className="border-b border-[#E7E7E7] pb-5">
        <Heading level="page">Inbox &amp; Messages</Heading>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Contact Us submissions and advertising inquiries, delivered through
          SendGrid.
        </p>
      </div>

      <div className="mt-5 rounded-[14px] border border-dashed border-[#E7E7E7] bg-[#FAFAFA] px-5 py-3 text-[13px] leading-[1.6] text-[#6A6A6A]">
        There&apos;s no messaging/contact-form model in the API yet — this page
        shows sample data and replies aren&apos;t actually sent anywhere.
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.25fr]">
        <section className="overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
          <div className="flex flex-wrap gap-2 border-b border-[#E7E7E7] px-[26px] py-[16px]">
            {inboxFilters.map((item) => {
              const active = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectFilter(item)}
                  className={`rounded-full border px-[13px] py-[8px] text-[12.5px] transition-colors ${
                    active
                      ? "border-[#1E1E1E] bg-[#1E1E1E] font-semibold text-white"
                      : "border-[#E7E7E7] bg-white text-[#4D4D4D]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div>
            {filteredMessages.map((message, index) => (
              <button
                key={`${message.from}-${message.subject}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`block w-full border-b border-[#F1F1F1] px-[26px] py-[18px] text-left last:border-b-0 ${
                  selectedMessage?.from === message.from &&
                  selectedMessage?.subject === message.subject
                    ? "bg-[#F7F3EC]"
                    : "bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-foreground">
                      {message.from}
                    </p>
                    <p className="truncate text-[13.5px] leading-[1.55] text-[#666666]">
                      {message.subject}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex rounded-full border border-[#E2DDD5] bg-[#F6F2EC] px-[9px] py-1 text-[10.5px] font-medium text-[#5B5B5B]">
                        {message.shortTag}
                      </span>
                      {message.resolved ? (
                        <span className="inline-flex rounded-full bg-[#1E1E1E] px-[8px] py-1 text-[10px] font-bold text-white">
                          RESOLVED
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <span className="text-[11.5px] text-[#6A6A6A]">
                    {message.date}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[20px] border border-[#E7E7E7] bg-white px-[26px] py-[26px]">
          {selectedMessage ? (
            <>
              <p className="text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                {selectedMessage.tag.toUpperCase()}
              </p>
              <Heading level="card" as="h3" className="mt-3">
                {selectedMessage.subject}
              </Heading>
              <p className="mt-3 text-[14px] text-[#6A6A6A]">
                {selectedMessage.from} · {selectedMessage.date}, 2026
              </p>

              <div className="mt-5 border-t border-[#E7E7E7] pt-5 text-[15px] leading-[1.95] text-[#5C5C5C]">
                {selectedMessage.body.map((paragraph) => (
                  <p key={paragraph} className="mb-5 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-5 border-t border-[#E7E7E7] pt-5">
                <label className="block">
                  <span className="mb-3 block text-[13px] font-semibold text-[#303030]">
                    Reply
                  </span>
                  <textarea
                    rows={5}
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder="Write a reply — it sends from hello@architectureevents.com."
                    className="min-h-[103px] w-full rounded-[12px] border border-[#E7E7E7] px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-[#9A9A9A]"
                  />
                </label>

                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <Button size="sm">Send reply</Button>
                  <button
                    type="button"
                    onClick={toggleResolved}
                    className="rounded-[10px] border border-[#1E1E1E] bg-white px-4 py-1.5 text-[13.5px] font-medium text-[#1E1E1E]"
                  >
                    Mark resolved
                  </button>
                  <Button variant="muted" size="text" className="text-[13.5px]">
                    Archive
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </section>
      </div>
    </div>
  );
}
