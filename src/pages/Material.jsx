import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosClient from "../apiClient";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";
import MaterialBoxSkeleton from "../components/MaterialBoxSkeleton";

import ph from "/src/img/inmatph.png";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowDown,
  FaArrowUp,
  FaCircleNotch,
  FaPaperPlane,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const RepliesMap = ({ postId }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [commentInputOpen, setCommentInputOpen] = useState(false);
  const [loadingPostComment, setLoadingPostComment] = useState(false);

  const [replyInput, setReplyInput] = useState("");

  const getReplies = () => {
    axiosClient
      .get(`/api/replies?postid=${postId}`)
      .then((res) => {
        console.log(res.data.data);
        setReplies(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setLoading(false);
          setReplies([]);
        }
      });
  };

  const handleAddReply = () => {
    if (replyInput == "") {
      // alert("isi yang bener");
      return;
    }
    setLoadingPostComment(true);
    axiosClient
      .post("/api/replies", {
        post_id: postId,
        reply: replyInput,
      })
      .then((res) => {
        console.log(res.data);
        setReplyInput("");
        getReplies();
        setLoadingPostComment(false);
        setCommentInputOpen(false);
      })
      .catch((e) => {
        setLoadingPostComment(false);
        console.error(e);
      });
  };

  useEffect(() => {
    setLoading(true);
    getReplies();
  }, []);

  return (
    <div
      className={`bg-[#32336b] w-full mt-2 rounded-lg text-white h-full overflow-hidden grid grid-flow-row divide-y-2`}
    >
      <button
        className="py-2 text-white text-md font-bold cursor-pointer bg-gradient-to-tr from-blue-primary to-[#3D406E] hover:from-[#3D406E]"
        onClick={() => setCommentInputOpen(!commentInputOpen)}
      >
        Tambah reply
      </button>
      <div
        className={`transition-all flex flex-col overflow-hidden bg-[#32336b] ${
          commentInputOpen ? `h-28` : `h-0`
        } rounded-b-xl`}
      >
        <div className={`flex w-full h-full`}>
          <textarea
            name="post"
            id="post"
            onChange={(e) => setReplyInput(e.target.value)}
            placeholder="Reply"
            className={`w-full resize-none outline-none bg-[#32336b] transition-all h-full text-white p-2`}
            value={replyInput}
          ></textarea>
          <motion.button
            onClick={handleAddReply}
            whileTap={{ scale: 0.9 }}
            className="h-full w-24 bg-yellow-primary grid place-items-center transition-colors hover:bg-[#af7a08]"
          >
            {loadingPostComment ? (
              <FaCircleNotch color="white" className="w-5 h-5 animate-spin" />
            ) : (
              <FaPaperPlane color="white" className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="animate-pulse grid place-items-center"
        >
          <div className="m-2 w-4/5 h-fullrounded-lg bg-blue-secondary grid place-items-center rounded-lg">
            <span className="text-white p-2">Loading</span>
          </div>
        </motion.div>
      ) : replies.length > 0 ? (
        replies.map((rep) => (
          <motion.div
            key={rep.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 flex flex-col"
          >
            <span className="text-sm font-bold bg-blue-secondary w-fit px-2 py-1 rounded-xl">
              {rep.user.registered_user.name} -{" "}
              <span className=" text-yellow-primary">
                {rep.user.registered_user.kelas.class}
              </span>
            </span>
            <p className="pl-2">{rep.reply}</p>
          </motion.div>
        ))
      ) : (
        <div className="w-full p-3 flex justify-center">Belum ada reply</div>
      )}
    </div>
  );
};

const MateriSementara = () => {
  const location = useLocation();
  const isDiscussionOpen = location.state?.isDiscussionOpen;

  const [diskusi, setDiskusi] = useState(isDiscussionOpen);
  const [commentInputOpen, setCommentInputOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPostComment, setLoadingPostComment] = useState(false);

  const [post, setPost] = useState({});
  const [openContainers, setOpenContainers] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const { postId } = useParams();

  const clearInputs = () => {
    setCommentInput("");
    setCommentTitle("");
  };

  const handleOpenReplies = (id) => {
    // axiosClient.get(`/api/replies?postid=${id}`).then((rp) => {
    // console.log(rp);
    setOpenContainers((prevOpenContainers) => ({
      ...prevOpenContainers,
      [id]: !prevOpenContainers[id],
    }));
    // });
  };

  const handleDiskusi = () => {
    setDiskusi(!diskusi);
  };

  const getComments = () => {
    axiosClient
      .get(`/api/posts?matid=${postId}`)
      .then((post) => {
        console.log(post);
        setComments(post.data.data);
        setLoading(false);
      })
      .catch(() => {
        setComments([]);
        setLoading(false);
      });
  };

  const handleAddComment = () => {
    if (commentInput == "" || commentTitle == "") {
      // alert("isi yang bener");
      return;
    }
    setLoadingPostComment(true);
    axiosClient
      .post("/api/posts", {
        material_id: postId,
        title: commentTitle,
        body: commentInput,
      })
      .then((res) => {
        console.log(res.data);
        clearInputs();
        getComments();
        setLoadingPostComment(false);
        setCommentInputOpen(false);
      })
      .catch((e) => {
        setLoadingPostComment(false);
        console.error(e);
      });
  };

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/api/materials/${postId}`).then((mat) => {
      document.title = `${mat.data.data.title} - DuLearn`;
      setPost(mat.data.data);
    });
    getComments();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar chosenTab={2} />
      <AnimatePresence>
        {diskusi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
          ></motion.div>
        )}
      </AnimatePresence>

      <MainContainer className={diskusi ? "overflow-y-hidden" : ""}>
        <motion.div
          className={`fixed h-4/5 z-50 left-72 ${
            diskusi ? "bottom-16" : "-bottom-[71.8vh]"
          } transition-all ease-out duration-500 drop-shadow-2xl`}
          transition={{ ease: "linear", duration: 0.1 }}
          whileHover={!diskusi && { y: -10 }}
        >
          <div
            className="grid grid-flow-col place-items-center w-[15rem] bottom-0 p-5 rounded-t-3xl border-b-4 bg-[#2b317c] hover:bg-[#2a2e66] transition-all cursor-pointer"
            onClick={handleDiskusi}
          >
            <h1 className="text-2xl font-bold text-white">Diskusi</h1>
            <FaArrowUp
              color="white"
              className={`${
                diskusi ? `rotate-180` : `rotate-0`
              } transition-all duration-700 ease-in-out`}
            />
          </div>
          <div className="bg-[#2b317c] w-[calc(100vw-25rem)] h-full rounded-r-xl py-5 px-10 overflow-y-auto grid grid-cols-1 content-start justify-items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full flex flex-col justify-center bg-gradient-to-br from-blue-secondary to-[#3D406E] rounded-xl transition-shadow ease-out hover:shadow-white hover:shadow-input"
            >
              <button
                className="py-2 text-white text-md font-bold cursor-pointer"
                onClick={() => setCommentInputOpen(!commentInputOpen)}
              >
                Tambah komen
              </button>
              <div
                className={`transition-all flex flex-col overflow-hidden bg-[#32336b] ${
                  commentInputOpen ? `h-48` : `h-0`
                } rounded-b-xl`}
              >
                <input
                  type="text"
                  value={commentTitle}
                  onChange={(e) => setCommentTitle(e.target.value)}
                  placeholder="Title"
                  className="bg-[#32336b] p-2 text-lg text-white outline-none font-bold border-b-2"
                />
                <div className={`flex w-full h-full rounded-b-xl`}>
                  <textarea
                    name="post"
                    id="post"
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Body"
                    className={`w-full resize-none rounded-b-xl outline-none bg-[#32336b] transition-all h-full text-white p-2`}
                    value={commentInput}
                  ></textarea>
                  <motion.button
                    onClick={handleAddComment}
                    whileTap={{ scale: 0.9 }}
                    className="h-full w-24 bg-yellow-primary rounded-lg rounded-tr-none grid place-items-center transition-colors hover:bg-[#af7a08]"
                  >
                    {loadingPostComment ? (
                      <FaCircleNotch
                        color="white"
                        className="w-5 h-5 animate-spin"
                      />
                    ) : (
                      <FaPaperPlane color="white" className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
            {comments.length > 0 ? (
              comments.map((comment, i) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{
                    scale: { duration: 0.2 },
                    opacity: { duration: 0.3 },
                  }}
                  className="w-full flex flex-col justify-start bg-gradient-to-br from-blue-secondary to-[#3D406E] rounded-xl p-5 shadow-lg"
                  key={comment.id}
                >
                  <span className="text-white text-sm px-2 py-1 rounded-lg bg-[#32336b] w-fit mb-2">
                    {comment.user.registered_user.name} -{" "}
                    <span className=" text-yellow-primary">
                      {comment.user.registered_user.kelas.class}
                    </span>
                  </span>
                  <span className="text-xl text-yellow-primary font-bold">
                    {comment.title}
                  </span>
                  <span className="text-white text-setMaterials">
                    {comment.body}
                  </span>
                  <div className="flex w-full justify-end items-center gap-2">
                    <button
                      className="flex justify-end items-center gap-2 px-2 py-1 border-base border rounded-lg text-base text-sm hover:bg-base hover:text-yellow-primary transition-colors"
                      onClick={() => handleOpenReplies(comment.id)}
                    >
                      <span>Lihat reply</span>
                      <FaArrowDown />
                    </button>
                  </div>
                  {openContainers[comment.id] && (
                    <RepliesMap postId={comment.id} />
                  )}
                </motion.div>
              ))
            ) : loading ? (
              <MaterialBoxSkeleton amount={5} fullWidth={true} />
            ) : comments.length === 0 ? (
              <div className="grid place-items-center">
                <h1 className="text-white text-2xl font-bold">
                  Belum ada komen di materi ini.
                </h1>
              </div>
            ) : (
              <h1>error</h1>
            )}
          </div>
        </motion.div>
        <div
          className={`min-h-screen px-7 py-10 pb-24 rounded-lg bg-gradient-to-b from-[#42489E] to-[#161A58]`}
        >
          {Object.keys(post).length > 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-3">
                <span className="text-3xl text-white font-bold">
                  {post.title}
                </span>
                <span className="pl-3 text-[#FAA41A] text-setMaterials">
                  {post.subject.subject}
                </span>
              </div>
              <ReactMarkdown className="text-white prose">
                {post.material}
              </ReactMarkdown>
            </motion.div>
          ) : (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={ph}
              className="pointer-events-none bg-center bg-no-repeat w-full max-w-5xl h-auto animate-pulse"
            />
          )}
        </div>
      </MainContainer>
    </>
  );
};

export default MateriSementara;
0;
