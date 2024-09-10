import React from 'react';
import styled from 'styled-components';

const Box = styled.div<{ isEditing?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${props => (props.isEditing ? '0px 0px' : '10px 25px')};
  width: 100%;
  font-size: 1em;
  border-bottom: 1px solid #eee;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: 0;
  padding: 5px;
`;

export default function TodoInput({
  addTodo,
  isEditing, //prop 수정용?추가용?
  editContent, // 기존 todo 내용 임시 저장
  editTodo,
  editModeTodo,
}: {
  addTodo?: (content: string) => void;
  isEditing?: boolean;
  editContent?: string;
  editTodo?: (content: string) => void;
  editModeTodo?: () => void;
}) {
  const [content, setContent] = React.useState<string>(editContent ?? '');
  return (
    <Box isEditing={isEditing}>
      <Input
        placeholder="할일을 입력해 주세요."
        value={content}
        onBlur={e => {
          if (e.currentTarget === e.target) {
            editTodo && editTodo(e.target.value);
          }
        }}
        onChange={e => setContent(e.target.value)}
        onKeyDown={e => {
          if (content === '') return;
          if (e.key !== 'Enter' && e.key !== 'NumpadEnter') return;
          if (isEditing) {
            editTodo && editTodo(content);
          } else {
            addTodo && addTodo(content);
            setContent('');
          }
        }}
      />
    </Box>
  );
}
