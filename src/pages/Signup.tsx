import { useState } from 'react';
import { Card, Input, Button } from 'antd';
import { UserOutlined, InboxOutlined, UnlockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import {
  validateEmail,
  validatePassword,
  validateUser,
} from '../utils/validator';

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
  min-height: 180px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ErrMsgWrapper = styled.div`
  height: 24px;
  width: 100%;
  text-align: left;
  color: #ff4d4f;
`;

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailErr, setEmailErr] = useState<string>('');
  const [userErr, setUserErr] = useState<string>('');
  const [passwordErr, setPasswordErr] = useState<string>('');

  const onSignup = () => {
    setEmailErr(validateEmail(email));
    setUserErr(validateUser(user));
    setPasswordErr(validatePassword(password));
  };

  return (
    <div>
      <Card style={{ width: 400 }}>
        <MainTitle>Simple Todolist</MainTitle>
        <SubTitle>Please signup here</SubTitle>
        <FormArea>
          <div>
            <Input
              placeholder="Enter your email"
              prefix={<InboxOutlined className="site-form-item-icon" />}
              value={email}
              onChange={e => setEmail(e.target.value)}
              status={emailErr ? 'error' : ''}
            />
            <ErrMsgWrapper>{emailErr}</ErrMsgWrapper>
          </div>
          <div>
            <Input
              placeholder="Enter your username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              value={user}
              onChange={e => setUser(e.target.value)}
              status={userErr ? 'error' : ''}
            />
            <ErrMsgWrapper>{userErr}</ErrMsgWrapper>
          </div>
          <div>
            <Input
              type="password"
              placeholder="Enter your password, at least 8 characters"
              prefix={<UnlockOutlined className="site-form-item-icon" />}
              value={password}
              onChange={e => setPassword(e.target.value)}
              status={passwordErr ? 'error' : ''}
            />
            <ErrMsgWrapper>{passwordErr}</ErrMsgWrapper>
          </div>
        </FormArea>
        <Button type="primary" shape="round" size="large" onClick={onSignup}>
          Signup
        </Button>
      </Card>
    </div>
  );
};

export default Signup;
