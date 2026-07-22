import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LocateIcon, Search, SendHorizonal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";

import Image from "next/image";

export default function ChatPage() {
  return (
    <section className="min-h-screen mx-45 my-7 grid grid-cols-[27.5%_45%_27.5%]">
      <Card className="rounded-xl py-5 px-7 rounded-tr-xl rounded-br-xl h-[90vh] ">
        <h1 className="mb-4 text-xl font-bold">Messages</h1>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Search messages"
            className="h-9 rounded-2xl pl-9 shadow-none focus-visible:border-(--brand-blue) focus-visible:ring-1 focus-visible:ring-(--brand-blue) bg-zinc-100"
          />
        </div>
        <div className="flex flex-row flex-1 gap-3 border-b-2 ">
          <div>
            <Image
              src="/favicon.ico"
              alt="Sasher"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p>Sasher</p>
          </div>
          <div>
            <Image
              src="/favicon.ico"
              alt="Sasher"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p>Sasher2</p>
          </div>
          <div>
            <Image
              src="/favicon.ico"
              alt="Sasher"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p>Sasher3</p>
          </div>
        </div>

        <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-zinc-100 mt-3">
          <Image
            src="/favicon.ico"
            alt="Sasher"
            width={50}
            height={50}
            className="rounded-full"
          />

          <div>
            <p className="font-medium">Sasher</p>
            <p className="text-sm text-zinc-500">Hey! How are you?</p>
          </div>
        </div>
      </Card>

      <Card className="flex h-[90vh] flex-col rounded-xl px-0">
        <div className="flex items-center gap-3 border-b-2 px-3 pb-2">
          <Image
            src="/favicon.ico"
            alt="Sasher"
            width={48}
            height={48}
            className="rounded-full"
          />

          <div>
            <h2 className="font-semibold">Sasher</h2>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex flex-col gap-5">
            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarImage src="/avatars/10.png" alt="@me" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble>
                  <BubbleContent>Deploying to prod real quick.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarImage src="/avatars/02.png" alt="@rabbit" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarImage src="/avatars/10.png" alt="@me" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble>
                  <BubbleContent>It&apos;s a one-line change.</BubbleContent>
                </Bubble>
                <MessageFooter>Delivered</MessageFooter>
              </MessageContent>
            </Message>
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarImage src="/avatars/02.png" alt="@rabbit" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <BubbleGroup>
                  <Bubble variant="muted">
                    <BubbleContent>
                      It&apos;s always a one-line change 😭.
                    </BubbleContent>
                  </Bubble>
                  <Bubble variant="muted">
                    <BubbleContent>Alright, let me take a look.</BubbleContent>
                    <BubbleReactions aria-label="Reactions: thumbs up">
                      <span>👍</span>
                    </BubbleReactions>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarImage src="/avatars/10.png" alt="@me" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble>
                  <BubbleContent>Deploying to prod real quick.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarImage src="/avatars/02.png" alt="@rabbit" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarImage src="/avatars/10.png" alt="@me" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble>
                  <BubbleContent>It&apos;s a one-line change.</BubbleContent>
                </Bubble>
                <MessageFooter>Delivered</MessageFooter>
              </MessageContent>
            </Message>
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarImage src="/avatars/02.png" alt="@rabbit" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <BubbleGroup>
                  <Bubble variant="muted">
                    <BubbleContent>
                      It&apos;s always a one-line change 😭.
                    </BubbleContent>
                  </Bubble>
                  <Bubble variant="muted">
                    <BubbleContent>Alright, let me take a look.</BubbleContent>
                    <BubbleReactions aria-label="Reactions: thumbs up">
                      <span>👍</span>
                    </BubbleReactions>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
            </Message>
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Type a message..."
              className="h-11 flex-1 rounded-full shadow-none focus-visible:border-(--brand-blue) focus-visible:ring-1 focus-visible:ring-(--brand-blue) bg-zinc-100 pl-7"
            />

            <Button
              size="icon"
              className="h-11 w-11 rounded-full bg-(--brand-maroon)"
            >
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="rounded-xl rounded-tr-xl rounded-br-xl p-7 h-[90vh] ">
        <div className="flex flex-col items-center border-b pb-6">
          <Image
            src="/logo.png"
            alt="Sasher"
            width={95}
            height={95}
            className="rounded-full"
          />

          <h2 className="mt-3 text-xl font-semibold">Sasher Gurung</h2>

          <p className="text-sm text-zinc-500">Frontend Developer</p>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-lg">About</h3>

          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <LocateIcon className="h-4 w-4" />
            <span>Lives in Pokhara</span>
          </div>

          <p className="text-sm text-zinc-600 bg-zinc-100 p-6 rounded-lg  ">
            This is Sasher. Passionate about building modern web applications
            with React and Next.js.
          </p>

          <Button variant="outline" className="w-full p-5 shadow-sm cursor-pointer">View Full Profile</Button>
        </div>
      </Card>
    </section>
  );
}
