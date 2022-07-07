import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  let { slug } = useParams;

  const handleModal = () => {
    if (token) {
      setModalVisible(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />
        {token ? "Leave Rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your Rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review. It will appear soon.");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
