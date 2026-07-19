"use client";

import React, { useEffect, useState } from "react";
import { usePostStore } from "@/lib/stores/Posts/postStores";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCommentStore } from "@/lib/stores/Posts/commentStore";
import { Copy, Heart, MessageCircle, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { BiRepost } from "react-icons/bi";
import { useAuthStore } from "@/lib/stores/Auth/authStores";
import { useSetupProfileStore } from "@/lib/stores/EditProfile/setupProfileStore";
import { api } from "@/lib/api/config";
import { useCopyLinkStore } from "@/lib/stores/Posts/copyLinkStores";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRepostPostStore } from "@/lib/stores/Posts/repostPostStore";
import CommentPost from "./CommentPost";

export default function FeedPostContent() {
  const router = useRouter();
  const { setupProfile } = useSetupProfileStore();
  const { user } = useAuthStore();
  const { posts, handleLike, deletePost } = usePostStore();
  const [commentText, setCommentText] = useState("");
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const {
    fetchComment,
    addComment,
  } = useCommentStore();

  const { sharePost } = useRepostPostStore();

  const { fetchShareLink } = useCopyLinkStore();



  const handleCommentPost = async () => {
    if (!commentText.trim() || !activePostId) return;

    try {
      await addComment(activePostId, commentText);
      setCommentText("");
      fetchComment(activePostId);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const res = await api.delete(`/posts/${postId}`);
      console.log("Response:", res.data.deletedId);
      deletePost(res.data.deletedId);
      toast.success(res.data.message || "Post deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again");
    }
  };

  const handleCopyLink = async (postId: string) => {
    await fetchShareLink(postId);
    const { share_link } = useCopyLinkStore.getState().shareData!;

    await navigator.clipboard.writeText(share_link);
  };


  return posts.map((post) => (
    <div
      key={post.id}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between p-5">
        <div className="flex items-center gap-3">
          {post.author?.avatar ? (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={30}
              height={30}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--brand-maroon) text-lg font-bold text-white uppercase">
              {(post.author?.name || user?.name || "S")[0]}
            </div>
          )}

          <div>
            <Button
              onClick={() => router.push("/profile")}
              variant="link"
              className="font-semibold text-md text-zinc-900 p-0 cursor-pointer"
            >
              {post.author?.name || user?.name}
            </Button>

            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <span>{setupProfile?.profession || user?.profession}</span>
              <span>•</span>
              <span>{post.time}</span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-lg cursor-pointer p-2 transition hover:bg-zinc-100">
              •••
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>Edit Post</DropdownMenuItem>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <RiDeleteBin5Line className="" />
                    Delete Post
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-semibold">
                      Delete Post
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-md">
                      Are you sure you want to delete this post? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Yes, Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {post.content && (
        <p className="px-5 pb-4 whitespace-pre-wrap leading-7 text-zinc-700">
          {post.content}
        </p>
      )}

      {post.image && (
        <div className="border-y bg-zinc-100">
          <Image
            src={post.image}
            alt="Post"
            width={1200}
            height={800}
            className="max-h-[550px] w-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between px-5 py-3 text-sm text-zinc-500">
        {post.likes === 0 ? (
          <span>No Likes</span>
        ) : (
          <span className="flex gap-1 items-center">
            <span className="font-semibold text-zinc-400">{post?.likes}</span>
            <Heart className="h-4 w-4 text-red-600 fill-red-600" />
          </span>
        )}
        {post.commentsCount === 0 ? (
          <span>No comments</span>
        ) : (
          <span className="flex gap-1 items-center">
            <span className="font-semibold text-zinc-400">
              {post?.commentsCount} comments
            </span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 border-t">
        <button
          onClick={() => handleLike(post.id)}
          className="flex items-center justify-center gap-2 py-3 text-sm cursor-pointer font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-red-600"
        >
          <Heart
            className={`h-5 w-5 ${
              post.hasLiked
                ? "fill-red-500 text-red-500"
                : "fill-none text-zinc-600"
            }`}
          />
          Like
        </button>

        <div key={post.id} className="flex items-center justify-center">
          <Dialog
            onOpenChange={(open) => {
              if (open) {
                setActivePostId(post.id);
                fetchComment(post.id);
              } else {
                setActivePostId(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-13 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-red-600 cursor-pointer">
                <MessageCircle className="h-4 w-4" />
                Comment
              </button>
            </DialogTrigger>
            <DialogContent className="h-11/12 w-full flex">
              <div>
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.author.name}
                    width={700}
                    height={700}
                    priority
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex items-start w-full justify-between pt-3 pr-6">
                  <div className="flex items-center gap-2">
                    {post.author?.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={30}
                        height={30}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--brand-maroon) text-lg font-bold text-white uppercase">
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="flex flex-col">
                      <h3 className="font-semibold text-[17px] text-zinc-900">
                        {post.author?.name || user?.name}
                      </h3>

                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <span>{setupProfile?.profession || user?.profession}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-lg cursor-pointer p-2 transition hover:bg-zinc-100">
                        •••
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Edit Post</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              variant="destructive"
                              className="cursor-pointer"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <RiDeleteBin5Line className="" />
                              Delete Post
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-xl font-semibold">
                                Delete Post
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-md">
                                Are you sure you want to delete this post? This
                                action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                className="cursor-pointer"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                Yes, Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-3 w-full pt-2 mr-7">
                  {post.content && (
                    <p className="pb-4 text-sm text-zinc-600">{post.content}</p>
                  )}
                </div>
                <div className="h-full w-80 overflow-y-auto rounded-xl bg-zinc-50 mr-7 no-scrollbar">
                  <div>
                    <CommentPost postId={post.id} />
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="border-t mt-3 px-3 py-3">
                    <Field>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="cursor-pointer flex gap-1"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              post.hasLiked
                                ? "fill-red-500 text-red-500"
                                : "fill-none text-zinc-600"
                            }`}
                          />
                          Like
                        </button>
                        <Input
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment..."
                          className=" pl-4 bg-gray-50 focus-visible:ring-1 
                focus-visible:border-red-600 focus-visible:outline-none"
                        />

                        <button
                          onClick={handleCommentPost}
                          type="button"
                          className="font-semibold text-base cursor-pointer bg-(--brand-maroon) text-white px-3 py-1 rounded-lg hover:scale-105 transition-all duration-150"
                        >
                          Post
                        </button>
                      </div>
                    </Field>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <button className="flex items-center justify-center gap-2 py-3 text-sm cursor-pointer font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-red-600">
          <BiRepost className="h-6 w-6" />
          Repost
        </button>

        <button
          onClick={() => handleCopyLink(post.id)}
          className="flex items-center justify-center gap-2 py-3 text-sm cursor-pointer font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-red-600"
        >
          <Copy className="h-4 w-4" />
          Copy Link
        </button>
      </div>
    </div>
  ));
}
