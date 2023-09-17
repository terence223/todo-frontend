import { useState } from 'react';
import { Input, Card, notification, Button, Tooltip, FloatButton } from 'antd';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  CheckOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  todoCreateApi,
  todoUpdateApi,
  todoFetchApi,
  todoDeleteApi,
  Todo,
} from '../api/todo';

const { Search } = Input;

const Container = styled.div`
  width: 400px;
  margin-top: 60px;
`;

const TodoCard = styled(Card)`
  margin-top: 16px;
  width: 100%;
`;

const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckButton = styled(Button)`
  margin-right: 10px;
  cursor: default;
`;

const Todolist = () => {
  const [todo, setTodo] = useState<string>('');

  const { data, refetch } = useQuery('TodoListAPI', todoFetchApi);

  const navigate = useNavigate();

  const { mutate: createMutate, isLoading } = useMutation(todoCreateApi, {
    onSuccess: () => {
      refetch();
      setTodo('');
    },
    onError: () => {
      notification.open({
        message: 'Error',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
    },
  });

  const { mutate: updateMutate } = useMutation(todoUpdateApi, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      notification.open({
        message: 'Error',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
    },
  });

  const { mutate: deleteMutate } = useMutation(todoDeleteApi, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      notification.open({
        message: 'Error',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
    },
  });

  const userName = localStorage.getItem('UserName');
  const welcomeWord = userName ? `Hello, ${userName}! ` : 'Hello! ';

  return (
    <Container>
      <h2>{`${welcomeWord}Enjoy using Todolist!`}</h2>
      <Search
        placeholder="Add New Todo Here...."
        enterButton="Add"
        size="large"
        value={todo}
        onChange={e => {
          setTodo(e.target.value);
        }}
        onSearch={() => {
          createMutate({
            title: todo,
          });
        }}
        loading={isLoading}
      />
      {Array.isArray(data?.todos) &&
        data.todos.map((todo: Todo) => (
          <TodoCard
            hoverable={true}
            onClick={() => {
              updateMutate({ ...todo, checked: !todo.checked });
            }}
          >
            <TodoContainer>
              <div>{todo.title}</div>
              <div>
                <CheckButton
                  shape="circle"
                  type={todo.checked ? 'primary' : 'default'}
                  icon={<CheckOutlined />}
                />
                <Tooltip title="Delete">
                  <Button
                    shape="circle"
                    icon={
                      <DeleteOutlined
                        onClick={e => {
                          e.stopPropagation();
                          deleteMutate(todo._id);
                        }}
                      />
                    }
                  />
                </Tooltip>
              </div>
            </TodoContainer>
          </TodoCard>
        ))}
      <Tooltip title="Logout">
        <FloatButton
          icon={<LogoutOutlined />}
          onClick={() => {
            localStorage.removeItem('JWTtoken');
            navigate('/todo-frontend/signin');
          }}
        />
      </Tooltip>
    </Container>
  );
};

export default Todolist;
