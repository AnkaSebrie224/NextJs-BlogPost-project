'use client';
import { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Post = ({ post }) => {
  const router = useRouter();
  const [modalOpenEdit, setOpenModalEdit] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post);
  const [openModalDelete, setOpenModelDelate] = useState(false);
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/posts/${post.id}`, postToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        router.refresh();
      });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostToEdit((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDeletePost = (id) => {
    axios
      .delete(`/api/posts/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        router.refresh();
      });
  };
  return (
    <li className="p-3 my-5 bg-slate-200" key={post.id}>
      <h1 className=" text-2xl font-bold">{post.title}</h1>
      <p>{post.description}</p>
      <div className="pt-5">
        <button
          className="text-blue-700 mr-3 "
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </button>
        <Modal modalOpen={modalOpenEdit} setModalOpen={setOpenModalEdit}>
          <form className="w-full" onSubmit={handleEditSubmit}>
            <h1 className="text-2xl pb-3">Add New Post</h1>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2"
              value={postToEdit.title || ''}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              className="w-full p-2 my-5"
              value={postToEdit.description || ''}
              onChange={handleChange}
            />
            <button type="submit" className="bg-blue-700 text-white px-5 py-2">
              Submit
            </button>
          </form>
        </Modal>
        <button
          onClick={() => setOpenModelDelate(true)}
          className="text-red-700 mr-3"
        >
          Delete
        </button>
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModelDelate}>
          <h1 className="text-2xl pb-3">
            Are you sure, you want to delete this
          </h1>
          <div>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="text-blue-700 font-bold mr-5"
            >
              Yes
            </button>
            <button
              onClick={() => setOpenModelDelate(false)}
              className="text-red-700 font-bold   mr-5"
            >
              No
            </button>
          </div>
        </Modal>
      </div>
    </li>
  );
};

export default Post;
