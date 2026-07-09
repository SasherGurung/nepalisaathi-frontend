// "use client"


// import React, { useState } from "react";
// import { usePostStore } from "@/lib/stores/postStores";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { useCommentStore } from "@/lib/stores/commentStore";
// import { Heart, MessageCircle, Trash2 } from "lucide-react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
//   } from "@/components/ui/dropdown-menu";
// import Image from "next/image"
// import toast from "react-hot-toast";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { LiaCommentSlashSolid } from "react-icons/lia";
// import { Card } from "@/components/ui/card";


// export default function FeedPostComment() {

//     const { posts, fetchPosts, handleLike, deletePost } = usePostStore();
//     const [commentText, setCommentText] = useState("");
//     const [activePostId, setActivePostId] = useState<string | null>(null);
//     const {
//       comments,
//       fetchComment,
//       addComment,
//       deleteComment,
//       toggleCommentLike,
//     } = useCommentStore();

//     const handleCommentPost = async () => {
//         if (!commentText.trim() || !activePostId) return;
    
//         try {
//           await addComment(activePostId, commentText);
//           setCommentText("");
//           fetchComment(activePostId);
//         } catch (error) {
//           console.log(error);
//           toast.error("Something went wrong! Please try again");
//         }
//       };
//   return (
//     <div key={post.id} className="flex items-center justify-center">
//       <Dialog
//         onOpenChange={(open) => {
//           if (open) {
//             setActivePostId(post.id);
//             fetchComment(post.id);
//           } else {
//             setActivePostId(null);
//           }
//         }}
//       >
//         <DialogTrigger asChild>
//           <button className="flex items-center gap-2 px-13 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-red-600 cursor-pointer">
//             <MessageCircle className="h-4 w-4" />
//             Comment
//           </button>
//         </DialogTrigger>
//         <DialogContent className="h-11/12 w-full flex">
//           <div>
//             {post.image && (
//               <Image
//                 src={post.image}
//                 alt="Post"
//                 width={700}
//                 height={700}
//                 priority
//                 className="h-full w-full object-cover"
//               />
//             )}
//           </div>

//           <div className="flex flex-col">
//             <div className="flex items-start w-full justify-between pt-3 pr-6">
//               <div className="flex items-center gap-2">
//                 {post.author?.avatar ? (
//                   <Image
//                     src={post.author.avatar}
//                     alt={post.author.name}
//                     width={30}
//                     height={30}
//                     className="h-10 w-10 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--brand-maroon) text-lg font-bold text-white uppercase">
//                     {(post.author?.name || user?.name || "S")[0]}
//                   </div>
//                 )}

//                 <div className="flex flex-col">
//                   <h3 className="font-semibold text-[17px] text-zinc-900">
//                     {post.author?.name || user?.name}
//                   </h3>

//                   <div className="flex items-center gap-1 text-xs text-zinc-500">
//                     <span>{formData?.profession || user?.profession}</span>
//                     <span>•</span>
//                     <span>{post.time}</span>
//                   </div>
//                 </div>
//               </div>

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button className="rounded-lg cursor-pointer p-2 transition hover:bg-zinc-100">
//                     •••
//                   </button>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent align="end">
//                   <DropdownMenuGroup>
//                     <DropdownMenuItem>Edit Post</DropdownMenuItem>

//                     <DropdownMenuItem
//                       onClick={() => handleDeletePost(post.id)}
//                       variant="destructive"
//                       className="cursor-pointer"
//                     >
//                       <RiDeleteBin5Line /> Delete Post
//                     </DropdownMenuItem>
//                   </DropdownMenuGroup>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//             <div className="mt-3 w-full pt-2 mr-7">
//               {post.content && (
//                 <p className="pb-4 text-sm text-zinc-600">{post.content}</p>
//               )}
//             </div>
//             <div className="h-full w-80 overflow-y-auto rounded-xl bg-zinc-50 mr-7 no-scrollbar">
//               <div>
//                 {comments.length === 0 ? (
//                   <div className="py-8 items-center text-center text-base text-zinc-500 flex flex-col gap-2">
//                     <LiaCommentSlashSolid className="w-11 h-11 " />
//                     No comments yet.
//                   </div>
//                 ) : (
//                   comments.map((comment) => (
//                     <div
//                       key={comment.id}
//                       className="group relative flex items-center justify-between py-2"
//                     >
//                       <button
//                         onClick={() => deleteComment(post.id, comment.id)}
//                         className="absolute right-3 top-3 bg-white hover:bg-red-50 p-1 rounded-full cursor-pointer"
//                       >
//                         <Trash2 className="h-4 w-4 text-red-600" />
//                       </button>

//                       <div className="flex items-center gap-2 w-full px-2">
//                         <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gray-300">
//                           <Image
//                             src={comment.authorProfilePicture || "/logo.png"}
//                             alt={comment.authorName}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>

//                         <div className="w-full">
//                           <Card className="rounded-xl flex flex-col px-4 py-2 shadow-sm">
//                             <p className="text-sm font-semibold">
//                               {comment.authorName}
//                             </p>

//                             <p className="text-xs text-zinc-700">
//                               {comment.body}
//                             </p>
//                           </Card>

//                           <div className="mt-1 flex items-center justify-between px-3 text-xs font-medium text-zinc-500">
//                             <span>
//                               {new Date(comment.createdAt).toLocaleTimeString(
//                                 [],
//                                 {
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                 },
//                               )}
//                             </span>

//                             <div className="flex gap-3">
//                               <button
//                                 onClick={() =>
//                                   toggleCommentLike(post.id, comment.id)
//                                 }
//                                 className="flex items-center gap-1 hover:text-zinc-700 transition cursor-pointer"
//                               >
//                                 <Heart
//                                   className={`h-4 w-4 ${
//                                     comment.hasLiked
//                                       ? "fill-red-500 text-red-500"
//                                       : "text-zinc-500"
//                                   }`}
//                                 />

//                                 {comment.likesCount > 0 && (
//                                   <span>{comment.likesCount}</span>
//                                 )}
//                               </button>

//                               <button className="hover:text-zinc-700 transition">
//                                 Reply
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//             <div className="mt-auto">
//               <div className="flex items-center gap-4 px-3 pt-3">
//                 <button
//                   onClick={() => handleLike(post.id)}
//                   className="cursor-pointer"
//                 >
//                   <Heart
//                     fill={post.hasLiked ? "currentColor" : "none"}
//                     className={`h-5 w-5 ${post.hasLiked ? "text-red-500" : ""}`}
//                   />
//                 </button>

//                 <Share2 className="h-5 w-5 cursor-pointer transition hover:text-red-600" />

//                 <Copy
//                   onClick={() => handleCopyLink(post.id)}
//                   className="h-5 w-5 cursor-pointer transition hover:text-red-600"
//                 />
//               </div>
//               <div className="border-t mt-3 px-3 py-3">
//                 <Field>
//                   <div className="flex items-center gap-3">
//                     <Input
//                       value={commentText}
//                       onChange={(e) => setCommentText(e.target.value)}
//                       placeholder="Add a comment..."
//                       className=" pl-4 bg-gray-50 focus-visible:ring-1 
//                     focus-visible:border-red-600 focus-visible:outline-none"
//                     />

//                     <button
//                       onClick={handleCommentPost}
//                       type="button"
//                       className="font-semibold text-base cursor-pointer bg-(--brand-maroon) text-white px-3 py-1 rounded-lg hover:scale-105 transition-all duration-150"
//                     >
//                       Post
//                     </button>
//                   </div>
//                 </Field>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
