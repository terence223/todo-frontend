import { useState } from 'react';
import { Input, Card, notification, Button, Tooltip } from 'antd';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { todoCreateApi, todoFetchApi, todoDeleteApi, Todo } from '../api/todo';

const { Search } = Input;

const Container = styled.div`
  width: 400px;
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

const Todolist = () => {
  const [todo, setTodo] = useState<string>('');

  const { data, refetch } = useQuery('TodoListAPI', todoFetchApi);

  const { mutate: createMutate, isLoading } = useMutation(todoCreateApi, {
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

  return (
    <Container>
      <h2>Enjoy using Todolist!</h2>
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
          <TodoCard hoverable={true}>
            <TodoContainer>
              <div>{todo.title}</div>
              <div>
                <Tooltip title="Delete">
                  <Button
                    shape="circle"
                    icon={
                      <DeleteOutlined
                        onClick={() => {
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
    </Container>
  );
};

export default Todolist;
