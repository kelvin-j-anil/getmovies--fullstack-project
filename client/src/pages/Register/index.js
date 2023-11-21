import React from 'react'   
import {Form,Input,message} from "antd"
import Button from '../../components/Button'
import {Link,useNavigate} from 'react-router-dom'
import {RegisterUser} from '../../apicalls/users'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async(values) =>{
    try{
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if(response.success){
        message.success(response.message);
        navigate("/login");
      }
      else{
        message.error(response.message);
      }
    }catch(error){
      dispatch(HideLoading());
      message.error(error.message)
    }
  }

  // once registered  cant go to login page
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className='flex justify-center h-screen items-center bg-primary'>
      <div className='card p-3 w-400' >
          <h1 className='text-xl mb-2'>
            GETMOVIES - REGISTER
          </h1>
          <hr/>
          
          <Form layout='vertical mt-2' className='mt-2'
            onFinish={onFinish}>
            <Form.Item
            label="Name"
            name="name"
            rules={[{required:true,message:"Please input your name"}]}
            >
              <Input type="text"/>
            </Form.Item>

            <Form.Item
            label="Email"
            name="email"
            rules={[{required:true,message:"Please input your email"}]}
            >
              <Input type='email'/>
            </Form.Item>

            
            <Form.Item
            label="Password"
            name="password"
            rules={[{required:true,message:"Please input your password"}]}
            >
              <Input type='password'/>
            </Form.Item>

            <div className='flex flex-col mt-2 gap-1'>
            <Button fullWidth htmlType='submit' title='REGISTER' type='submit'/>
            <Link to="/login" className='text-primary'>Already have an account?Login</Link>
              </div>          

          </Form>
      </div>
    </div>
  )
}

export default Register