import { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, Input, notification } from 'antd';
import {
  InboxOutlined,
  UnlockOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { signinApi } from '../api/login';
import { useMutation } from 'react-query';

const Container = styled.div`
  display: flex;
  place-items: center;
`;

const MainTitle = styled.h2`
  font-size: 30px;
  margin-top: 0;
  margin-bottom: 0;
`;

const SubTitle = styled.h4`
  margin-top: 0;
  font-weight: normal;
`;

const FormArea = styled.div`
  min-height: 100px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const SignupLink = styled.div`
  margin-top: 10px;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutate, isLoading } = useMutation(signinApi, {
    onSuccess: data => {
      localStorage.setItem('JWTtoken', data.token);
      localStorage.setItem('UserName', data.user);
      notification.open({
        message: 'Success',
        description: 'Login successfully',
      });
      navigate('/todo-frontend/');
    },
    onError: () => {
      notification.open({
        message: 'Error',
        description: 'Email or password incorrect',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
    },
  });

  const onLogin = () => {
    mutate({
      email,
      password,
    });
  };

  return (
    <Container>
      <div>
        <Card style={{ width: 400 }}>
          <MainTitle>Simple Todolist</MainTitle>
          <SubTitle>Please login here</SubTitle>
          <FormArea>
            <Input
              placeholder="Enter your email"
              prefix={<InboxOutlined className="site-form-item-icon" />}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              prefix={<UnlockOutlined className="site-form-item-icon" />}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormArea>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={onLogin}
            loading={isLoading}
          >
            Login
          </Button>
        </Card>
        <SignupLink onClick={() => navigate('/todo-frontend/signup')}>
          Signup here
        </SignupLink>
      </div>
    </Container>
  );
};

export default Signin;
