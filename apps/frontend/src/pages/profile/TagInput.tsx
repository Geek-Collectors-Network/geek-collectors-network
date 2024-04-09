import React, { useState, useEffect } from 'react';
import { Flex, Tag, TagLabel, TagCloseButton, Input } from '@chakra-ui/react';

type TagInputProps = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

function TagInput({ tags, setTags }: TagInputProps) {
  const [tagInput, setTagInput] = useState('');

  function addTag() {
    const trimmedInput = tagInput.trim();
    if (trimmedInput.length > 0 && !tags.includes(trimmedInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter(t => t !== tag));
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        addTag();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [tagInput, tags]);

  return (
    <>
      <Input
        value={tagInput}
        onChange={e => setTagInput(e.target.value)}
        placeholder="Add interests..."
      />
      <Flex className="tag-container">
        {tags.map(tag => (
          <Tag key={tag} size={'lg'} colorScheme={'brand'} variant={'solid'} borderRadius={'full'} >
            <TagLabel>
              {tag}
            </TagLabel>
            <TagCloseButton className="tag-close-button" onClick={() => removeTag(tag)} />
          </Tag>
        ))}
      </Flex>
    </>
  );
}

export default TagInput;
