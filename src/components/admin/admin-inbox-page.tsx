"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  useGetAdminMessageThreadQuery,
  useListAdminMessagesQuery,
  useReplyToAdminMessageMutation,
  useUpdateAdminMessageMutation,
} from "@/features/admin/admin-messages-api";
import { getApiErrorMessage } from "@/lib/store/api-error";

const inboxFilters = ["All messages", "Contact Us", "Advertising"] as const;
type InboxFilter = (typeof inboxFilters)[number];

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const threadDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function AdminInboxPage() {
  const [filter, setFilter] = useState<InboxFilter>("All messages");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const { data, isLoading, isError, refetch } = useListAdminMessagesQuery({ limit: 100 });
  const [replyToMessage, { isLoading: isReplying }] = useReplyToAdminMessageMutation();
  const [updateMessage, { isLoading: isUpdating }] = useUpdateAdminMessageMutation();

  const messages = useMemo(() => data?.items ?? [], [data]);

  const filteredMessages = useMemo(() => {
    if (filter === "All messages") return messages;
    if (filter === "Advertising") return messages.filter((message) => message.category === "ADVERTISE");
    return messages.filter((message) => message.category !== "ADVERTISE");
  }, [filter, messages]);

  const selectedMessage =
    filteredMessages.find((message) => message.id === selectedId) ?? filteredMessages[0];

  function selectFilter(next: InboxFilter) {
    setFilter(next);
    setSelectedId(null);
    setReply("");
  }

  function selectMessage(id: string) {
    setSelectedId(id);
    setReply("");
  }

  async function handleSendReply() {
    if (!selectedMessage || !reply.trim()) return;
    try {
      await replyToMessage({ id: selectedMessage.id, body: reply.trim() }).unwrap();
      toast.success("Reply sent");
      setReply("");
    } catch (error) {
      toast.error("Couldn't send reply", { description: getApiErrorMessage(error) });
    }
  }

  async function handleToggleResolved() {
    if (!selectedMessage) return;
    try {
      await updateMessage({ id: selectedMessage.id, resolved: !selectedMessage.resolved }).unwrap();
    } catch (error) {
      toast.error("Couldn't update message", { description: getApiErrorMessage(error) });
    }
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-0">
      <div className="border-b border-ae-border pb-5">
        <Heading level="page">Inbox &amp; Messages</Heading>
        <p className="mt-2 text-[14.5px] text-ae-muted">
          Contact Us submissions and advertising inquiries.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.25fr]">
        <section className="overflow-hidden rounded-[20px] border border-ae-border bg-white">
          <div className="flex flex-wrap gap-2 border-b border-ae-border px-[26px] py-[16px]">
            {inboxFilters.map((item) => {
              const active = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectFilter(item)}
                  className={`rounded-full border px-[13px] py-[8px] text-[12.5px] transition-colors ${
                    active
                      ? "border-foreground bg-foreground font-semibold text-white"
                      : "border-ae-border bg-white text-[#4D4D4D]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <div className="h-[240px] animate-pulse bg-[#F5F5F5]" />
          ) : isError ? (
            <div className="px-[26px] py-10 text-center">
              <p className="text-[14.5px] text-ae-muted">Couldn&apos;t load messages.</p>
              <Button variant="secondary" size="sm" className="mt-3" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="px-[26px] py-10 text-center text-[14.5px] text-ae-muted">
              No messages in this view.
            </div>
          ) : (
            <div>
              {filteredMessages.map((message) => (
                <button
                  key={message.id}
                  type="button"
                  onClick={() => selectMessage(message.id)}
                  className={`block w-full border-b border-[#F1F1F1] px-[26px] py-[18px] text-left last:border-b-0 ${
                    selectedMessage?.id === message.id ? "bg-[#F7F3EC]" : "bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-foreground">
                        {message.fromName}
                      </p>
                      <p className="truncate text-[13.5px] leading-[1.55] text-[#666666]">
                        {message.subject}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex rounded-full border border-[#E2DDD5] bg-[#F6F2EC] px-[9px] py-1 text-[10.5px] font-medium text-[#5B5B5B]">
                          {message.reasonLabel ?? message.category}
                        </span>
                        {message.resolved ? (
                          <span className="inline-flex rounded-full bg-foreground px-[8px] py-1 text-[10px] font-bold text-white">
                            RESOLVED
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <span className="text-[11.5px] text-ae-muted">
                      {dateFormatter.format(new Date(message.createdAt))}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
          {selectedMessage ? (
            <>
              <p className="text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
                {(selectedMessage.reasonLabel ?? selectedMessage.category).toUpperCase()}
              </p>
              <Heading level="card" as="h3" className="mt-3">
                {selectedMessage.subject}
              </Heading>
              <p className="mt-3 text-[14px] text-ae-muted">
                {selectedMessage.fromName} · {selectedMessage.fromEmail} ·{" "}
                {dateFormatter.format(new Date(selectedMessage.createdAt))}
              </p>

              <MessageThreadView
                threadId={selectedMessage.id}
                fromName={selectedMessage.fromName}
              />

              <div className="mt-5 border-t border-ae-border pt-5">
                <label className="block">
                  <span className="mb-3 block text-[13px] font-semibold text-[#303030]">
                    Reply
                  </span>
                  <textarea
                    rows={5}
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder={`Write a reply — it sends to ${selectedMessage.fromEmail}.`}
                    className="min-h-[103px] w-full rounded-[12px] border border-ae-border px-4 py-3 text-[14px] text-foreground outline-none placeholder:text-[#9A9A9A]"
                  />
                </label>

                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <Button
                    size="sm"
                    onClick={handleSendReply}
                    disabled={isReplying || !reply.trim()}
                  >
                    {isReplying ? "Sending..." : "Send reply"}
                  </Button>
                  <button
                    type="button"
                    onClick={handleToggleResolved}
                    disabled={isUpdating}
                    className="rounded-[10px] border border-foreground bg-white px-4 py-1.5 text-[13.5px] font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {selectedMessage.resolved ? "Mark unresolved" : "Mark resolved"}
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

type MessageThreadViewProps = {
  threadId: string;
  fromName: string;
};

// Stacks every message in the thread (the original form submission, each
// admin reply, each user email reply) as chat-style bubbles — same theme
// tokens already used elsewhere on this page (bg-foreground/text-white for
// "us", the existing bg-[#F7F3EC] selected-row tint for "them") rather than
// introducing new colors.
function MessageThreadView({ threadId, fromName }: MessageThreadViewProps) {
  const { data, isLoading, isError } = useGetAdminMessageThreadQuery(threadId);
  const events = data?.events ?? [];

  if (isLoading) {
    return (
      <div className="mt-5 h-[160px] animate-pulse rounded-[12px] border-t border-ae-border bg-[#F5F5F5]" />
    );
  }

  if (isError) {
    return (
      <div className="mt-5 border-t border-ae-border pt-5 text-[14px] text-ae-muted">
        Couldn&apos;t load this conversation.
      </div>
    );
  }

  return (
    <div className="mt-5 max-h-[420px] space-y-4 overflow-y-auto border-t border-ae-border pt-5">
      {events.map((event) => {
        const isOutbound = event.direction === "OUTBOUND";
        return (
          <div key={event.id} className={`flex ${isOutbound ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-[14px] px-4 py-3 text-[14px] leading-[1.7] ${
                isOutbound ? "bg-foreground text-white" : "bg-[#F7F3EC] text-[#3A3A3A]"
              }`}
            >
              <div
                className={`mb-1 flex items-center justify-between gap-3 text-[11px] font-semibold tracking-[0.04em] ${
                  isOutbound ? "text-white/70" : "text-[#8A8071]"
                }`}
              >
                <span>{isOutbound ? (event.admin?.fullName ?? "Admin") : (event.senderName ?? fromName)}</span>
                <span className="whitespace-nowrap font-normal">
                  {threadDateTimeFormatter.format(new Date(event.createdAt))}
                </span>
              </div>
              <p className="whitespace-pre-line">{event.body}</p>
              {event.status === "FAILED" ? (
                <p className="mt-1.5 text-[11px] font-medium text-[#FFB4A8]">
                  Failed to send
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
