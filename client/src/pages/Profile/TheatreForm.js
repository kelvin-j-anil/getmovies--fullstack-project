import React from 'react'
import {Modal,Form,Input,message} from 'antd';
import Button from '../../components/Button'
import TextArea from 'antd/es/input/TextArea';
import { useDispatch,useSelector } from 'react-redux';
import {ShowLoading,HideLoading} from "../../redux/loadersSlice";
import {AddTheatre,UpdateTheatre} from "../../apicalls/theatres"


function TheatreForm( {
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,
  setFormType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
})
 {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheatre(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheatre(values);
      }
      if (response.success) {
        message.success(response.message);
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
        // this will reload automatically
        getData();
      } else {
        message.error(response.message);
      }
       
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }

    };
  
  return (
    <Modal
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={showTheatreFormModal}
      onCancel={() => {
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      }}
      footer={null}
    >
        <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input theatre name!" }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input theatre address!" }]}
        >
          <TextArea type="text" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input theatre phone number!" },
          ]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input theatre email!" }]}
        >
          <Input type="text" />
        </Form.Item>
        <div className="flex justify-end gap-1">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
            }}
          />
          <Button title="Save" type="submit" />
        </div>
      </Form>

    </Modal>
  )
}


export default TheatreForm