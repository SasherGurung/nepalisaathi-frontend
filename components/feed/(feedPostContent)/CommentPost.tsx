import { Card } from "@/components/ui/card";
import { useCommentStore } from "@/lib/stores/Posts/commentStore";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import { LiaCommentSlashSolid } from "react-icons/lia";

type Props = {
  postId: string;
};

export default function CommentPost({ postId }: Props) {
  const {
    comments,
    deleteComment,
    toggleCommentLike,
  } = useCommentStore();

  return (
    <>
      {comments.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center text-base text-zinc-500">
          <LiaCommentSlashSolid className="h-11 w-11" />
          No comments yet.
        </div>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="group relative flex items-center justify-between py-2"
          >
            <button
              onClick={() => deleteComment(postId, comment.id)}
              className="absolute right-3 top-3 rounded-full bg-white p-1 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>

            <div className="flex w-full items-center px-2">
              <div className="h-15 w-15">
                {comment.user.avatar_url ? (
                  <Image
                    src={comment.user.avatar_url}
                    alt={comment.user.name}
                    width={100}
                    height={100}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--brand-blue) text-lg font-bold uppercase text-white">
                    {comment.user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="w-full">
                <Card className="flex flex-col rounded-xl px-4 py-2 shadow-sm">
                  <p className="text-sm font-semibold">
                    {comment.user.name}
                  </p>

                  <p className="text-xs text-zinc-700">
                    {comment.text}
                  </p>
                </Card>

                <div className="mt-1 flex items-center justify-between px-3 text-xs font-medium text-zinc-500">
                  <span>
                    {new Date(comment.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        toggleCommentLike(postId, comment.id)
                      }
                      className="flex cursor-pointer items-center gap-1 transition hover:text-zinc-700"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          comment.hasLiked
                            ? "fill-red-500 text-red-500"
                            : "text-zinc-500"
                        }`}
                      />

                      {comment.likesCount > 0 && (
                        <span>{comment.likesCount}</span>
                      )}
                    </button>

                    <button className="transition hover:text-zinc-700">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}